const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();
const n = parseInt(input);

const answer = Array.from(Array(n), () => new Array(n).fill(" "));

function recur(count, x, y) {
  if (count === 1) {
    answer[x][y] = "*";
    return;
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i === 1 && j === 1) continue;
      recur(count / 3, x + i * (count / 3), y + j * (count / 3));
    }
  }
}

recur(n, 0, 0);

console.log(answer.map((ans) => ans.join("")).join("\n"));
