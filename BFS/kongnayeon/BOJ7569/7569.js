const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n').map((str) => str.trim());

const [M, N, H] = input[0].split(' ').map(Number);

let box = [];
for (let i = 1; i <= H; i++) {
 let board = [];
  for (let j = 0; j < N; j++) { 
    board.push(input[(i - 1) * N + j + 1].split(" ").map(Number));
  }
  box.push(board);
}

if (!box.flat(2).includes(0)) console.log(0);
else {
  let day = bfs(M, N, H, box)
  if (box.flat(2).includes(0)) console.log(-1);
  else console.log(day);
}

// 3차원
function bfs(M, N, H, box) {
  let day = -1;
  let queue = [];
  let visited = Array.from(Array(H), () =>
    Array.from(Array(N), () => Array(M).fill(false))
  ); // 방문 여부

  const dx = [0, -1, 0, 1, 0, 0]; // 위 상 우 하 좌 아래
  const dy = [0, 0, 1, 0, -1, 0];
  const dz = [-1, 0, 0, 0, 0, 1];

  for (let k = 0; k < H; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (!visited[k][i][j] && box[k][i][j] === 1) {
          visited[k][i][j] = true;
          queue.push([k, i, j, 0]);
        }
      }
    }
  }

  while (queue.length !== 0) {
    const [z, x, y, d] = queue.shift();
    day = d;
    for (let dir = 0; dir < 6; dir++) {
      let nz = z + dz[dir];
      let nx = x + dx[dir];
      let ny = y + dy[dir];

      if (nx < 0 || nx >= N || ny < 0 || ny >= M || nz < 0 || nz >= H)
        continue;
      if (visited[nz][nx][ny] || box[nz][nx][ny] !== 0) continue;

      visited[nz][nx][ny] = true;
      box[nz][nx][ny] = 1;
      queue.push([nz, nx, ny,  day + 1]);
    }
   
  }

  return box.flat(2).includes(0) ? -1 : day; 
}