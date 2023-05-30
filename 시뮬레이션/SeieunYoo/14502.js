const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input3.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, m] = input.shift().split(' ').map(Number);
let map = input.map((row) => row.split(' ').map(Number));

// 2 주변에 1을 만들어야 됨(3개) / bfs 로 바이러스가 퍼진 위치를 파악
let virus = [];
let notVirus = [];
let ans = 0;

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function bfs() {
  let queue = [];
  let visited = Array.from(Array(n), () => new Array(m).fill(false));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (map[i][j] == 2) queue.push([i, j]);
    }
  }
  let virus = 0;

  while (queue.length != 0) {
    let [x, y] = queue.shift();

    virus++;
    for (let i = 0; i < 4; i++) {
      let nx = x + directions[i][0];
      let ny = y + directions[i][1];
      if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
      if (map[nx][ny] != 0 || visited[nx][ny]) continue;
      visited[nx][ny] = true;
      queue.push([nx, ny]);
    }
  }
  return virus;
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] == 2) {
      virus.push([i, j]);
    } else if (map[i][j] == 0) {
      notVirus.push([i, j]);
    }
  }
}

for (let i = 0; i < notVirus.length; i++) {
  map[notVirus[i][0]][notVirus[i][1]] = 1;
  for (let j = i + 1; j < notVirus.length; j++) {
    map[notVirus[j][0]][notVirus[j][1]] = 1;
    for (let k = j + 1; k < notVirus.length; k++) {
      map[notVirus[k][0]][notVirus[k][1]] = 1;

      let currentVirus = bfs();

      ans = Math.max(notVirus.length - 3 - currentVirus + virus.length, ans); //3개의벽 - 바이러스가 퍼진 구역
      map[notVirus[k][0]][notVirus[k][1]] = 0;
    }
    map[notVirus[j][0]][notVirus[j][1]] = 0;
  }
  map[notVirus[i][0]][notVirus[i][1]] = 0;
}

console.log(ans);
