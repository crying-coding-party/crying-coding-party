const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = Number(input[0]);
const space = input.slice(1).map((inp) => inp.split(" ").map(Number));

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }
  shift() {
    const val = this.queue[this.front];
    delete this.queue[this.front++];
    return val;
  }
  push(val) {
    this.queue.push(val);
    this.rear++;
  }
  isEmpty() {
    return this.front === this.rear;
  }
}

const queue = new Queue();
let coordinates = [];
const visited = Array.from(Array(n), () => new Array(n).fill(false));
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (space[i][j] === 9) {
      queue.push([i, j, 0]);
      space[i][j] = 0;
      visited[i][j] = true;
      break;
    }
  }
}

let size = 2,
  answer = 0,
  count = 0;
const directions = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

while (true) {
  // 먹을 수 있는 물고기 탐색
  while (!queue.isEmpty()) {
    const [x, y, val] = queue.shift();
    directions.forEach((dir) => {
      const newX = x + dir[0];
      const newY = y + dir[1];

      if (newX >= 0 && newX < n && newY >= 0 && newY < n && space[newX][newY] <= size && !visited[newX][newY]) {
        if (space[newX][newY] !== 0 && space[newX][newY] < size) {
          coordinates.push([newX, newY, val + 1]);
          visited[newX][newY] = true;
        } else {
          queue.push([newX, newY, val + 1]);
          visited[newX][newY] = true;
        }
      }
    });
  }

  // 먹을 수 있는 물고기가 없으면 종료
  if (coordinates.length === 0) {
    break;
  }

  // 먹을 수 있는 물고기 중 거리가 가장 가까운 물고기 탐색
  coordinates.sort((a, b) => {
    if (a[2] !== b[2]) return a[2] - b[2];
    if (a[0] !== b[0]) return a[0] - b[0];
    return a[1] - b[1];
  });

  count += 1;
  answer += coordinates[0][2];
  space[coordinates[0][0]][coordinates[0][1]] = 0;

  // 다음 탐색을 위한 초기화
  queue.push([coordinates[0][0], coordinates[0][1], 0]);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === coordinates[0][0] && j === coordinates[0][1]) visited[i][j] = true;
      else visited[i][j] = false;
    }
  }
  coordinates = [];

  if (count === size) {
    size += 1;
    count = 0;
  }
}

console.log(answer);
