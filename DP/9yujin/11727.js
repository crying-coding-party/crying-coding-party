const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input);
let DP = Array.from({ length: n + 1 }, () => 0);

DP[1] = 1;
DP[2] = 3;

for (let i = 3; i < n + 1; i++) {
  DP[i] = (DP[i - 1] + 2 * DP[i - 2]) % 10007;
}

// 왜 여기서 한번 10007로 나누면 틀렸습니다가 뜨는거임??
// 반례는 다 맞는거같은데
console.log(DP[n]);
