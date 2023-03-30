const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input4.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [ROW, COLUMN, HEIGHT] = input.shift().split(' ').map(Number);
let ARRAY = input.map((row) => row.split(' ').map(Number));
let BOARD = [];
let visited = Array.from(Array(HEIGHT), () =>
  Array.from(Array(COLUMN), () => Array(ROW).fill(false))
);

let tomato = []; // 익은 토마토 담는 배열
let days = 0;

const directions = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];

//박스 3차원 배열 생성
for (let i = 0; i < ARRAY.length; i += COLUMN) {
  BOARD.push(ARRAY.slice(i, i + COLUMN));
}

const isValid = (row, col, height) => {
  return (
    0 <= row &&
    row < ROW &&
    0 <= col &&
    col < COLUMN &&
    0 <= height &&
    height < HEIGHT
  );
};

if (BOARD.some((row) => row.includes(0))) return console.log(0);

for (let i = 0; i < HEIGHT; i++) {
  for (let j = 0; j < COLUMN; j++) {
    for (let k = 0; k < ROW; k++) {
      if (BOARD[i][j][k] === 1) {
        tomato.push([i, j, k]); //익은 토마토 배열에 저장
      }
    }
  }
}

const BFS = (tomato) => {
  let queue = [...tomato];
  let nextQueue = [];
  let i = 0;

  while (queue.length > i) {
    //let [currentH, currentY, currentX] = queue.shift();
    let [currentH, currentY, currentX] = queue[i];
    i++;
    if (visited[currentH][currentY][currentX]) continue; 
    visited[currentH][currentY][currentX] = true;
    BOARD[currentH][currentY][currentX] = 1; 
    for (let [dx, dy, dh] of directions) {
      dx += currentX;
      dy += currentY;
      dh += currentH;

      if (
        !isValid(dx, dy, dh) ||
        visited[dh][dy][dx] ||
        BOARD[dh][dy][dx] !== 0
      ) {
        continue;
      }
      nextQueue.push([dh, dy, dx]);
      BOARD[dh][dy][dx] = 1;
    }

    if (queue.length === i && nextQueue.length) {
      days++;
      i = 0;
      queue = [];
      queue = [...nextQueue];
      nextQueue = [];
    }
  }

  return BOARD.flat(2).includes(0) ? -1 : days;
};

const maxDay = BFS(tomato);
console.log(maxDay);
