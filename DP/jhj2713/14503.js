const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const [r, c, d] = input[1].split(" ").map(Number);
const map = input.slice(2).map((inp) => inp.split(" ").map(Number));

const isCleaned = Array.from(Array(n), () => new Array(m).fill(false));
const coordinates = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
const back = [
  [1, 0],
  [0, -1],
  [-1, 0],
  [0, 1],
];
let direction = d; // 0: 북, 1: 동, 2: 남, 3: 서
let x = r,
  y = c;
let answer = 0;

while (true) {
  if (map[x][y] === 0 && !isCleaned[x][y]) {
    isCleaned[x][y] = true;
    answer += 1;
  }

  let count = 0,
    newDir = direction;
  while (count < 4) {
    newDir = newDir - 1 < 0 ? 3 : newDir - 1;
    const newX = x + coordinates[newDir][0];
    const newY = y + coordinates[newDir][1];

    if (newX >= 0 && newX < n && newY >= 0 && newY < m && map[newX][newY] === 0 && !isCleaned[newX][newY]) {
      // 청소되지 않은 빈 칸이 있는 경우
      x = newX;
      y = newY;
      direction = newDir;
      break;
    }
    count += 1;
  }

  if (count === 4) {
    // 청소되지 않은 빈 칸이 없는 경우
    const newX = x + back[direction][0];
    const newY = y + back[direction][1];

    if (newX < 0 || newX >= n || newY < 0 || newY >= m || map[newX][newY] === 1) break; // 벽이라 후진할 수 없으면

    x = newX;
    y = newY;
  }
}

console.log(answer);
