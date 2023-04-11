const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }
  push(value) {
    this.queue[this.rear++] = value;
  }
  shift() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front += 1;
    return value;
  }
  isEmpty() {
    return this.rear === this.front;
  }
}

const maze = [];
for (let i = 0; i < 5; i++) {
  const tmpMaze = [];
  for (let j = 0; j < 5; j++) {
    tmpMaze.push(input[i * 5 + j].split(" ").map(Number));
  }
  maze.push(tmpMaze);
}

function bfs(newMaze) {
  const visited = Array.from(Array(5), () => Array.from(Array(5), () => new Array(5).fill(false)));
  const coordinate = [
    [-1, 0, 0],
    [0, -1, 0],
    [0, 0, -1],
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];

  const queue = new Queue();
  queue.push([0, 0, 0, 0]);
  visited[0][0][0] = true;

  while (!queue.isEmpty()) {
    const [x, y, z, val] = queue.shift();

    if (x === 4 && y === 4 && z === 4) {
      return val;
    }

    coordinate.forEach((coor) => {
      const newX = x + coor[0];
      const newY = y + coor[1];
      const newZ = z + coor[2];

      if (newX >= 0 && newX < 5 && newY >= 0 && newY < 5 && newZ >= 0 && newZ < 5 && newMaze[newX][newY][newZ] === 1 && !visited[newX][newY][newZ]) {
        queue.push([newX, newY, newZ, val + 1]);
        visited[newX][newY][newZ] = true;
      }
    });
  }

  return -1;
}

function getOrder(result, order, visited) {
  if (order.length === 5) {
    result.push([...order]);
    return;
  }

  for (let i = 0; i < 5; i++) {
    if (visited[i]) continue;

    order.push(i);
    visited[i] = true;

    getOrder(result, order, visited);

    order.pop();
    visited[i] = false;
  }
}

function getSpinOrder(result, maze) {
  if (maze.length === 5) {
    result.push([...maze]);
    return;
  }

  for (let i = 0; i < 4; i++) {
    maze.push(i);
    getSpinOrder(result, maze);
    maze.pop();
  }
}

function spin(maze, dir) {
  if (dir === 0) {
    return maze;
  }
  if (dir === 1) {
    // 시계방향 90도
    const result = [];
    for (let i = 0; i < 5; i++) {
      result.push([]);
      for (let j = 0; j < 5; j++) {
        result[i].push(maze[4 - j][i]);
      }
    }
    return result;
  }
  if (dir === 2) {
    // 시계방향 180도
    const result = [];
    for (let i = 0; i < 5; i++) {
      result.push([]);
      for (let j = 0; j < 5; j++) {
        result[i].push(maze[4 - i][4 - j]);
      }
    }
    return result;
  }
  if (dir === 3) {
    // 시계방향 270도
    const result = [];
    for (let i = 0; i < 5; i++) {
      result.push([]);
      for (let j = 0; j < 5; j++) {
        result[i].push(maze[j][4 - i]);
      }
    }
    return result;
  }
}

const orderArray = [];
const visited = new Array(5).fill(false);
getOrder(orderArray, [], visited);

const spinArray = [];
getSpinOrder(spinArray, []);

let min = Infinity;
orderArray.forEach((order) => {
  const newMaze = order.map((o) => maze[o]);
  spinArray.forEach((s) => {
    const spinedMaze = [];
    for (let i = 0; i < 5; i++) {
      const tmpMaze = spin(newMaze[i], s[i]);
      spinedMaze.push(tmpMaze);
    }
    if (spinedMaze[0][0][0] !== 1 || spinedMaze[4][4][4] !== 1) return;

    const result = bfs(spinedMaze);
    if (result !== -1 && min > result) min = result;
  });
});

console.log(min === Infinity ? -1 : min);
