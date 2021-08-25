// GET
// https://www.twse.com.tw/exchangeReport/STOCK_DAY
// ?
// response=json
// &
// date=20210807
// &
// stockNo=2330
const axios = require("axios");
//日期
const moment = require("moment");
let today = moment().format("YYYYMMDD");
//讀檔案(非同步)
const fs = require("fs");
function resultCode() {
return new Promise((resolve, reject)=>{
    fs.readFile("stock.txt", "utf8", (error, stock)=>{
    if(error){
        //失敗
        reject(error);
    }else{
        //成功
        resolve(stock);
    };
    });
});
}
function resultData(stock) {
    return axios
    .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: "json",
        date: today,
        stockNo: stock,
      },
    })
}
async function getData() {
    try {
      let stock = await resultCode();
      let result = await resultData(stock);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  }
  getData();
    