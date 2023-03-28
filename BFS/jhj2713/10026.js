const fs = require("fs");
const [num, ...input] = fs.readFileSync("/dev/stdin").toString().trim().split(/\s/);

const n = Number(num);
const drawing = input.map((inp) => inp.split(""));
const answer = [];

const coordinate = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];
let visited = Array.from(Array(n), () => new Array(n).fill(false));
let queue = [];
let count = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (visited[i][j]) continue;

    count++;
    queue = [[i, j]];
    const color = drawing[i][j];
    while (queue.length !== 0) {
      const [x, y] = queue.shift();

      coordinate.forEach((coor) => {
        if (
          x + coor[0] >= 0 &&
          x + coor[0] < n &&
          y + coor[1] >= 0 &&
          y + coor[1] < n &&
          drawing[x + coor[0]][y + coor[1]] === color &&
          !visited[x + coor[0]][y + coor[1]]
        ) {
          queue.push([x + coor[0], y + coor[1]]);
          visited[x + coor[0]][y + coor[1]] = true;
        }
      });
    }
  }
}

answer.push(count);

visited = Array.from(Array(n), () => new Array(n).fill(false));
queue = [];
count = 0;

const rgDrawing = drawing.map((draw) => draw.map((d) => (d === "R" ? "G" : d)));

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (visited[i][j]) continue;

    count++;
    queue = [[i, j]];
    const color = rgDrawing[i][j];
    while (queue.length !== 0) {
      const [x, y] = queue.shift();

      coordinate.forEach((coor) => {
        if (
          x + coor[0] >= 0 &&
          x + coor[0] < n &&
          y + coor[1] >= 0 &&
          y + coor[1] < n &&
          rgDrawing[x + coor[0]][y + coor[1]] === color &&
          !visited[x + coor[0]][y + coor[1]]
        ) {
          queue.push([x + coor[0], y + coor[1]]);
          visited[x + coor[0]][y + coor[1]] = true;
        }
      });
    }
  }
}

answer.push(count);

console.log(answer.join("\n"));
