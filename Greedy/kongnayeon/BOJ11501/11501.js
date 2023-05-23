const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const T = Number(input.shift());

function solution(N, amount) {
    let max = 0;
    let maxProfit = 0;
    for (let i = N - 1; i >= 0; i--) {
        if (amount[i] > max) {
            max = amount[i];
        } else {
            maxProfit += max - amount[i];
        }
    }
    return maxProfit;
}

for (let i = 0; i < T; i++) {
    let N = Number(input.shift());
    let amount = input.shift().split(' ').map(Number);
    console.log(solution(N, amount));
}
