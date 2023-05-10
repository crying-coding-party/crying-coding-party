const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input);
let DP = Array.from({ length: N + 1 }, (v, i) => i);
DP[0] = 0;
DP[1] = 1;
DP[2] = 2;

for (let i = 1; i < N + 1; i++) {
  for (let j = 1; j < i; j++) {
    if (j * j > i) break;
    else if (DP[i] > DP[i - j * j] + 1) {
      DP[i] = DP[i - j * j] + 1;
    }
  }
}

console.log(DP[N]);
