const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

class Queue {
  constructor() {
    this.queue = [];
    this.rear = 0;
    this.front = 0;
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

solution(input);
// 벽은 3개 세울 수 있고 상하좌우 인접한 곳으로 바이러스 퍼질 수 있음.
// 0은 빈칸, 1은 벽, 2는 바이러스가 있는 곳.
// how to solve?
// 3개 세운 경우의 수 백트래킹으로 구하고
// 각각의 경우에 대한 안전 영역을 구하자 ...

function solution([n, ...list]) {
  const [c, r] = n.split(' ').map(Number);
  const numMap = list.map(i => i.split(' ').map(Number));
  const answerArr = [];
  const empty = [];

  // 빈칸 좌표 구해놓기
  for (let i = 0; i < c; i++) {
    for (let j = 0; j < r; j++) {
      if (numMap[i][j] === 0) {
        empty.push([i, j]);
      }
    }
  }

  const visited = new Array(empty.length).fill(false);
  const array = Array.from(Array(3), () => new Array(2).fill(0));

  back(0, 0);
  function back(n, start) {
    if (n === 3) {
      for (let i = 0; i < array.length; i++) {
        numMap[array[i][0]][array[i][1]] = 1;
      }
      // bfs로 0 개수 세기
      bfs(numMap, c, r, answerArr);
      // 다시 원상 복구
      for (let i = 0; i < array.length; i++) {
        numMap[array[i][0]][array[i][1]] = 0;
      }
      return;
    }

    for (let i = start; i < empty.length; i++) {
      if (!visited[i]) {
        array[n] = empty[i];
        visited[i] = true;
        back(n + 1, i + 1);
        visited[i] = false;
      }
    }
  }
  console.log(Math.max(...answerArr));
}

function bfs(numMap, c, r, answerArr) {
  const queue = new Queue();
  let count = 0;
  // numMap 복사
  const visited = Array.from(Array(c), () => new Array(r).fill(false));
  const temp = Array.from(Array(c), () => new Array(r).fill(0));

  for (let i = 0; i < c; i++) {
    for (let j = 0; j < r; j++) {
      if (numMap[i][j] === 2) {
        queue.enqueue([i, j]);
        visited[i][j] = true;
      }
      temp[i][j] = numMap[i][j];
    }
  }

  const DC = [1, -1, 0, 0];
  const DR = [0, 0, 1, -1];
  while (!queue.isEmpty()) {
    const [col, row] = queue.dequeue();
    for (let i = 0; i < 4; i++) {
      const nextC = col + DC[i];
      const nextR = row + DR[i];

      if (nextC < 0 || nextC >= c || nextR < 0 || nextR >= r || visited[nextC][nextR] === true) {
        continue;
      }
      if (temp[nextC][nextR] === 0) {
        temp[nextC][nextR] = 2;
        queue.enqueue([nextC, nextR]);
        visited[nextC][nextR] = true;
      }
    }
  }
  for (let i = 0; i < c; i++) {
    for (let j = 0; j < r; j++) {
      if (temp[i][j] === 0) {
        count++;
      }
    }
  }
  answerArr.push(count);
  return;
}
