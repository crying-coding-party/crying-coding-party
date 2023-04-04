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

const direction = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

//input
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input
  .shift()
  .split(" ")
  .map((v) => Number(v));
if (N === 1 && M === 1) {
  console.log(1);
  return;
}
const graph = input.map((row) => Array.from(row).map((cell) => Number(cell)));
let visited = Array.from(Array(N), () =>
  Array.from(Array(M), () => Array(2).fill(0))
);

const bfs = () => {
  const queue = new Queue();
  queue.enqueue([0, 0, 0]);
  visited[0][0][0] = 1;

  while (!queue.isEmpty()) {
    const [y, x, flag] = queue.dequeue();
    if (y === N - 1 && x === M - 1) {
      console.log(visited[y][x][flag]);
      process.exit();
    }
    for (let i = 0; i < 4; i++) {
      const newY = y + direction[i][0];
      const newX = x + direction[i][1];

      if (newY >= 0 && newY < N && newX >= 0 && newX < M) {
        //길일때
        if (graph[newY][newX] == 0 && visited[newY][newX][flag] == 0) {
          visited[newY][newX][flag] = visited[y][x][flag] + 1;
          queue.enqueue([newY, newX, flag]);
        } else {
          //벽일때
          if (flag == 0 && visited[newY][newX][flag] == 0) {
            visited[newY][newX][1] = visited[y][x][0] + 1;
            queue.enqueue([newY, newX, 1]);
          } else {
            continue;
          }
        }
      }
    }
  }
};

bfs();

if (visited[N - 1][M - 1][0] == 0 && visited[N - 1][M - 1][1] == 0) {
  console.log(-1);
}
