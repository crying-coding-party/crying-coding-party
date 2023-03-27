const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input2.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const num = input.shift();

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

let BOARD = [];
let [ROW, COLUMN, COUNT] = [];

const isValid = (row, col) => {
  return 0 <= row && row < ROW && 0 <= col && col < COLUMN;
};

const isVisitable = (row, col) => {
  return BOARD[row][col] === 1;
};

const BFS = (row, col) => {
  let queue = [[row, col]];

  while (queue.length !== 0) {
    let [currentX, currentY] = queue.shift();
    if (!BOARD[currentX][currentY]) continue;
    else BOARD[currentX][currentY] = 0;

    directions.map((dir) => {
      let [newX, newY] = [currentX + dir[0], currentY + dir[1]];
      if (isValid(newX, newY)) {
        if (isVisitable(newX, newY)) {
          queue.push([newX, newY]);
        }
      }
    });
  }
};

//입력받기
for (let i = 0; i < num; i++) {
  let worm = 0;
  [ROW, COLUMN, COUNT] = input.shift().split(' ').map(Number);
  BOARD = Array.from(Array(ROW), () => new Array(COLUMN).fill(0));
  for (let j = 0; j < COUNT; j++) {
    let [X, Y] = input.shift().split(' ').map(Number);
    BOARD[X][Y] = 1;
  }

  for (let k = 0; k < ROW; k++) {
    for (let l = 0; l < COLUMN; l++) {
      if (BOARD[k][l] ===1) {
        BFS(k, l);
        worm ++;
      }
    }
  }
  console.log(worm);
}