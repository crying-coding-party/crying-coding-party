const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const puyopuyo = input.map((inp) => inp.split(""));

const coordinates = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];
let visited = Array.from(Array(12), () => new Array(6).fill(false));
let result = 0;

while (true) {
  let isPop = false;
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 6; j++) {
      if (puyopuyo[i][j] === "." || visited[i][j]) continue;

      const queue = [[i, j]],
        tmpQueue = [[i, j]];
      const tmp = puyopuyo[i][j];
      visited[i][j] = true;
      while (tmpQueue.length !== 0) {
        const [y, x] = tmpQueue.pop();

        coordinates.forEach((coor) => {
          const newY = y + coor[0];
          const newX = x + coor[1];
          if (newY >= 0 && newY < 12 && newX >= 0 && newX < 6 && !visited[newY][newX] && puyopuyo[newY][newX] === tmp) {
            queue.push([newY, newX]);
            tmpQueue.push([newY, newX]);
            visited[newY][newX] = true;
          }
        });
      }

      if (queue.length >= 4) {
        isPop = true;
        queue.forEach(([y, x]) => {
          puyopuyo[y][x] = ".";
        });
      }
    }
  }
  if (!isPop) break;
  result += 1;

  for (let j = 0; j < 6; j++) {
    for (let i = 11; i >= 0; i--) {
      if (puyopuyo[i][j] === ".") continue;

      for (let k = 11; k >= i; k--) {
        if (puyopuyo[k][j] === ".") {
          puyopuyo[k][j] = puyopuyo[i][j];
          puyopuyo[i][j] = ".";
          break;
        }
      }
    }
  }

  visited = Array.from(Array(12), () => new Array(6).fill(false));
}

console.log(result);
