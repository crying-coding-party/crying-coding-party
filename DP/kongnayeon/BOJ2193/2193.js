const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input.shift());

let arr = [0, 1];

for(let i = 2; i <= N; i++){
    arr.push(BigInt(arr[i - 1]) + BigInt(arr[i - 2]));
}

console.log(BigInt(arr[N]).toString());