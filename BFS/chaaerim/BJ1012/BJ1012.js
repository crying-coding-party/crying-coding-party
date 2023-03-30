const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }
  enqueue(value) {
    this.queue[this.rear++] = value;
  }
  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front += 1;
    return value;
  }
  isEmpty() {
    return this.rear === this.front;
  }
}

const DR = [1, -1, 0, 0];
const DC = [0, 0, 1, -1];

const [n, ...list] = input;
for (let i = 0; i < n; i++) {
  const [row, col, num] = list.shift().split(' ').map(Number);
  const wormMaps = Array.from(Array(col), () => new Array(row).fill(0));
  for (let j = 0; j < num; j++) {
    const [nowr, nowc] = list.shift().split(' ').map(Number);
    wormMaps[nowc][nowr] = 1;
  }
  solution(wormMaps, col, row);
}

function solution(wormMaps, col, row) {
  let count = 0;
  let visited = Array.from(Array(col), () => new Array(row).fill(false));
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      if (wormMaps[i][j] === 1 && visited[i][j] === false) {
        visited[i][j] = true;
        bfs(i, j, col, row, wormMaps, visited);
        count++;
      }
    }
  }
  console.log(count);
}

function bfs(nowc, nowr, col, row, wormMaps, visited) {
  const queue = new Queue();
  queue.enqueue([nowc, nowr]);

  while (!queue.isEmpty()) {
    const now = queue.dequeue();
    for (let i = 0; i < DR.length; i++) {
      const nextC = now[0] + DC[i];
      const nextR = now[1] + DR[i];
      if (nextC < 0 || nextC >= col || nextR < 0 || nextR >= row || visited[nextC][nextR] === true) {
        continue;
      }
      if (wormMaps[nextC][nextR] === 1) {
        queue.enqueue([nextC, nextR]);
        visited[nextC][nextR] = true;
      }
    }
  }
}
