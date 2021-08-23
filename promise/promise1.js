// Promise 是一個表示非同步運算的「最終」完成或失敗的物件。
  // 解決 callback hell:==> 把 callback -> 改用 Promise
  // 物件： new Promise();
  // 建構式一定要傳入一個函式，而且這個函式本身會有兩個參數resolve, reject
let doWork = function (job, timer, isOK) {//不需要用cb了
    return new Promise((resolve, reject)=>{
       
    // 模擬一個非同步工作
    setTimeout(() => {
      let dt = new Date();
      if (isOK) {
        // resolve 是解決用的函式 --> 最終完成
    resolve(`完成工作: ${job} at ${dt.toISOString()}`);
      } else {
        // reject 是拒絕用的函式 --> 最終失敗
    reject(`失敗了 ${job}`);
      }
    }, timer);

  });

}; 

let dt = new Date();
  console.log(`開始工作 at ${dt.toISOString()}`);

let job1 = doWork("刷牙", 3000, true);
console.log(job1);//Promise { <pending> }

job1.then(function(resolve){
    console.log("第 1 個函式被呼叫了", resolve);
},function(reject){
    console.log("第 2 個函式被呼叫了",reject);
});

//   doWork("刷牙", 3000, false, function (err, data) {
//     if (err) {
//       console.error("發生錯誤了:", err);
//     } else {
//       console.log(data);
//       doWork("吃早餐", 5000, true, function (err, data) {
//         if (err) {
//           console.error("發生錯誤了:", err);
//         } else {
//           console.log(data);
//           doWork("寫功課", 3000, true, function (err, data) {
//             if (err) {
//               console.error("發生錯誤了:", err);
//             } else {
//               console.log(data);
//             }
//           });
//         }
//       });
//     }
//   });