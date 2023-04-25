const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input4.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input.shift());
const directions = input.map((x) => x.split(' ').map(Number));

const dx = [1, 0, -1, 0];
const dy = [0, -1, 0, 1];

const map = Array.from(Array(101), () => Array(101).fill(false));
let count = 0;

function rotate(dir) {
  if (dir == 0) return 1;
  else if (dir == 1) return 2;
  else if (dir == 2) return 3;
  else if (dir == 3) return 0;
}

function dragonCurve(x, y, d, g) {
  const dirs = [];
  dirs.push(d);
  for (let i = 0; i < g; i++) {
    for (let j = dirs.length - 1; j >= 0; j--) {
      dirs.push(rotate(dirs[j]));
    }
  }
  map[x][y] = true;
  for (let i = 0; i < dirs.length; i++) {
    x += dx[dirs[i]];
    y += dy[dirs[i]];

    map[x][y] = true;
  }
}

for (let i = 0; i < N; i++) {
  const [x, y, d, g] = directions[i];
  dragonCurve(x, y, d, g);
}

for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    if (map[i][j] && map[i + 1][j] && map[i][j + 1] && map[i + 1][j + 1]) {
      count++;
    }
  }
}
console.log(count);
