const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input.shift());

let arr = [0, 1, 3];

for(let i = 3; i <= N; i++){
    arr.push((arr[i-1] + 2 * arr[i-2]) % 10007)
}

console.log(arr[N]);