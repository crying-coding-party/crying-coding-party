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

const DC = [0, 0, 1, -1];
const DR = [-1, 1, 0, 0];

solution(input);

function solution([n, ...list]) {
  const [col, row] = n.split(' ').map(Number);
  const numberMaps = list.map(i => i.split('').map(Number));
  //   1 1 일 때 예외처리
  if (col === 1 && row === 1) {
    console.log(1);
    return;
  }

  console.log(bfs(col, row, numberMaps));
}

function bfs(col, row, numberMaps) {
  const queue = new Queue();
  const visited = Array.from(Array(col), () => new Array(row).fill(0));
  let answer = -1;
  //   col, row, isCrashed, distance
  queue.enqueue([0, 0, false, 0]);
  visited[0][0] = 2;
  while (!queue.isEmpty()) {
    const now = queue.dequeue();
    for (let i = 0; i < DC.length; i++) {
      let nextC = now[0] + DC[i];
      let nextR = now[1] + DR[i];
      let isCrashed = now[2];
      let nextDis = now[3] + 1;
      if (nextR === row - 1 && nextC === col - 1) {
        answer = nextDis + 1;
        return answer;
      }

      if (nextC < 0 || nextC >= col || nextR < 0 || nextR >= row) {
        continue;
      }

      if (isCrashed) {
        if (numberMaps[nextC][nextR] === 0 && visited[nextC][nextR] === 0) {
          visited[nextC][nextR] = 1;
          queue.enqueue([nextC, nextR, isCrashed, nextDis]);
        }
      } else {
        if (numberMaps[nextC][nextR] === 0 && visited[nextC][nextR] < 2) {
          visited[nextC][nextR] = 2;
          queue.enqueue([nextC, nextR, isCrashed, nextDis]);
        } else if (numberMaps[nextC][nextR] === 1 && visited[nextC][nextR] < 2) {
          visited[nextC][nextR] = 1;
          queue.enqueue([nextC, nextR, !isCrashed, nextDis]);
        }
      }
    }
  }
  return answer;
}
