const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = Number(input);
let DP = Array.from({ length: 101 }, () => Array.from({ length: 10 }, () => 0));

const getTotalValue = (matrix, N) => {
  let total = 0;
  for (let i = 0; i < 10; i++) {
    total += matrix[N][i];
  }
  return total;
};

for (let i = 1; i < 10; i++) {
  DP[1][i] = 1;
}

for (let i = 2; i < 101; i++) {
  for (let j = 0; j <= 9; j++) {
    if (j == 0) DP[i][j] = DP[i - 1][1];
    else if (j == 9) DP[i][j] = DP[i - 1][8];
    else DP[i][j] = DP[i - 1][j - 1] + DP[i - 1][j + 1];
  }
}

console.log(getTotalValue(DP, N) % 1000000000);
