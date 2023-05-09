const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const DIR = [
  [0, 1],
  [-1, 0],
  [0, -1],
  [1, 0],
];
solution(input);

function solution([num, ...list]) {
  const n = Number(num);
  let dragonMap = Array.from(Array(101), () => Array(101).fill(0));

  const dragons = list.map(i => i.split(' ').map(Number));

  let answer = 0;
  //  규칙: pop할 때 1씩 더하면 됨..!!!
  while (dragons.length !== 0) {
    const stack = [];
    const [x, y, d, g] = dragons.shift();
    dragonMap[y][x] = 1;
    stack.push(d);

    for (let i = 0; i < g; i++) {
      const copyStack = [...stack];
      const temp = [];

      while (stack.length > 0) {
        const dir = stack.pop();
        const nextDir = dir % 4;
        temp.push((nextDir + 1) % 4);
      }
      stack.push(...copyStack);
      stack.push(...temp);
    }

    let nextC = y;
    let nextR = x;
    for (let i = 0; i < stack.length; i++) {
      const next = stack[i];
      nextC += DIR[next][0];
      nextR += DIR[next][1];
      dragonMap[nextC][nextR] = 1;
    }
  }

  //   4 꼭짓점이 다 1인 정사각형의 개수를 찾아라.
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      if (
        dragonMap[i][j] === 1 &&
        dragonMap[i + 1][j] === 1 &&
        dragonMap[i][j + 1] === 1 &&
        dragonMap[i + 1][j + 1] === 1
      ) {
        answer++;
      }
    }
  }
  console.log(answer);
}
