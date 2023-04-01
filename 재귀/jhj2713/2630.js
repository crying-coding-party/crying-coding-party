const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = parseInt(input[0]);
const confetti = input.slice(1).map((inp) => inp.split(" ").map(Number));
const answer = [0, 0];

function recur(count, y, x) {
  if (count === 1) {
    answer[confetti[y][x]] += 1;
    return;
  }

  let flag = false;
  const tmp = confetti[y][x];
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      if (confetti[y + i][x + j] !== tmp) {
        flag = true;
        break;
      }
    }
    if (flag) break;
  }

  if (!flag) {
    answer[tmp] += 1;
    return;
  }

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      recur(count / 2, y + i * (count / 2), x + j * (count / 2));
    }
  }
}

recur(n, 0, 0);

console.log(answer.join("\n"));
