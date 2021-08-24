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

fs.readFile("stock.txt", "utf8", (err, stockCode)=>{
    axios
    .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: "json",
        date: today,
        stockNo: stockCode,
      },
    })
    .then((response) => {
      console.log(response.data.title);
    });
});