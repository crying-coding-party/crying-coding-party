const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const answer = [];

for (let i = 1; i < input.length; i++) {
  const n = Number(input[i++]);
  const stock = input[i].split(" ").map(Number);

  let tmpAnswer = 0,
    max = 0;

  for (let j = stock.length - 1; j >= 0; j--) {
    if (max < stock[j]) {
      max = stock[j];
      continue;
    }

    tmpAnswer += max - stock[j];
  }

  answer.push(tmpAnswer);
}

console.log(answer.join("\n"));
