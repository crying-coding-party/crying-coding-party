const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const T = Number(input.shift());
for (let i = 0; i < T; i++) {
  const N = Number(input.shift());
  const stocks = input.shift().split(" ").map(Number);

  let target = N - 1;
  let max = stocks[N - 1];
  let sum = 0;
  while (target >= 0) {
    if (max < stocks[target]) {
      max = stocks[target];
    } else {
      sum += max - stocks[target];
    }
    target--;
  }
  console.log(sum);
}
