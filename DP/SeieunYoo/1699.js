const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input3.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = Number(input.shift());

let array = [];

array[1] = 1;
array[2] = 2;
array[3] = 3;
array[4] = 1;

for (let i = 5; i <= n; i++) {
  array[i] = i; 
  for (let j = 1; j * j <= i; j++) {
    const number = i - j * j;
    array[i] = Math.min(array[i], array[number] + 1);
  }
}

console.log(array[n]);

// let answer = 0;
// 일반 재귀함수로 풀이하면 스택 오버플로우
// function findNumber(number) {
//   const num = Math.floor(Math.sqrt(number));

//   number = number - num * num;
//   answer++;
//   if (number === 0) {
//     console.log(answer);
//     return;
//   }

//   findNumber(number);
// }

// findNumber(n);
