const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();

const n = Number(input);

const dp = new Array(n + 1).fill(0);
const square = [1];
dp[1] = 1;

for (let i = 2; i <= n; i++) {
  if (Math.sqrt(i) === parseInt(Math.sqrt(i))) {
    square.push(i);
    dp[i] = 1;
  } else {
    dp[i] = dp[i - 1] + 1;
    for (let j = 0; j < square.length; j++) {
      dp[i] = Math.min(dp[i], dp[i - square[j]] + dp[square[j]]);
    }
  }
}

console.log(dp[n]);

// 1
// 1 + 1
// 1 + 1 + 1
// 4
// 1 + 4
// 1 + 1 + 4
// 1 + 1 + 1 + 4
// 4 + 4
// 9
// 1 + 9
// 1 + 1 + 9
// 1 + 1 + 1 + 9
// 4 + 9
