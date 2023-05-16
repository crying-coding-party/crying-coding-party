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
    return this.front === this.rear;
  }
}

const DC = [-1, 0, 1, 0];
const DR = [0, 1, 0, -1];
solution(input);

function solution([N, l, ...list]) {
  const [n, m] = N.split(' ').map(Number);
  const [c, r, d] = l.split(' ').map(Number);
  const numList = list.map(i => i.split(' ').map(Number));
  let ans = 0;
  const visited = Array.from(Array(n), () => Array(m).fill(false));

  ans = bfs(c, r, d, visited, numList, n, m);
  console.log(ans);
}

function bfs(c, r, d, visited, numList, n, m) {
  const queue = new Queue();
  queue.enqueue([c, r, d, 1]);
  visited[c][r] = true;

  while (!queue.isEmpty()) {
    const [col, row, dir, howmany] = queue.dequeue();
    let flag = false;
    for (let i = 1; i <= 4; i++) {
      const nextDir = Math.abs(4 + dir - i) % 4;
      const nextC = col + DC[nextDir];
      const nextR = row + DR[nextDir];
      if (nextC < 0 || nextC >= n || nextR < 0 || nextR >= m || numList[nextC][nextR] === 1) {
        continue;
      }
      if (numList[nextC][nextR] === 0 && visited[nextC][nextR] === false) {
        visited[nextC][nextR] = true;
        flag = true;
        queue.enqueue([nextC, nextR, nextDir, howmany + 1]);
        break;
      }
    }
    if (!flag) {
      const backDir = (dir + 2) % 4;
      const backC = col + DC[backDir];
      const backR = row + DR[backDir];
      if (numList[backC][backR] === 1) {
        return howmany;
      } else {
        queue.enqueue([backC, backR, dir, howmany]);
      }
    }
    // console.log(howmany);
  }
}
