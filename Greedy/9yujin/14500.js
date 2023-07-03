const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const graph = input.map((row) => row.split(" ").map(Number));
let visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => 0)
);

