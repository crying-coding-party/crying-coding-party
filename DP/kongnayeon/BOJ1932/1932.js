const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input.shift());

const arr = [];

for (let i = 0; i < N; i++) {
    arr[i] = input[i].split(' ').map(Number);
}

for (let i = 1; i < N; i++) {
    arr[i].map((element, index) => {
        if (index === 0){
            arr[i][index] += arr[i - 1][0];
        }
        else if(index === arr[i].length - 1){
            arr[i][index] += arr[i - 1][index - 1];
        }else{
            arr[i][index] += Math.max(arr[i - 1][index - 1], arr[i - 1][index]);
        }
    } )
}

console.log(Math.max(...arr[N-1]));