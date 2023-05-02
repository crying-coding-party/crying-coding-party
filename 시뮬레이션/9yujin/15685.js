const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const dx = [1, 0, -1, 0];
const dy = [0, -1, 0, 1];

let graph = Array.from(Array(101), () => Array(101).fill(0));
const N = Number(input.shift());
const curves = input.map((v) => v.split(" ").map(Number));

const setPoint = (curve) => {
  let [x, y, d, g] = curve;
  graph[y][x] = 1;
  let current = [d];
  for (let i = 0; i < g; i++) {
    const temp = [...current].reverse();
    current = [...current, ...temp.map((v) => (v + 1) % 4)];
  }

  current.forEach((d) => {
    x = x + dx[d];
    y = y + dy[d];
    if (x < 101 && y < 101) {
      graph[y][x] = 1;
    }
  });
};

curves.forEach((curve) => setPoint(curve));

let count = 0;
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    if (
      graph[i][j] === 1 &&
      graph[i + 1][j] === 1 &&
      graph[i][j + 1] === 1 &&
      graph[i + 1][j + 1]
    ) {
      count += 1;
    }
  }
}
console.log(count);

// 시간초과
