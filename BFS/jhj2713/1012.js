const fs = require("fs");
const [num, ...input] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const testCase = Number(num);

let preIndex = 0,
  answer = [];
const coordinate = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

for (let t = 0; t < testCase; t++) {
  let count = 0;
  const [m, n, k] = input[preIndex++].split(" ").map(Number);
  const arr = Array.from(Array(n), () => new Array(m).fill(0));

  for (let i = 0; i < k; i++) {
    const [x, y] = input[preIndex++].split(" ").map(Number);
    arr[y][x] = 1;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (arr[i][j] === 0) continue;

      let queue = [[i, j]];
      count++;
      while (queue.length !== 0) {
        const [x, y] = queue.shift();

        coordinate.forEach((coor) => {
          if (x + coor[0] >= 0 && x + coor[0] < n && y + coor[1] >= 0 && y + coor[1] < m && arr[x + coor[0]][y + coor[1]] === 1) {
            queue.push([x + coor[0], y + coor[1]]);
            arr[x + coor[0]][y + coor[1]] = 0;
          }
        });
      }
    }
  }

  answer.push(count);
}

console.log(answer.join("\n"));
