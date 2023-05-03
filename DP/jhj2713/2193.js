const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = Number(input);

let pre = 1,
  next = 1;

for (let i = 2; i < n; i++) {
  const tmp = BigInt(pre) + BigInt(next);
  pre = next;
  next = tmp;
}

console.log(next.toString());
