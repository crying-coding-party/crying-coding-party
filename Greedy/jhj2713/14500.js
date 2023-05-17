const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const numbers = input.slice(1).map((inp) => inp.split(" ").map(Number));

const coordinates = [
  [0, -1],
  [-1, 0],
  [0, 1],
  [1, 0],
];
const exceptionCoordinates = [
  [
    [0, -1],
    [0, 0],
    [0, 1],
    [1, 0],
  ],
  [
    [-1, 0],
    [0, 0],
    [1, 0],
    [0, 1],
  ],
  [
    [-1, 0],
    [0, 0],
    [1, 0],
    [0, -1],
  ],
  [
    [0, -1],
    [0, 0],
    [0, 1],
    [-1, 0],
  ],
];

const visited = Array.from(Array(n), () => new Array(m).fill(false));
let max = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    visited[i][j] = true;
    dfs(i, j, 1, numbers[i][j]);
    visited[i][j] = false;

    findException(i, j);
  }
}

function dfs(i, j, count, sum) {
  if (count === 4) {
    max = Math.max(sum, max);
    return;
  }

  coordinates.forEach((coor) => {
    const newI = i + coor[0];
    const newJ = j + coor[1];
    if (newI >= 0 && newI < n && newJ >= 0 && newJ < m && !visited[newI][newJ]) {
      visited[newI][newJ] = true;
      dfs(newI, newJ, count + 1, sum + numbers[newI][newJ]);
      visited[newI][newJ] = false;
    }
  });
}
function findException(i, j) {
  exceptionCoordinates.forEach((coor) => {
    const newA = [i + coor[0][0], j + coor[0][1]];
    const newB = [i + coor[1][0], j + coor[1][1]];
    const newC = [i + coor[2][0], j + coor[2][1]];
    const newD = [i + coor[3][0], j + coor[3][1]];

    const isCoordinate = [newA, newB, newC, newD].every((val) => val[0] >= 0 && val[0] < n && val[1] >= 0 && val[1] < m);
    if (!isCoordinate) return;

    const sum = numbers[newA[0]][newA[1]] + numbers[newB[0]][newB[1]] + numbers[newC[0]][newC[1]] + numbers[newD[0]][newD[1]];
    max = Math.max(max, sum);
  });
}

console.log(max);
