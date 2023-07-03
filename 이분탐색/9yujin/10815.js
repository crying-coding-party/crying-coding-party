const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const A = new Set(input.shift().split(" ").map(Number));
const M = Number(input.shift());
const B = input.shift().split(" ").map(Number);

const ans = B.map((v) => (A.has(v) ? 1 : 0));
console.log(ans.join(" "));
