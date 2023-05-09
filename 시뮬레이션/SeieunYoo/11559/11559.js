const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const board = input.map((row) => row.trim().split('').map(String));
const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

let answer = 0;

while (true) {
  let isExplode = false;
  let explode = [];

  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 6; j++) {
      if (board[i][j] === '.') continue;

      let visited = Array.from(Array(12), () => new Array(6).fill(false));
      let queue = [[i, j]];
      let locations = [[i, j]];
      visited[i][j] = true;
      let color = board[i][j];

      while (queue.length > 0) {
        let [y, x] = queue.shift();

        for (let dir = 0; dir < 4; dir++) {
          let ny = y + directions[dir][0];
          let nx = x + directions[dir][1];

          if (ny < 0 || ny >= 12 || nx < 0 || nx >= 6) continue;

          if (board[ny][nx] !== color) continue;

          if (visited[ny][nx]) continue;

          queue.push([ny, nx]);
          locations.push([ny, nx]);
          visited[ny][nx] = true;
        }
      }

      if (locations.length >= 4) {
        isExplode = true;
        explode = [...explode, ...locations];
      }
    }
  }

  if (!isExplode) break;

  for (let [y, x] of explode) {
    board[y][x] = '.';
  }

  answer++;

  for (let c = 0; c < 6; c++) {
    let bottom = 11; // 열마다 가장 아래에 있는 블록의 인덱스

    for (let r = 11; r >= 0; r--) {
      if (board[r][c] !== '.') {
        board[bottom--][c] = board[r][c];
      }
    }

    // 남은 블록을 '.'으로 채우기
    for (let r = bottom; r >= 0; r--) {
      board[r][c] = '.';
    }
  }
}

console.log(answer);
