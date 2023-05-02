const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(/[ \n]+/)
  .map((v) => v.split(" "));

const [N, ...flat] = input.reduce((acc, cur) => (acc = [...acc, ...cur]));
const reversed = flat.map((v) => Number([...v].reverse().join("")));

reversed.sort((a, b) => a - b);
reversed.forEach((v) => console.log(v));
