const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M, x, y, K] = input.shift().split(" ").map(Number);
const graph = input.map((row) => row.split(" ").map(Number));
const move = graph.pop();
console.log(graph, move);
