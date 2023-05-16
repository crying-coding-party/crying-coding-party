const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const arr = input.map((v) => v.split(" ").map(Number));
let DP = Array.from({ length: N + 1 }, () => 0);

let k = 0;
for (let i = 0; i < N; i++) {
  k = Math.max(k, DP[i]);
  if (i + arr[i][0] <= N) {
    DP[i + arr[i][0] - 1] = Math.max(k + arr[i][1], DP[i + arr[i][0] - 1]);
    console.log(DP);
  }
}
