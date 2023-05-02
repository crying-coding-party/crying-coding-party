const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const calculate = [
  (a, b) => a + b,
  (a, b) => a - b,
  (a, b) => a * b,
  (a, b) => (a > 0 ? Math.floor(a / b) : -Math.floor(-a / b)),
];

const N = Number(input.shift());
const A = input.shift().split(" ").map(Number);
const OP = input.shift().split(" ").map(Number);

let max = Number.MIN_SAFE_INTEGER;
let min = Number.MAX_SAFE_INTEGER;

const dfs = (count, result) => {
  if (count === N - 1) {
    max = Math.max(max, result);
    min = Math.min(min, result);
  } else {
    OP.forEach((operator, i) => {
      if (operator > 0) {
        OP[i]--;
        dfs(count + 1, calculate[i](result, A[count + 1]));
        OP[i]++;
      }
    });
  }
};

dfs(0, A[0]);
console.log(max);
console.log(min);

// 35% 실패
