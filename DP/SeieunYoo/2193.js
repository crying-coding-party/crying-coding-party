const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input2.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = Number(input.shift());

let array = [];

array[1] = 1;
array[2] = 1;
array[3] = 2;

for (let i = 4; i <= n; i++) {
  array[i] = BigInt(array[i - 1]) * BigInt(2) - BigInt(array[i - 3]);
}

console.log(array[n].toString());

// 0 - <0,1> 1 - <0>  
// i 번째 -> i-1 번째 * 2  - (1이 들어간 개수)


