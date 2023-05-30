const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }
  push(value) {
    this.queue.push(value);
    this.rear += 1;
  }
  shift() {
    const value = this.queue[this.front];
    delete this.queue[this.front++];
    return value;
  }
  isEmpty() {
    return this.front === this.rear;
  }
  reset() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }
}

const [n, m] = input[0].split(" ").map(Number);
const map = input.slice(1).map((inp) => inp.split(" ").map(Number));
const wallVisited = Array.from(Array(n), () => new Array(m).fill(false));

let answer = 0;
const queue = new Queue();

backtracking(0, 0, []);
console.log(answer);

function backtracking(x, y, wall) {
  if (wall.length === 3) {
    const newMap = [...map.map((m) => [...m])];
    wall.forEach((w) => {
      newMap[w[0]][w[1]] = 1;
    });

    answer = Math.max(answer, findSafeZone(newMap));
    return;
  }

  for (let i = x; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (wallVisited[i][j] || map[i][j] !== 0) continue;
      wallVisited[i][j] = true;
      backtracking(i, j, [...wall, [i, j]]);
      wallVisited[i][j] = false;
    }
  }
}

function findSafeZone(newMap) {
  queue.reset();
  const visited = Array.from(Array(n), () => new Array(m).fill(false));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (newMap[i][j] === 2) {
        queue.push([i, j]);
        visited[i][j] = true;
      }
    }
  }

  const coordinates = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];
  while (!queue.isEmpty()) {
    const [i, j] = queue.shift();

    coordinates.forEach((coor) => {
      const newI = i + coor[0];
      const newJ = j + coor[1];

      if (newI >= 0 && newI < n && newJ >= 0 && newJ < m && newMap[newI][newJ] === 0 && !visited[newI][newJ]) {
        queue.push([newI, newJ]);
        visited[newI][newJ] = true;
      }
    });
  }

  let safeZone = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (newMap[i][j] === 0 && !visited[i][j]) safeZone += 1;
    }
  }

  return safeZone;
}
