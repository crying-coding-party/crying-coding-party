const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const graph = input.map((v) => [...v].map(Number));
let DP = Array.from({ length: N }, () => Array.from({ length: M }, () => 0));

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (i == 0 || j == 0) DP[i][j] = graph[i][j];
    else if (graph[i][j] == 0) DP[i][j] = 0;
    else {
      DP[i][j] = Math.min(DP[i - 1][j], DP[i][j - 1], DP[i - 1][j - 1]) + 1;
    }
  }
}

let maxValue = 0;
DP.forEach((r) => r.forEach((c) => (maxValue = Math.max(maxValue, c))));
console.log(maxValue ** 2);
