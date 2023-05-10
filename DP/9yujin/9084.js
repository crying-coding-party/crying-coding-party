const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const T = Number(input.shift());
for (let i = 0; i < T; i++) {
  const N = Number(input.shift());
  const Coins = input.shift().split(" ").map(Number);
  const M = Number(input.shift());
  let DP = Array.from({ length: M + 1 }, () => 0);
  DP[0] = 1;

  Coins.forEach((c) => {
    for (let j = 0; j < M + 1; j++) {
      if (j >= c) {
        DP[j] += DP[j - c];
      }
    }
  });
  console.log(DP[M]);
}
