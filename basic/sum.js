  
console.log("Hello World!");
//回傳1+2+3...+n的結果
// function sum(n) {
//   let result = 0;
//   for (let i = 1; i <= n; i++) {
//     result += i;
//   }
//   return result;
// }

//比較好的寫法
function sum(n) {
  return ((n + 1) * n) / 2;
}
console.log(sum(1));
console.log(sum(2));
console.log(sum(10));
console.log(sum(100));