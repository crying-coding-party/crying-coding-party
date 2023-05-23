const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();

const numbers = input.split("-");
const newNumbers = [];

for (let i = 0; i < numbers.length; i++) {
  const newOperator = numbers[i].split("+").map(Number);
  newNumbers.push(newOperator.reduce((acc, val) => acc + val, 0));
}

let answer = newNumbers[0];
for (let i = 0; i < newNumbers.length - 1; i++) {
  answer = answer - newNumbers[i + 1];
}

console.log(answer);
