const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const numbers = [];
input.forEach((inp) => {
  if (inp) numbers.push(...inp.split(" "));
});

const sortedNumber = numbers.slice(1).map((n) => parseInt(n.split("").reverse().join("")));

console.log(sortedNumber.sort((a, b) => a - b).join("\n"));
