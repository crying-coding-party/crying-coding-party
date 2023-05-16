const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input.shift());

let arr = [[], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

for (let i = 2; i <= N; i++) {
    arr[i] = [];
    for (let j = 0; j < 10; j++) {
        if (j === 0) {
            arr[i][j] = arr[i - 1][j + 1] % 1000000000;
        } else if (j === 9) {
            arr[i][j] = arr[i - 1][j - 1] % 1000000000;
        } else {
            arr[i][j] = (arr[i - 1][j - 1] + arr[i - 1][j + 1]) % 1000000000;
        }
    }
}

let sum = 0;
for (let i = 0; i < arr[N].length; i++) {
    sum += arr[N][i];
}

console.log(sum % 1000000000);
