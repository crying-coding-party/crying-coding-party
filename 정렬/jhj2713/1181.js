const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const words = [...new Set(input.slice(1))];

const sortedWords = words.sort((a, b) => {
  if (a.length === b.length) return a < b ? -1 : 1;
  return a.length - b.length;
});

console.log(sortedWords.join("\n"));
