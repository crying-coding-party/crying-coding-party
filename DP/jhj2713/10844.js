const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();

const n = Number(input);

const dp = [9n];
let lastNumber = [0n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n];

for (let i = 1; i < n; i++) {
  dp.push(dp[i - 1] * 2n - (lastNumber[0] + lastNumber[9]));
  const prevLastNumber = [...lastNumber];
  lastNumber[0] = prevLastNumber[1];
  for (let j = 1; j < 9; j++) {
    lastNumber[j] = prevLastNumber[j - 1] + prevLastNumber[j + 1];
  }
  lastNumber[9] = prevLastNumber[8];
}

console.log((dp[n - 1] % 1000000000n).toString());

// 1 2 3 4 5 6 7 8 9
// 10 12 21 23 32 34 43 45 54 56 65 67 76 78 87 89 98
// 101 121 123 210 212 232 234 321 323 343 345 432 434 454 456 543 545 565 567 654 656 676 678 765 767 787 789 876 878 898 987 989
