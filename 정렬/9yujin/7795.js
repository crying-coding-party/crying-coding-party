const { count } = require("console");
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const T = Number(input.shift());

for (let i = 0; i < T; i++) {
  const [N, M] = input.shift().split(" ").map(Number);
  const A = input.shift().split(" ").map(Number);
  const B = input.shift().split(" ").map(Number);
  A.sort((a, b) => (a < b ? 1 : -1));
  B.sort((a, b) => (a < b ? 1 : -1));

  let cur = 0;
  let cnt = 0;
  A.forEach((v) => {
    for (let i = cur; i < M; i++) {
      if (v > B[i]) {
        cnt += M - i;
        break;
      } else {
        cur = i + 1;
      }
    }
  });
  console.log(cnt);
}
