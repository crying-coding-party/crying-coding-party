const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = Number(input);

const answerArr = [1, 3];
for (let i = 2; i < n; i++) {
  answerArr.push((answerArr[i - 1] + answerArr[i - 2] * 2) % 10007);
}

console.log(answerArr[n - 1]);
