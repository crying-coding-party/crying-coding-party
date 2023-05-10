const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const triangle = input.map((v) => v.split(" ").map(Number));
let DP = Array.from(Array(N), (v, i) => Array(i + 1).fill(0));
DP[0][0] = triangle[0][0];
for (let i = 1; i < N; i++) {
  for (let j = 0; j < i + 1; j++) {
    DP[i][j] =
      triangle[i][j] + Math.max(DP[i - 1][j - 1] || 0, DP[i - 1][j] || 0);
  }
}

console.log(Math.max(...DP[N - 1]));
