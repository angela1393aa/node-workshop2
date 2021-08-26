const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const mysql = require("mysql");
require("dotenv").config();
//建立連線
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
connection.connect((err) => {
  if (err) {
    console.error("資料庫連不上");
  }
});
//1.讀檔案
function readStockPromise(){
return new Promise((resolve, reject)=>{
fs.readFile("stock.txt","utf8",(err,stockCode) =>{
  if (err) {
    reject (err);
  } else {
    resolve(stockCode.trim());
  }
});
});
};
function queryStockPricePromise(stockCode) {
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: "json",
        date: moment().format("YYYYMMDD"),
        stockNo: stockCode, 
      },
    });
  }
  //2.去資料庫查有沒有這個代碼
  function queryStockCodePromise(stockCode) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM stock WHERE stock_id = ?",
        [stockCode],
        function (error, results, fields) {
          if (error) {
            // 錯誤處理
            reject(error);
          }
          // if (results.length === 0) {
          //   reject("在資料查無資料!!!!!!");
          // }
          // 正確處理: 有資料
          resolve(results);
        }
      );
    });
  }

//3.如果是才去證交所抓資料
// 要傳入 parsedData
function insertDataPromise(parsedData) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?",
        [parsedData],
        function (error, results, fields) {
          if (error) {
            reject(error);
          }
          resolve(results);
        }
      );
    });
  }
async function doWork() {
    try {
      // 1. 讀 stock.txt 把股票代碼讀進來。
      let stockCode = await readStockPromise();
      // 2. 檢查是否在我們資料庫的服務範圍內。
      let dbResults = await queryStockCodePromise(stockCode);
      if (dbResults.length === 0) {
          throw"此股票代碼不再服務範圍內";
          }
      console.info("在資料庫有查到資料");
      // 3. 若確認在我們的服務範圍內，就可以拿到相關資料。
      let response = await queryStockPricePromise(stockCode);
      // 4. 取得資料後，先檢查資料，並進行資料格式轉換。
      const twseData = response.data;
      if(twseData.stat !== "OK") {
        throw "從證交所查到的資料有問題!";
      }
      // [
      //   '日期',     '成交股數',
      //   '成交金額', '開盤價',
      //   '最高價',   '最低價',
      //   '收盤價',   '漲跌價差',
      //   '成交筆數'
      // ]
      // 資料格式轉換(針對 data 裡的每一組做資料處理)。
      let parsedData = twseData.data.map((item) => {
        // 處理千位符: 將千位符拿掉。
        item = item.map((value) => {
          return value.replace(/,/g, "");
        });
  
        // 處理日期: 民國年轉西元年。
        // 處理 + - ===> 交給 parseInt 轉數字處理
        item[0] = parseInt(item[0].replace(/\//g, ""), 10) + 19110000;
  
        // 把 stock_id 放到陣列最前面，以便輸入到資料庫。
        item.unshift(stockCode);
  
        return item;
      });
      console.log(parsedData);
  
      // 5. 資料格式轉換之後存回stock資料庫的stock_price資料表。
      let insertResult = await insertDataPromise(parsedData);
      console.log(insertResult);
    } catch (error) {
      console.error(error);
    } finally {
      connection.end();
    }
  }

  doWork();