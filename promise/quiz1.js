// 請問下列程式碼印出的順序為何？

function syncF() {
  console.log(1);

  setTimeout(() => {
    console.log(2);
  }, 0);
  console.log(3);
}

console.log(4);
syncF();
console.log(5);
//4
//1
//3
//5
//2
/* 4跑完後->下一行就進去function跑１遇到setTimeout先丟給node.js做,然後跑３
    ->funnction 跑完後跑５->最後eventloop看到stack空了將Q裡的東西搬過去跑２ */