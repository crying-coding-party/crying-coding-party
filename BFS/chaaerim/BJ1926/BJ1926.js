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

solution(input);
function solution([location, ...maps]) {
  const [c, r] = location.split(' ').map(Number);
  const numberMaps = maps.map(i => i.split(' ').map(Number));

  const widthArray = [0];
  let count = 0;
  let visited = Array.from(Array(c), () => new Array(r).fill(false));
  for (let i = 0; i < c; i++) {
    for (let j = 0; j < r; j++) {
      if (numberMaps[i][j] === 1 && visited[i][j] === false) {
        visited[i][j] = true;
        bfs(i, j, visited, numberMaps, widthArray, c, r);
        count++;
      }
    }
  }
  console.log(count);
  console.log(Math.max(...widthArray));
}

function bfs(nowC, nowR, visited, numberMaps, widthArray, c, r) {
  const queue = new Queue();
  let width = 1;
  queue.enqueue([nowC, nowR, width]);
  while (!queue.isEmpty()) {
    const now = queue.dequeue();
    for (let i = 0; i < DR.length; i++) {
      const nextC = now[0] + DC[i];
      const nextR = now[1] + DR[i];
      if (nextC < 0 || nextC >= c || nextR < 0 || nextR >= r || visited[nextC][nextR] === true) {
        continue;
      }
      if (numberMaps[nextC][nextR] === 1) {
        visited[nextC][nextR] = true;
        queue.enqueue([nextC, nextR, width++]);
      }
    }
  }
  widthArray.push(width);
}
