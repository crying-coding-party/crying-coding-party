const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
let [r, c, d] = input.shift().split(" ").map(Number);
const graph = input.map((r) => r.split(" ").map(Number));

const dx = [0, 1, 0, -1];
const dy = [-1, 0, 1, 0];
let count = 0;

while (True) {}
