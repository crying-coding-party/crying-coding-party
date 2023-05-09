const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = Number(input.shift());

let array = [];
array[1] = 1;
array[2] = 3;

for (let i = 3; i <= n; i++) {
  array[i] = (array[i - 1]  + array[i - 2] * 2) % 10007;
}

console.log(array[n]);
