const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
// 동서남북위아래
const diceMap = [0, 0, 0, 0, 0, 0];

const DIR = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];
solution(input);

function solution(input) {
  const [col, row, x, y, k] = input.shift().split(' ').map(Number);
  const numberMap = [];
  for (let i = 0; i < col; i++) {
    numberMap.push(input.shift().split(' ').map(Number));
  }
  const dice = input.shift().split(' ').map(Number);

  const queue = [];
  let diceMap = [0, 0, 0, 0, 0, 0];

  queue.push([x, y]);
  for (const i of dice) {
    const now = queue[queue.length - 1];
    let nextC = now[0] + DIR[i - 1][0];
    let nextR = now[1] + DIR[i - 1][1];
    if (nextC < 0 || nextC >= col || nextR < 0 || nextR >= row) {
      continue;
    }
    diceMap = move(i, diceMap);
    if (numberMap[nextC][nextR] === 0) {
      numberMap[nextC][nextR] = diceMap[5];
    } else if (numberMap[nextC][nextR] !== 0) {
      diceMap[5] = numberMap[nextC][nextR];
      numberMap[nextC][nextR] = 0;
    }
    queue.push([nextC, nextR]);
    console.log(diceMap[4]);
  }
}

function move(loc, diceMap) {
  // 동서남북위아래
  const temp = [...diceMap];
  if (loc === 1) {
    temp[5] = diceMap[0];
    temp[1] = diceMap[5];
    temp[0] = diceMap[4];
    temp[4] = diceMap[1];
  }
  if (loc === 2) {
    temp[5] = diceMap[1];
    temp[1] = diceMap[4];
    temp[0] = diceMap[5];
    temp[4] = diceMap[0];
  }
  if (loc === 3) {
    temp[3] = diceMap[5];
    temp[5] = diceMap[2];
    temp[2] = diceMap[4];
    temp[4] = diceMap[3];
  }
  if (loc === 4) {
    temp[2] = diceMap[5];
    temp[5] = diceMap[3];
    temp[3] = diceMap[4];
    temp[4] = diceMap[2];
  }
  //   console.log(temp, '!!!');
  return temp;
}
