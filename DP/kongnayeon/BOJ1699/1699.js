const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input.shift());

let arr = [0, 1, 2, 3];

for(let i = 4; i <= N; i++){
    arr[i] = i;
    for(let j = 1; j <= Math.sqrt(i); j++){
        arr[i] = Math.min(arr[i], arr[i - j*j] + 1);
    }
}

console.log(arr[N]);