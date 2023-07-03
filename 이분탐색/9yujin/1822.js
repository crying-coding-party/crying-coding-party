const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N_A, N_B] = input.shift().split(" ").map(Number);
const A = input.shift().split(" ").map(Number);
const B = new Set(input.shift().split(" ").map(Number));

const ans = A.filter((v) => !B.has(v));
console.log(ans.length);
if (ans.length !== 0) {
  console.log(ans.sort((a, b) => a - b).join(" "));
}
