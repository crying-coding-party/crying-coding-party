const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [m, n, h] = input[0].split(" ").map(Number);
const arr = input.slice(1);
let tomato = [];
let visited = [];
for (let i = 0; i < h; i++) {
  let tmpArr = [];
  for (let j = 0; j < n; j++) {
    tmpArr.push(arr[i * n + j].split(" ").map(Number));
  }
  tomato.push(tmpArr);
  visited.push(Array.from(Array(n), () => new Array(m).fill(false)));
}

let queue = [];
for (let i = 0; i < h; i++) {
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < m; k++) {
      if (tomato[i][j][k] === 1) {
        visited[i][j][k] = true;
        queue.push([i, j, k]);
      }
    }
  }
}

const coordinate = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, -1, 0],
  [0, 0, -1],
  [0, 1, 0],
  [0, 0, 1],
];
let count = 0;
while (queue.length !== 0) {
  let nextQueue = [];
  queue.forEach((q) => {
    const [z, y, x] = q;

    coordinate.forEach((coor) => {
      const newX = x + coor[2];
      const newY = y + coor[1];
      const newZ = z + coor[0];
      if (newX >= 0 && newX < m && newY >= 0 && newY < n && newZ >= 0 && newZ < h && tomato[newZ][newY][newX] === 0 && !visited[newZ][newY][newX]) {
        visited[newZ][newY][newX] = true;
        nextQueue.push([newZ, newY, newX]);
        tomato[newZ][newY][newX] = 1;
      }
    });
  });

  if (nextQueue.length !== 0) count++;
  queue = [...nextQueue];
}

const isAnswer = tomato.every((zTomato) => zTomato.every((yTomato) => yTomato.every((t) => t === 1 || t === -1)));
console.log(isAnswer ? count : -1);
