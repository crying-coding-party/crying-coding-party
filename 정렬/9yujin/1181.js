const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, ...input] = fs.readFileSync(filePath).toString().trim().split("\n");

const set = [...new Set(input)];
set.sort();
set.sort((x, y) => x.length - y.length);
set.forEach((v) => console.log(v));
