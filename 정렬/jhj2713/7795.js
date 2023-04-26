const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const answer = [];

for (let i = 1; i < input.length; i++) {
  const [n, m] = input[i++].split(" ").map(Number);
  const aArr = input[i++].split(" ").map(Number);
  const bArr = input[i].split(" ").map(Number);

  let testAnswer = 0;

  const sortedAArr = aArr.sort((a, b) => a - b);
  const sortedBArr = bArr.sort((a, b) => a - b);

  for (let a = 0; a < sortedAArr.length; a++) {
    for (let b = 0; b < sortedBArr.length; b++) {
      if (sortedAArr[a] <= sortedBArr[b]) break;
      testAnswer += 1;
    }
  }

  answer.push(testAnswer);
}

console.log(answer.join("\n"));
