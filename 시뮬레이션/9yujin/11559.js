const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const height = 12;
const width = 6;

let graph = [...input].map((row) => [...row]);
let visited = Array.from(Array(height), () => Array(width).fill(0));

const direction = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

/**
 * 터뜨릴 뿌요집합 찾기
 */
const bfs = (y, x) => {
  const queue = [];
  const neighbor = [];
  queue.push([y, x]);
  neighbor.push([y, x]);
  visited[y][x] = 1;

  while (queue.length > 0) {
    const [cury, curx] = queue.shift();

    direction
      .filter(([dy, dx]) => {
        const ny = cury + dy;
        const nx = curx + dx;

        return (
          0 <= ny &&
          ny < height &&
          0 <= nx &&
          nx < width &&
          visited[ny][nx] === 0 &&
          graph[ny][nx] === graph[cury][curx]
        );
      })
      .forEach(([dy, dx]) => {
        const ny = cury + dy;
        const nx = curx + dx;

        visited[ny][nx] = 1;
        neighbor.push([ny, nx]);
        queue.push([ny, nx]);
      });
  }
  return neighbor;
};

const fall = () => {
  for (let j = 0; j < 6; j++) {
    for (let i = 11; i >= 0; i--) {
      if (graph[i][j] !== ".") {
        for (let k = 11; k >= i; k--) {
          if (graph[k][j] === ".") {
            graph[k][j] = graph[i][j];
            graph[i][j] = ".";
            break;
          }
        }
      }
    }
  }
};

let ans = 0;
while (true) {
  let flag = 0;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (graph[i][j] !== "." && visited[i][j] === 0) {
        const a = bfs(i, j);
        if (a.length >= 4) {
          a.forEach(([y, x]) => (graph[y][x] = "."));
          fall();
          flag = 1;
        }
      }
    }
  }
  if (flag == 0) break;
  ans += 1;
  visited = Array.from(Array(height), () => Array(width).fill(0));
}

console.log(ans);
