const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input4.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const array = input.slice(0, 4).map((row) => row.split('').map(Number));
const count = Number(input[4]);
const order = input.slice(5).map((row) => row.split(' ').map(Number));

function rotate(num, direction) {
  const index = num - 1;
  if (direction === 1) {
    // 시계방향 회전
    const temp = array[index].pop();
    array[index].unshift(temp);
  } else {
    // 반시계방향 회전
    const temp = array[index].shift();
    array[index].push(temp);
  }
}

function isRotate(num, direction, visited) {
  let index = num - 1;
  visited[index] = true;

  if (
    num !== 1 &&
    !visited[index - 1] &&
    array[index - 1][2] !== array[index][6]
  ) {
    isRotate(num - 1, -direction, visited);
  }

  if (num !== 4 && !visited[num] && array[index][2] !== array[num][6]) {
    isRotate(num + 1, -direction, visited);
  }

  rotate(num, direction);
}

for (let i = 0; i < count; i++) {
  const [x, y] = order[i];
  const visited = Array(4).fill(false);
  isRotate(x, y, visited);
}

let sum = 0;
for (let i = 0; i < 4; i++) {
  if (array[i][0] === 1) {
    sum += Math.pow(2, i);
  }
}

console.log(sum);
