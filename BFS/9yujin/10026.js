const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const graph = input;
let visited;
const direction = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const bfs = (y, x, color, graph) => {
  const queue = [];
  queue.push([y, x]);
  visited[y][x] = 1;

  while (queue.length > 0) {
    const current = queue.shift();

    direction
      .filter((dir, i) => {
        const [newY, newX] = [current[0] + dir[0], current[1] + dir[1]];
        if (newY < 0 || newY >= N || newX < 0 || newX >= N) {
          return false;
        }
        if (visited[newY][newX] == 1 || graph[newY][newX] !== color) {
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

const replaced = graph.map((r) => r.replace(/R/g, "G"));
const colors = ["R", "G", "B"];

/**
 * 정상
 */
let answer = 0;
visited = Array.from(Array(N), () => Array(N).fill(0));

colors.map((color) => {
  let count = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (visited[j][i] == 0 && graph[j][i] == color) {
        bfs(j, i, color, graph);
        count += 1;
      }
    }
  }
  answer += count;
});
console.log(answer);

/**
 * 적록색맹
 */
answer = 0;
visited = Array.from(Array(N), () => Array(N).fill(0));

colors.map((color) => {
  let count = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (visited[j][i] == 0 && replaced[j][i] == color) {
        bfs(j, i, color, replaced);
        count += 1;
      }
    }
  }
  answer += count;
});
console.log(answer);
