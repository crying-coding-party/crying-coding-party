const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input7.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = Number(input.shift());
const num = 1000000000;
let dp = Array.from(Array(101), () => new Array(10).fill(0)); 
let answer = 0;

for (let i = 1; i <= 9; i++) {
  dp[1][i] = 1; //1,2,3,4,5,6,7,8,9 총 9가지
}

for (let i = 2; i <= n; i++) {
  for (let j = 0; j <= 9; j++) {
    if (j !== 0) dp[i][j] = dp[i][j] + dp[i - 1][j - 1];
    if (j !== 9) dp[i][j] = dp[i][j] + dp[i - 1][j + 1];
    dp[i][j] %= num;
  }
}

for (let j = 0; j <= 9; j++) {
  answer += dp[n][j];
}

console.log(answer % num);
