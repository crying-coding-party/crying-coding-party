const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const square = input.slice(1).map((inp) => inp.split("").map(Number));

const dp = Array.from(Array(n), () => new Array(m).fill(0));

let answer = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (square[i][j] === 0) continue;

    if (i !== 0 && j !== 0) dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
    else dp[i][j] = 1;

    answer = Math.max(answer, dp[i][j]);
  }
}

console.log(answer ** 2);
