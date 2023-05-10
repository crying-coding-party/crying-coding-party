const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = Number(input);

let DP_1 = Array.from({ lengh: 91 }, () => 0);
let DP_0 = Array.from({ lengh: 91 }, () => 0);
let DP = Array.from({ lengh: 91 }, () => 0);

DP_1[1] = 1;
DP_0[1] = 0;
DP_1[2] = 0;
DP_0[2] = 1;
DP[0] = 0;
DP[1] = 1;
DP[2] = 1;

for (let i = 3; i < 91; i++) {
  DP_0[i] = BigInt(DP_0[i - 1] + DP_1[i - 1]);
  DP_1[i] = BigInt(DP_0[i - 1]);

  DP[i] = DP_0[i] + DP_1[i];
}

// Number가 아니라 String으로 바꿔줘야 정답이다!!
console.log(DP[N].toString());
