const axios = require("axios");
//日期
const moment = require("moment");
let today = moment().format("YYYYMMDD");
//讀檔案(非同步)
const fs = require("fs");
//mysql讀資料庫
const mysql = require("mysql");
const { resolve } = require("path");
//引用dotenv環境變數
require('dotenv').config();

//設定連線資料
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  });
//準備連線
  connection.connect((err) => {
    if (err) {
      console.error("資料庫連不上");
    }
  });
//  1. 讀 stock.txt 把股票代碼讀進來
function reasStockPromise(){
  return new Promise((resolve, reject)=>{
    fs.readFile("stock.txt", "utf8", (error, stock)=>{
    if(error){
        //失敗
        reject(error);
    }else{
        //成功
        resolve(stock.trim());//.trim()
    };
    });
});
}
//3. 如果是，才去證交所抓資料
function queryStockPricePromise(stock){
  return axios
  .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    params: {
      response: "json",
      date: today,
      stockNo: stock,
    },
  }
  );
}
//2. 去資料庫的 stock 表格查看看，這個代碼是不是在我們的服務範圍內
function queryStockCodePromise(stockCode){
  return new Promise((resolve, reject)=>{
    connection.query(
      "SELECT * FROM stock WHERE stock_id = ?",
      [stock],
       function (error, results, fields){
        if (error) {
          reject(error);// 錯誤處理
        }
        resolve(results);// 正確處理: 有資料
      }
    );
    });
  }
  


async function doWork(){
  try {
    //  1. 讀 stock.txt 把股票代碼讀進來
  let stock = await reasStockPromise();
  //2. 去資料庫的 stock 表格查看看，這個代碼是不是在我們的服務範圍內
let dbResult = await queryStockCodePromise(stockCode);
if (results.length === 0){
  console.warn("此股票代碼不在服務範圍內");
  return;
} console.info("有查到資料");
  //3. 如果是，才去證交所抓資料
  let response =await queryStockPricePromise(stock);
   //4. 抓回來的資料存到資料庫的 stock_price 表格裡去
  console.log(response.data.title);   
  } catch (e) {
    console.error(e);
  } finally {
  // 不關閉連線，認為程式一直在執行
  connection.end();
  }
}
doWork();

// function resultData(stock) {
//     return axios
//     .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
//       params: {
//         response: "json",
//         date: today,
//         stockNo: stock,
//       },
//     })
// }
// async function getData() {
//     try {
//       let stock = await resultCode();
//       let result = await resultData(stock);
//       console.log(result.data);
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   getData();
    