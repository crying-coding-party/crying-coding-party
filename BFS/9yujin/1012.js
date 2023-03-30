const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const T = Number(input.shift());

let testCase = 0;
let visited;

const direction = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const bfs = (y, x, M, N) => {
  const queue = [];
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
      });
  }
};

while (testCase < T) {
  const [M, N, K] = input
    .shift()
    .split(" ")
    .map((v) => Number(v));
  const cabbages = input
    .splice(0, K)
    .map((cell) => cell.split(" ").map((point) => Number(point)));
  graph = Array.from(Array(N), () => Array(M).fill(0));
  cabbages.map((v) => {
    graph[v[1]][v[0]] = 1;
  });

  visited = Array.from(Array(N), () => Array(M).fill(0));
  let count = 0;

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (visited[j][i] == 0 && graph[j][i] == 1) {
        bfs(j, i, M, N);
        count += 1;
      }
    }
  }
  console.log(count);
  testCase += 1;
}
