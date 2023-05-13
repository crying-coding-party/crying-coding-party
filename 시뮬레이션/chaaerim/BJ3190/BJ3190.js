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

function solution(input) {
  const size = Number(input.shift());
  const appleArray = Array.from(Array(size), () => new Array(size).fill(0));
  const appleNum = Number(input.shift());
  for (let i = 0; i < appleNum; i++) {
    const [c, r] = input.shift().split(' ').map(Number);
    appleArray[c - 1][r - 1] = 1;
  }
  const howMuchMove = Number(input.shift());
  const howToMove = [];
  for (let i = 0; i < howMuchMove; i++) {
    howToMove.push(input.shift().split(' '));
  }

  let count = 0;
  //   동남서북
  const DIR = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const queue = new Queue();
  //   headc, headr, tailc, tailr, d
  queue.enqueue([0, 0, 0, 0, 0]);
  appleArray[0][0] = 2;
  let [sec, d] = howToMove.shift();
  const snake = [[0, 0]];
  while (true) {
    let [headC, headR, tailC, tailR, dir] = queue.dequeue();
    if (Number(sec) === count) {
      if (d === 'D') {
        dir = (dir + 1) % 4;
      } else {
        dir = (dir + 3) % 4;
      }
      if (howToMove.length !== 0) {
        [sec, d] = howToMove.shift();
      }
    }
    let nextC = headC + DIR[dir][0];
    let nextR = headR + DIR[dir][1];

    // console.log(count, sec, snake, dir, appleArray, 'hello');

    // 만약 다음 머리가 꼬리랑 겹치면 끝나면 안됨 꼬리가 하나 줄어들 것이기 때문에 ..
    if (nextC === tailC && nextR === tailR) {
      appleArray[tailC][tailR] = 0;
      [tailC, tailR] = snake.shift();
    }

    if (nextC < 0 || nextC >= size || nextR < 0 || nextR >= size || appleArray[nextC][nextR] === 2) {
      console.log(count + 1);
      return;
    }
    // TODO: 뱀 꼬리 위치 당겨오는 작업 필요!!!!
    if (appleArray[nextC][nextR] === 0) {
      appleArray[nextC][nextR] = 2;
      appleArray[tailC][tailR] = 0;
      [tailC, tailR] = snake.shift();
    }
    if (appleArray[nextC][nextR] === 1) {
      appleArray[nextC][nextR] = 2;
    }

    count++;
    snake.push([nextC, nextR]);
    queue.enqueue([nextC, nextR, tailC, tailR, dir]);
  }
}
