const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [input] = fs.readFileSync(filePath).toString().trim().split("\n");
const parsed = input.split("-");
console.log(parsed);
const [first, ...rest] = parsed.map((v) => {
  console.log(v);
  const arr = v.split("+").map(Number);
  console.log(arr);
  return arr.reduce((a, b) => a + b, 0);
});

console.log(rest.reduce((a, b) => a - b, first));
