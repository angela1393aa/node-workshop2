let doWork = function (job, timer, cb) {
  // 模擬一個非同步工作callback
  setTimeout(() => {
    let dt = new Date();
    // callback 慣用的設計
    // 第一個參數: error
    // 第二個參數: 要回覆的資料
    cb(null, `完成工作: ${job} at ${dt.toISOString()}`);
  }, timer);
};


// 刷牙 -> 吃早餐 -> 寫功課
doWork("刷牙", 3000, function (err, data) {
  // 刷完牙後會被回呼的函式
  // 會在這裡就是已經刷完牙了
  if (err) {
    console.error("發生錯誤了:", err);
  } else {
    console.log(data);
    //下一個工作放這裡這裡
// 解決: 接續做的工作
// ---> 動作如果要接續著做，只能把下一個動作放在上一個動作的 callback
//   --> callback hell    
  }
});
//完成工作: 刷牙 at 2021-08-23T03:32:17.874Z