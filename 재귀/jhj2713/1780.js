const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = parseInt(input[0]);
const integers = input.slice(1).map((inp) => inp.split(" ").map(Number));
const answer = [0, 0, 0];

function recur(count, x, y) {
  if (count === 1) {
    answer[integers[x][y] + 1] += 1;
    return;
  }

  const tmp = integers[x][y];
  let flag = false;
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      if (integers[x + i][y + j] !== tmp) {
        flag = true;
        break;
      }
    }
    if (flag) break;
  }

  if (!flag) answer[tmp + 1] += 1;
  else {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        recur(count / 3, x + i * (count / 3), y + j * (count / 3));
      }
    }
  }
}

recur(n, 0, 0);

console.log(answer.join("\n"));
