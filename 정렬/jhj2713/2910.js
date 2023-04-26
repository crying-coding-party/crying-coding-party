const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const numbers = input[1].split(" ").map(Number);
const countMap = new Map();

numbers.forEach((n) => {
  if (!countMap.has(n)) countMap.set(n, 1);
  else countMap.set(n, countMap.get(n) + 1);
});

const sortedKey = [...countMap.keys()].sort((a, b) => {
  if (countMap.get(a) === countMap.get(b)) return 1;
  return countMap.get(b) - countMap.get(a);
});

const answer = [];
sortedKey.forEach((key) => {
  answer.push(...new Array(countMap.get(key)).fill(key));
});

console.log(answer.join(" "));
