const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const pictures = input.slice(1).map((inp) => inp.split(" ").map(Number));

const coordinate = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];
let answer = 0,
  maxDimension = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (pictures[i][j] === 0) continue;

    let queue = [[i, j]],
      curDimension = 0;
    pictures[i][j] = 0;
    answer += 1;
    while (queue.length !== 0) {
      const [x, y] = queue.shift();
      curDimension += 1;

      coordinate.forEach((coor) => {
        if (x + coor[0] >= 0 && x + coor[0] < n && y + coor[1] >= 0 && y + coor[1] < m && pictures[x + coor[0]][y + coor[1]] === 1) {
          queue.push([x + coor[0], y + coor[1]]);
          pictures[x + coor[0]][y + coor[1]] = 0;
        }
      });
    }

    maxDimension = Math.max(maxDimension, curDimension);
  }
}

console.log(`${answer}\n${maxDimension}`);
