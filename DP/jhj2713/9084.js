const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const answer = [];

for (let i = 1; i < input.length; i++) {
  const n = Number(input[i++]);
  const prices = input[i++].split(" ").map(Number);
  const target = Number(input[i]);

  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;

  for (let k = 0; k < n; k++) {
    for (let j = prices[0]; j <= target; j++) {
      if (j < prices[k]) continue;
      dp[j] += dp[j - prices[k]];
    }
  }

  answer.push(dp[target]);
}

console.log(answer.join("\n"));
