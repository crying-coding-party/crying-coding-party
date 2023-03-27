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

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [M, N, H] = input
  .shift()
  .split(" ")
  .map((v) => Number(v));

const direction = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];

//3차원 그래프 초기화
const temp = input.map((row) => row.split(" ").map((v) => Number(v)));
const graph = [];
const queue = new Queue();

for (let i = 0; i < H; i++) {
  const row = [];
  for (let j = 0; j < N; j++) {
    row.push(temp[i * N + j]);

    // 익은 토마토의 좌표
    for (let k = 0; k < M; k++) {
      if (temp[i * N + j][k] == 1) {
        queue.enqueue([i, j, k]);
      }
    }
  }
  graph.push(row);
}

const bfs = () => {
  while (!queue.isEmpty()) {
    const current = queue.dequeue();

    direction
      .filter((dir, i) => {
        const [newZ, newY, newX] = [
          current[0] + dir[0],
          current[1] + dir[1],
          current[2] + dir[2],
        ];
        if (
          newZ < 0 ||
          newZ >= H ||
          newY < 0 ||
          newY >= N ||
          newX < 0 ||
          newX >= M
        ) {
          return false;
        }
        if (graph[newZ][newY][newX] != 0) {
          return false;
        }
        return true;
      })
      .map((dir) => {
        const [newZ, newY, newX] = [
          current[0] + dir[0],
          current[1] + dir[1],
          current[2] + dir[2],
        ];
        //queue.push([current[0], current[1], current[2]]);
        queue.enqueue([newZ, newY, newX]);
        graph[newZ][newY][newX] = graph[current[0]][current[1]][current[2]] + 1;
      });
  }
};

bfs();

let maxValue = 0;

graph.forEach((floor) =>
  floor.forEach((row) =>
    row.forEach((cell) => {
      if (cell == 0) {
        console.log("-1");
        process.exit();
      }
      maxValue = Math.max(maxValue, cell);
    })
  )
);

console.log(maxValue - 1);
