const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = Number(input[0]);
const triangle = input.slice(1).map((inp) => inp.split(" ").map(Number));

for (let i = 1; i < n; i++) {
  const len = triangle[i].length;
  for (let j = 0; j < len; j++) {
    if (j === 0) triangle[i][j] += triangle[i - 1][j];
    else if (j === len - 1) triangle[i][j] += triangle[i - 1][j - 1];
    else triangle[i][j] += Math.max(triangle[i - 1][j], triangle[i - 1][j - 1]);
  }
}

console.log(Math.max(...triangle[triangle.length - 1]));
