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

const { BADFLAGS } = require("dns");
//input
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");
const [N, M] = input
  .shift()
  .split(" ")
  .map((v) => Number(v));

const graph = input.map((row) => Array.from(row).map((cell) => Number(cell)));
let visited = Array.from(Array(N), () => Array(M).fill([0, 0]));

const bfs = () => {
  const queue = new Queue();
  queue.enqueue([0, 0, 0]);
  visited[0][0][0] = 1;

  while (!queue.isEmpty()) {
    console.log(queue);
    const current = queue.dequeue();

    direction
      .filter((dir, i) => {
        const [newY, newX, flag] = [
          current[0] + dir[0],
          current[1] + dir[1],
          current[2],
        ];
        if (newY < 0 || newY >= N || newX < 0 || newX >= M) {
          return false;
        }
        if (visited[newY][newX][0] != 0 && visited[newY][newX][1] != 0) {
          return false;
        }
        return true;
      })
      .forEach((dir) => {
        const [newY, newX, flag] = [
          current[0] + dir[0],
          current[1] + dir[1],
          current[2],
        ];

        if (graph[newY][newX] == 0) {
          visited[newY][newX][flag] = visited[current[0]][current[1]][flag] + 1;
          queue.enqueue([newY, newX, flag]);
        } else if (graph[newY][newX] == 1 && flag == 0) {
          visited[newY][newX][1] = visited[current[0]][current[1]][0] + 1;
          queue.enqueue([newY, newX, 1]);
        }
      });
  }
};

bfs();
console.log(visited);
