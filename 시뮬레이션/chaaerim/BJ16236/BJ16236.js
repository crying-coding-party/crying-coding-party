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
const DC = [1, -1, 0, 0];
const DR = [0, 0, 1, -1];

// how to solve? bfs 여러번 돌리기
// 먹을 수 있는 물고기를 찾을 때까지 bfs 돌려
// 같은 depth에서 여러개면 비교
// 해당 위치로 상어 옮기고 다시 bfs

solution(input);
function solution([n, ...list]) {
  const size = Number(n);
  const numMap = list.map(i => i.split(' ').map(Number));
  const ans = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (numMap[i][j] === 9) {
        numMap[i][j] = 0;
        bfs(i, j, 0, 2, 0, size, numMap, ans);
      }
    }
  }
  console.log(Math.max(...ans));
}

function bfs(i, j, dis, sharkSize, eatenFish, size, numMap, ans) {
  const queue = new Queue();
  const visited = Array.from(Array(size), () => Array(size).fill(false));
  visited[i][j] = true;
  queue.enqueue([i, j, dis, sharkSize, eatenFish]);

  const q = new Queue();
  ans.push(dis);
  //   console.log(dis, 'disdisidsidis');

  while (!queue.isEmpty()) {
    const [col, row, dis, shark, fishNum] = queue.dequeue();
    for (let i = 0; i < 4; i++) {
      const nextC = col + DC[i];
      const nextR = row + DR[i];
      let nextShark = shark;
      let nextEatenFish = fishNum;
      let nextDis = dis + 1;

      //먹은 물고기 수랑 shark 크기가 같으면 shark 크기 + 1
      if (shark === eatenFish) {
        nextShark += 1;
        nextEatenFish = 0;
      }

      if (
        nextC < 0 ||
        nextC >= size ||
        nextR < 0 ||
        nextR >= size ||
        visited[nextC][nextR] === true ||
        numMap[nextC][nextR] > nextShark
      ) {
        continue;
      }

      if (numMap[nextC][nextR] <= nextShark) {
        // 다음이 현재 상어보다 작고 0이 아니라면 잡아먹을 수 있음.
        if (numMap[nextC][nextR] < nextShark && numMap[nextC][nextR] !== 0) {
          q.enqueue([nextC, nextR, nextDis, nextShark, nextEatenFish]);
        }
        visited[nextC][nextR] = true;
        queue.enqueue([nextC, nextR, nextDis, nextShark, nextEatenFish]);
      }
    }
  }

  //   잡아먹을 수 있는 물고기가 여러개면 거리, 위, 왼 순서로 잡아먹기
  if (q.queue.length > 1) {
    q.queue.sort((a, b) => {
      if (a[2] === b[2]) {
        if (a[0] === b[0]) {
          return a[1] - b[1];
        }
        return a[0] - b[0];
      } else {
        return a[2] - b[2];
      }
    });
    const [col, row, dis, shark, fish] = q.queue[0];
    numMap[col][row] = 0;
    bfs(col, row, dis, shark, fish + 1, size, numMap, ans);
  } else if (q.queue.length !== 0) {
    const [col, row, dis, shark, fish] = q.queue[0];
    numMap[col][row] = 0;
    bfs(col, row, dis, shark, fish + 1, size, numMap, ans);
  } else {
    return;
  }

  return;
}
