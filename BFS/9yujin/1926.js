const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M] = input[0].split(" ").map((v) => Number(v));
input.shift();

const graph = input.map((row) => row.split(" ").map((v) => Number(v)));
let visited = Array.from(Array(N), () => Array(M).fill(0));
const direction = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
let paintCount = 0;
let maxArea = 0;

const bfs = (y, x) => {
  const queue = [];
  let count = 1;
  queue.push([y, x]);
  visited[y][x] = 1;

  while (queue.length > 0) {
    const current = queue.shift();

    direction
      .filter((dir, i) => {
        const [newY, newX] = [current[0] + dir[0], current[1] + dir[1]];
        if (newY < 0 || newY >= N || newX < 0 || newX >= M) {
          return false;
        }
        if (visited[newY][newX] == 1 || graph[newY][newX] == 0) {
          return false;
        }
        return true;
      })
      .map((dir) => {
        const [newY, newX] = [current[0] + dir[0], current[1] + dir[1]];
        queue.push([current[0], current[1]]);
        queue.push([newY, newX]);
        visited[newY][newX] = 1;
        count += 1;
      });
  }

  maxArea = Math.max(maxArea, count);
};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (graph[i][j] == 1 && visited[i][j] == 0) {
      bfs(i, j);
      paintCount += 1;
    }
  }
}

console.log(paintCount);
console.log(maxArea);
