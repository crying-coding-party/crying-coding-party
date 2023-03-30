const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

class Node {
  constructor(y, x, wall) {
    this.x = x;
    this.y = y;
    this.wall = wall;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(value) {
    const node = new Node(value[0], value[1], value[2]);
    if (this.size === 0) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
    this.size++;
  }

  shift() {
    let temp = this.head;
    if (this.size === 0) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }
    this.size--;
    return temp;
  }
}

const [n, m] = input[0].split(" ").map(Number);
const map = input.slice(1).map((inp) => inp.split("").map(Number));

const visited = Array.from(Array(n), () => Array.from(Array(m), () => new Array(2).fill(false)));
const route = Array.from(Array(n), () => new Array(m).fill(0));
route[0][0] = 1;

const coordinate = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];
const queue = new Queue();
queue.push([0, 0, 0]);
visited[0][0][0] = true;
let answer = -1;

while (queue.size !== 0) {
  const { y, x, wall } = queue.shift();

  if (y === n - 1 && x === m - 1) {
    answer = route[n - 1][m - 1];
    break;
  }

  coordinate.forEach((coor) => {
    const newY = y + coor[0];
    const newX = x + coor[1];

    if (newY < 0 || newY >= n || newX < 0 || newX >= m) return;
    if (visited[newY][newX][0] && visited[newY][newX][1]) return;

    if (map[newY][newX] === 1 && wall === 0 && !visited[newY][newX][1]) {
      route[newY][newX] = route[y][x] + 1;
      visited[newY][newX][1] = true;
      queue.push([newY, newX, wall + 1]);
    }
    if (map[newY][newX] === 0 && !visited[newY][newX][wall]) {
      route[newY][newX] = route[y][x] + 1;
      visited[newY][newX][wall] = true;
      queue.push([newY, newX, wall]);
    }
  });
}

console.log(answer);
