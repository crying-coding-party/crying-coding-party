const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

const N = Number(input.shift());
let graph = Array.from({ length: N }, () => Array(N).fill(0));

const info = input
  .map((v) => v.split(" ").map(Number))
  .map(([v, ...rest]) => [v, rest]);

info.forEach((student) => {
  const [id, likes] = student;
  
});
