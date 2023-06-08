const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }
  push(val) {
    this.queue[this.rear++] = val;
  }
  shift() {
    const tmp = this.queue[this.front];
    delete this.queue[this.front++];
    return tmp;
  }
  isEmpty() {
    return this.front === this.rear;
  }
}

const students = input.map((inp) => inp.split(""));

let answer = 0;
const visited = Array.from(Array(5), () => new Array(5).fill(false));

track(0, 0);

console.log(answer);

function track(idx, count) {
  if (count === 7) {
    const ans = bfs();
    if (ans !== -1) answer += 1;

    return;
  }

  if (idx === 25) return;

  visited[Math.floor(idx / 5)][idx % 5] = true;
  track(idx + 1, count + 1);
  visited[Math.floor(idx / 5)][idx % 5] = false;
  track(idx + 1, count);
}

function bfs() {
  let count = 0,
    answer = 0;
  const coordinates = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];

  const queueVisited = Array.from(Array(5), () => new Array(5).fill(false));

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (visited[i][j]) {
        queueVisited[i][j] = true;
      }
    }
  }

  const queue = new Queue();
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (queueVisited[i][j]) {
        queue.push([i, j]);
        queueVisited[i][j] = false;
        answer += students[i][j] === "S" ? 1 : 0;
        count += 1;
        break;
      }
    }
    if (!queue.isEmpty()) {
      break;
    }
  }

  while (!queue.isEmpty()) {
    const [x, y] = queue.shift();

    coordinates.forEach((coor) => {
      const newX = x + coor[0];
      const newY = y + coor[1];

      if (newX >= 0 && newX < 5 && newY >= 0 && newY < 5 && queueVisited[newX][newY]) {
        queue.push([newX, newY]);
        queueVisited[newX][newY] = false;
        answer += students[newX][newY] === "S" ? 1 : 0;
        count += 1;
      }
    });
  }

  return count === 7 && answer >= 4 ? answer : -1;
}
