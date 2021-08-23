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
  
  // 刷牙 -> 吃早餐 -> 寫功課 -> 看電視
  doWork("刷牙", 3000, function (err, data) {
    // 刷完牙後會被回呼的函式
    // 會在這裡就是已經刷完牙了
    if (err) {
      console.error("發生錯誤了:", err);
    } else {
      console.log(data);
      doWork("吃早餐", 3000, function (err, data) {
        // 吃早餐後會被回呼的函式
        // 會在這裡就是已經吃完早餐了
        if (err) {
          console.error("發生錯誤了:", err);
        } else {
          console.log(data);
          doWork("寫功課", 3000, function (err, data) {
            // 寫功課後會被回呼的函式
            // 會在這裡就是已經寫功課了
            if (err) {
              console.error("發生錯誤了:", err);
            } else {
              console.log(data);
              doWork("看電視", 3000, function (err, data) {
                // 看電視後會被回呼的函式
                // 會在這裡就是已經看電視了
                if (err) {
                  console.error("發生錯誤了:", err);
                } else {
                  console.log(data);  
                }
              }); 
            }
          });
        }
      });
    }
  });
  //完成工作: 刷牙 at 2021-08-23T03:38:36.559Z
// 完成工作: 吃早餐 at 2021-08-23T03:38:39.577Z
// 完成工作: 寫功課 at 2021-08-23T03:38:42.580Z
// 完成工作: 看電視 at 2021-08-23T03:38:45.581Z