async function asyncF() {
  console.log(1);
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2);
      resolve();
    }, 0);
  });
  console.log(3);
}

console.log(4);
asyncF();
console.log(5);
// 4
// 1
// 5
// 2
// 3
/* 4跑完後->下一行就進去function跑１遇到await會等待先做,然後外面會先跑５
  ->await跑完後跑出２->最後跑３ */