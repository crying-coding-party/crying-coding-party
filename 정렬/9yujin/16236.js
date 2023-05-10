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

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const graph = input.map((v) => v.split(" ").map(Number));
let shark = 2;
let total = 0;

/*
 * 상어가 한번 움직일때마다 매번 bfs 돌리는거야
 */
const bfs = (x, y) => {
  let visited = Array.from(Array(N), () => Array(N).fill(0));
  let distance = Array.from(Array(N), () => Array(N).fill(0));

  // 먹을수있는 애들 후보
  let dinner = [];
  const queue = new Queue();
  queue.enqueue([y, x]);
  visited[y][x] = 1;

  while (!queue.isEmpty()) {
    const current = queue.dequeue();
    //console.log(current);
    /* distance.forEach((v) => console.log(v));
    console.log("------"); */

    for (let i = 0; i < 4; i++) {
      ny = current[0] + dy[i];
      nx = current[1] + dx[i];

      if (nx >= 0 && nx < N && ny >= 0 && ny < N && visited[ny][nx] === 0) {
        // 갈 수 있으면
        if (graph[ny][nx] <= shark) {
          queue.enqueue([ny, nx]);
          visited[ny][nx] = 1;

          distance[ny][nx] = distance[current[0]][current[1]] + 1;

          if (graph[ny][nx] !== shark && graph[ny][nx] !== 0) {
            dinner.push([ny, nx, distance[ny][nx]]);
          }
        }
      }
    }
  }

  dinner.sort((a, b) => (a[1] < b[1] ? 1 : -1));
  dinner.sort((a, b) => (a[0] > b[0] ? 1 : -1));

  if (dinner.length > 0) {
    /*
     * 첫번째꺼 잡아먹고, 원래 상어있던 자리 0으로 바꿔주기
     */
    const target = dinner[0];
    total += target[2];
    graph[y][x] = 0;
    graph[target[0]][target[1]] = 9;

    /**
     * 특정 개수만큼 먹으면 자라나게끔!!
     */
  } else {
    console.log(total);
    process.exit(0);
  }
};

let init;
graph.forEach((v, i) => v.forEach((m, j) => m === 9 && (init = [j, i])));

while (1) {
  bfs(init[0], init[1]);
}
