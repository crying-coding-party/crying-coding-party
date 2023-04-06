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

const DC = [1, -1, 0, 0];
const DR = [0, 0, 1, -1];

const puyoMap = input.map(i => i.split(''));
let answer = 0;
let isExploded = false;

solution();

function solution() {
  while (true) {
    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 6; j++) {
        if (puyoMap[i][j] !== '.') {
          bfs(i, j);
        }
      }
    }
    if (isExploded) {
      goDown();
      answer++;
    } else {
      break;
    }
    isExploded = false;
  }
}

function bfs(col, row) {
  const queue = new Queue();
  //  4개 이상인지 판단을 위해 큐 하나 더 생성 ..
  const countQueue = new Queue();
  let visited = Array.from(Array(12), () => new Array(6).fill(false));
  visited[col][row] = true;
  queue.enqueue([col, row]);
  countQueue.enqueue([col, row]);
  while (!queue.isEmpty()) {
    const now = queue.dequeue();
    for (let i = 0; i < DC.length; i++) {
      const nextC = now[0] + DC[i];
      const nextR = now[1] + DR[i];
      if (nextC < 0 || nextC >= 12 || nextR < 0 || nextR >= 6 || visited[nextC][nextR]) {
        continue;
      }
      if (puyoMap[col][row] === puyoMap[nextC][nextR]) {
        visited[nextC][nextR] = true;
        queue.enqueue([nextC, nextR]);
        countQueue.enqueue([nextC, nextR, puyoMap[nextC][nextR]]);
      }
    }
  }
  if (countQueue.queue.length >= 4) {
    while (!countQueue.isEmpty()) {
      const switchLocation = countQueue.dequeue();
      puyoMap[switchLocation[0]][switchLocation[1]] = '.';
    }
    isExploded = true;
  }
}

// 아래로 내리는 함수
function goDown() {
  let j = 0; //열마다 확인
  while (true) {
    for (let i = 11; i >= 0; i--) {
      if (puyoMap[i][j] != '.') continue;
      for (let k = 0; k <= i; k++) {
        if (puyoMap[k][j] != '.') {
          let c = puyoMap[i][j];
          puyoMap[i][j] = puyoMap[k][j];
          puyoMap[k][j] = c;
        }
      }
    }
    j++;
    if (j == 6) break;
  }
}

console.log(answer);
