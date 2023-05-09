const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m, x, y, k] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + n).map((inp) => inp.split(" ").map(Number));
const direction = input[n + 1].split(" ").map(Number);

const dice = [
  [-1, 0, -1],
  [0, 0, 0],
  [-1, 0, -1],
  [-1, 0, -1],
];

function checkCoordinate(dir, curX, curY) {
  if (dir === 1) {
    if (curY + 1 >= m) return [-1, -1];
    return [curX, curY + 1];
  }
  if (dir === 2) {
    if (curY - 1 < 0) return [-1, -1];
    return [curX, curY - 1];
  }
  if (dir === 3) {
    if (curX - 1 < 0) return [-1, -1];
    return [curX - 1, curY];
  }
  if (dir === 4) {
    if (curX + 1 >= n) return [-1, -1];
    return [curX + 1, curY];
  }
}

function copy(x, y) {
  if (map[x][y] === 0) {
    map[x][y] = dice[3][1];
    return;
  }

  dice[3][1] = map[x][y];
  map[x][y] = 0;
}

function roll(dir) {
  if (dir === 1) {
    const right = dice[1].pop();
    const bottom = dice[3][1];
    dice[3][1] = right;
    dice[1].unshift(bottom);
    return;
  }
  if (dir === 2) {
    const left = dice[1].shift();
    const bottom = dice[3][1];
    dice[3][1] = left;
    dice[1].push(bottom);
    return;
  }
  if (dir === 3) {
    let preNum = dice[3][1];
    for (let i = 2; i >= 0; i--) {
      const tmp = dice[i][1];
      dice[i][1] = preNum;
      preNum = tmp;
    }
    dice[3][1] = preNum;
    return;
  }
  if (dir === 4) {
    let preNum = dice[0][1];
    for (let i = 1; i < 4; i++) {
      const tmp = dice[i][1];
      dice[i][1] = preNum;
      preNum = tmp;
    }
    dice[0][1] = preNum;
    return;
  }
}

let curX = x,
  curY = y;
const answer = [];
direction.forEach((dir) => {
  const coor = checkCoordinate(dir, curX, curY);
  if (coor[0] === -1) return;

  (curX = coor[0]), (curY = coor[1]);
  roll(dir);
  copy(curX, curY);
  answer.push(dice[1][1]);
});

console.log(answer.join("\n"));
