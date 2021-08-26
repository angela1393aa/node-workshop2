const axios = require("axios");
//日期
const moment = require("moment");
let today = moment().format("YYYYMMDD");
//讀檔案(非同步)
const fs = require("fs");
//mysql讀資料庫
const mysql = require("mysql");
//引用dotenv
require('dotenv').config();

async function resultCode() {
let stock = await new Promise((resolve, reject)=>{
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

//設定
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  });
//連線
  connection.connect((err) => {
    if (err) {
      console.error("資料庫連不上");
    }
  });

  // 不關閉連線，認為程式一直在執行
  connection.end();




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
    