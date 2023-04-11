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
  let list = input;
  let maze = [];
  let ans = -1;

  // 미로 만들기
  for (let h = 0; h < 5; h++) {
    let temp = [];
    for (let i = 0; i < 5; i++) {
      temp.push(list.shift().split(' ').map(Number));
    }
    maze.push(temp);
  }

  // 5개 순서 조합
  let mazeArray = new Array(5).fill([]);
  const visited = new Array(6).fill(false);

  back(0);

  function back(num) {
    if (num === 5) {
      // mazeArray rotate 돌리기
      for (let one = 0; one < 4; one++) {
        mazeArray[0] = rotate(mazeArray[0]);
        for (let two = 0; two < 4; two++) {
          mazeArray[1] = rotate(mazeArray[1]);
          for (let three = 0; three < 4; three++) {
            mazeArray[2] = rotate(mazeArray[2]);
            for (let four = 0; four < 4; four++) {
              mazeArray[3] = rotate(mazeArray[3]);
              for (let five = 0; five < 4; five++) {
                mazeArray[4] = rotate(mazeArray[4]);
                if (mazeArray[0][0][0] !== 1 || mazeArray[4][4][4] !== 1) {
                  continue;
                }
                // 돌리고 bfs
                let dist = bfs(mazeArray);
                if (dist === -1) {
                  continue;
                }
                if (ans === -1 || ans > dist) {
                  ans = dist;
                }
              }
            }
          }
        }
      }
    }
    for (let i = 0; i < 5; i++) {
      if (!visited[i]) {
        mazeArray[num] = maze[i];
        visited[i] = true;
        back(num + 1);
        visited[i] = false;
      }
    }
  }
  console.log(ans);
}

//회전시키는 함수
function rotate(maze) {
  const temp = Array.from(Array(5), () => Array(5).fill(0));
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      temp[j][4 - i] = maze[i][j];
    }
  }
  return temp;
}

// bfs
function bfs(maze) {
  const visited = Array.from(Array(5), () => Array.from(Array(5), () => new Array(5).fill(false)));
  const DIR = [
    [-1, 0, 0],
    [0, -1, 0],
    [0, 0, -1],
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];

  const queue = new Queue();
  queue.enqueue([0, 0, 0, 0]);
  visited[0][0][0] = true;

  while (!queue.isEmpty()) {
    const [h, c, r, dist] = queue.dequeue();

    if (h === 4 && c === 4 && r === 4) {
      //   console.log(dist);
      return dist;
    }
    for (let i = 0; i < DIR.length; i++) {
      const nextH = h + DIR[i][0];
      const nextC = c + DIR[i][1];
      const nextR = r + DIR[i][2];

      if (
        nextH < 0 ||
        nextH >= 5 ||
        nextC < 0 ||
        nextC >= 5 ||
        nextR < 0 ||
        nextR >= 5 ||
        visited[nextH][nextC][nextR] === true
      ) {
        continue;
      }
      if (maze[nextH][nextC][nextR] === 1) {
        queue.enqueue([nextH, nextC, nextR, dist + 1]);
        visited[nextH][nextC][nextR] = true;
      }
    }
  }

  return -1;
}
