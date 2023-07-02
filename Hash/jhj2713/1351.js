const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split(" ");

const n = Number(input[0]);
const p = Number(input[1]);
const q = Number(input[2]);

const A = new Map();

A.set(0, 1);
dfs(n);

function dfs(i) {
  if (A.has(i)) return A.get(i);

  A.set(i, dfs(Math.floor(i / p)) + dfs(Math.floor(i / q)));
  return A.get(i);
}

console.log(Number(A.get(n)));
