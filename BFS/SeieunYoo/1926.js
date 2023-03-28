const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [ROW, COLUMN] = input.shift().split(' ').map(Number);
const BOARD = input.map((row) => row.split(' ').map(Number));
let visited = Array.from(Array(ROW), () => new Array(COLUMN).fill(false)); //visited 배열을 먼저 false 로 채워줌
let drawingCount = 0;
let maxArea = 0;

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const isValid = (row, col) => {
  return 0 <= row && row < ROW && 0 <= col && col <= COLUMN;
};

const isVisitable = (row, col) => {
  return BOARD[row][col] === 1 && visited[row][col] === false;
};

/**
 * BFS
 * @param {*} row
 * @param {*} col
 * @returns 넓이 반환
 */
const BFS = (row, col) => {
  let queue = [[row, col]];
  let area = 1; //제일 처음 시작할때

  while (queue.length !== 0) {
    let [currentX, currentY] = queue.shift();

    directions.map((dir) => {
      let [newX, newY] = [currentX + dir[0], currentY + dir[1]];

      if (isValid(newX, newY)) {
        if (isVisitable(newX,newY)) {
          visited[newX][newY] = true; //방문 true 로 바꿔줌
          area += 1; // 구하려는 넓이에 1을 더해줌
          queue.push([newX, newY]); //다시 bfs 진행하기 위해 queue 에 넣어줌
        }
      }
    });
  }

  return area;
};

for (let i = 0; i < ROW; i ++) {
  for (let j = 0; j < COLUMN; j ++) {
    if (isVisitable(i,j)) {
      visited[i][j] = true;
      maxArea = Math.max(maxArea, BFS(i, j));
      drawingCount ++;
    }
  }
}

console.log(drawingCount, maxArea);
