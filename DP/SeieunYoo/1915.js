const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input6.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, m] = input.shift().split(' ').map(Number);
const map = input.map((row) =>
  row
    .split('')
    .filter((item) => item !== '\r')
    .map(Number)
);

let dp = Array.from(Array(1001), () => new Array(1001).fill(0)); 
let answer = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] == 1) {
      dp[i + 1][j + 1] = Math.min(dp[i][j + 1], dp[i + 1][j], dp[i][j]) + 1;
      answer = Math.max(answer, dp[i + 1][j + 1]);
    }
  }
}

console.log(answer);
