// Promise 是一個表示非同步運算的「最終」完成或失敗的物件。
let doWork = function (job, timer, isOK) {
// 解決 callback hell:==> 把 callback -> 改用 Promise
// 物件： new Promise();
// 建構式一定要傳入一個函式，而且這個函式本身會有兩個參數resolve, reject
//執行者=>承諾的執行者
    let executor = (resolve, reject)=>{
       
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

  };
return new Promise(executor);
};
//使用
let job1 = doWork("刷牙", 3000, false);
console.log(job1);//Promise { <pending> }
//用then接收結果
job1.then(
    function(result){
    console.log("第 1 個函式被呼叫了", result);
    console.log(job1);
},function(error){
    console.log("第 2 個函式被呼叫了",error);
    console.log(job1);
});
//Promise { <pending> }
//true
// 第 1 個函式被呼叫了 完成工作: 刷牙 at 2021-08-23T09:51:04.267Z
// Promise { '完成工作: 刷牙 at 2021-08-23T09:51:04.267Z' }
//false
// 第 2 個函式被呼叫了 失敗了 刷牙
// Promise { <rejected> '失敗了 刷牙' }
