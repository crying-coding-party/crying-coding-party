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

solution(input);
function solution([n, ...list]) {
  const [r, c, h] = n.split(' ').map(Number);
  const tomatoMap = [];
  for (let k = 0; k < h; k++) {
    const smallMap = [];
    for (let i = 0; i < c; i++) {
      smallMap.push(list.shift().split(' ').map(Number));
    }
    tomatoMap.push(smallMap);
  }

  //  상하좌우위아래 고려
  const DR = [-1, 0, 0, 1, 0, 0];
  const DC = [0, -1, 0, 0, 1, 0];
  const DH = [0, 0, -1, 0, 0, 1];

  let countDays = [0];
  let notYetTomato = 0;
  let visited = new Array(h).fill(Array.from(Array(c), () => Array(r).fill(false)));
  const queue = new Queue();

  for (let k = 0; k < h; k++) {
    for (let i = 0; i < c; i++) {
      for (let j = 0; j < r; j++) {
        if (tomatoMap[k][i][j] === 1) {
          visited[k][i][j] = true;
          queue.enqueue([k, i, j, 0]);
        } else if (tomatoMap[k][i][j] === 0) {
          notYetTomato++;
        }
      }
    }
  }

  while (!queue.isEmpty()) {
    const now = queue.dequeue();
    for (let i = 0; i < DR.length; i++) {
      let nextC = now[1] + DC[i];
      let nextR = now[2] + DR[i];
      let nextH = now[0] + DH[i];
      day = now[3] + 1;
      if (nextC < 0 || nextC >= c || nextR < 0 || nextR >= r || nextH < 0 || nextH >= h) {
        continue;
      }
      if (tomatoMap[nextH][nextC][nextR] === 0) {
        notYetTomato--;
        tomatoMap[nextH][nextC][nextR] = 1;
        queue.enqueue([nextH, nextC, nextR, day]);
        visited[nextH][nextC][nextR] = true;
        countDays.push(day);
      }
    }
  }

  if (notYetTomato > 0) {
    console.log(-1);
  } else {
    console.log(Math.max(...countDays));
  }
}
