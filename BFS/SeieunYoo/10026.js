const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input3.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const num = input.shift();
const BOARD = input.map((row) => row.trim().split('').map(String));
const ROW = Number(num);
const COLUMN = Number(num);
let visited = Array.from(Array(ROW), () => new Array(COLUMN).fill(false));
let rgCount,
  notrgCount = 0;

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const isValid = (row, col) => {
  return 0 <= row && row < ROW && 0 <= col && col < COLUMN;
};

const BFS = (row, col) => {
  let queue = [[row, col]];
  visited[row][col] = true;

  while (queue.length !== 0) {
    let [currentX, currentY] = queue.shift();

    directions.map((dir) => {
      let [newX, newY] = [currentX + dir[0], currentY + dir[1]];

      if (isValid(newX, newY)) {
        if (BOARD[row][col] === BOARD[newX][newY] && !visited[newX][newY]) {
          visited[newX][newY] = true;
          queue.push([newX, newY]);
        }
      }
    });
  }
};

const countArea = () => {
  let count = 0;
  for (let i = 0; i < ROW; i ++) {
    for (let j = 0; j < COLUMN; j ++) {
      if (!visited[i][j]) {
        count++;
        BFS(i, j);
      }
    }
  }
  return count;
};

// 먼저 적록 색약이 아닌 거 count
notrgCount = countArea();

//적록 색약 구역 count 를 위해 방문 초기화
visited = Array.from(Array(ROW), () => Array(COLUMN).fill(false));

for (let i = 0; i < ROW; i ++) {
  for (let j = 0; j < COLUMN; j ++) {
    if (BOARD[i][j] === 'R') BOARD[i][j] = 'G'; //적록색약은 R = G
  }
}
rgCount = countArea();
console.log(notrgCount, rgCount);
