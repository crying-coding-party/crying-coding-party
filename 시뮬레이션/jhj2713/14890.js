const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, l] = input[0].split(" ").map(Number);
const map = input.slice(1).map((inp) => inp.split(" ").map(Number));

let answer = 0;

for (let i = 0; i < n; i++) {
  let sumFloor = 1,
    preNum = map[i][0],
    isAnswer = true;
  for (let j = 1; j < n; j++) {
    if (preNum === map[i][j]) {
      sumFloor += 1;
      continue;
    }
    if (preNum + 1 === map[i][j]) {
      if (sumFloor < l) {
        isAnswer = false;
        break;
      }

      sumFloor = 1;
      preNum = map[i][j];
      continue;
    }
    if (preNum - 1 === map[i][j]) {
      let nextCount = 0,
        k = j;
      for (k = j; k < n; k++) {
        if (map[i][k] !== map[i][j]) break;
        nextCount += 1;
      }

      if (nextCount < 2 * l && !(nextCount >= l && (k === n || (k < n && map[i][k] === map[i][j] - 1)))) {
        isAnswer = false;
        break;
      }

      j += nextCount - 1;
      sumFloor = nextCount - l;
      preNum = map[i][j];
      continue;
    }

    isAnswer = false;
    break;
  }

  if (isAnswer) answer += 1;
}

for (let j = 0; j < n; j++) {
  let sumFloor = 1,
    preNum = map[0][j],
    isAnswer = true;
  for (let i = 1; i < n; i++) {
    if (preNum === map[i][j]) {
      sumFloor += 1;
      continue;
    }
    if (preNum + 1 === map[i][j]) {
      if (sumFloor < l) {
        isAnswer = false;
        break;
      }

      sumFloor = 1;
      preNum = map[i][j];
      continue;
    }
    if (preNum - 1 === map[i][j]) {
      let nextCount = 0,
        k = i;
      for (k = i; k < n; k++) {
        if (map[k][j] !== map[i][j]) break;
        nextCount += 1;
      }

      if (nextCount < 2 * l && !(nextCount >= l && (k === n || (k < n && map[k][j] === map[i][j] - 1)))) {
        isAnswer = false;
        break;
      }

      i += nextCount - 1;
      sumFloor = nextCount - l;
      preNum = map[i][j];
      continue;
    }

    isAnswer = false;
    break;
  }

  if (isAnswer) answer += 1;
}

console.log(answer);
