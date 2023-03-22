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
function solution([n, ...list]) {
  const size = Number(n);
  let normalMapCount = 0;
  let colorWeakCount = 0;
  const normalMap = list.map(i =>
    i.split('').map(el => {
      if (el === 'R') {
        return 1;
      } else if (el === 'B') {
        return 2;
      } else if (el === 'G') {
        return 3;
      }
    })
  );
  const colorWeak = list.map(i =>
    i.split('').map(el => {
      if (el === 'R' || el === 'G') {
        return 1;
      } else if (el === 'B') {
        return 2;
      }
    })
  );

  let normalVisited = Array.from(Array(size), () => new Array(size).fill(false));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (normalVisited[i][j] === false) {
        normalVisited[i][j] = true;
        bfs(i, j, size, normalMap, normalVisited);
        normalMapCount++;
      }
    }
  }

  let colorWeakVisited = Array.from(Array(size), () => new Array(size).fill(false));

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (colorWeakVisited[i][j] === false) {
        colorWeakVisited[i][j] = true;
        bfs(i, j, size, colorWeak, colorWeakVisited);
        colorWeakCount++;
      }
    }
  }
  console.log(normalMapCount, colorWeakCount);
}

function bfs(nowc, nowr, size, colormaps, visited) {
  const queue = new Queue();
  queue.enqueue([nowc, nowr]);

  while (!queue.isEmpty()) {
    const now = queue.dequeue();
    for (let i = 0; i < DR.length; i++) {
      const nextC = now[0] + DC[i];
      const nextR = now[1] + DR[i];

      if (nextC < 0 || nextC >= size || nextR < 0 || nextR >= size || visited[nextC][nextR]) {
        continue;
      }
      if (colormaps[nowc][nowr] === colormaps[nextC][nextR]) {
        queue.enqueue([nextC, nextR]);
        visited[nextC][nextR] = true;
      }
    }
  }
}
