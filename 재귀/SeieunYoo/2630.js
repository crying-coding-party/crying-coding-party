const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input4.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [num] = input.shift().split(' ').map(Number);
const paper = input.map((row) => row.split(' ').map(Number));
let answer = [0, 0]; //0,1 에 대한 개수를 담는 배열(하얀색,파란색);

function checkSameNum(x, y, n) {
  for (let i = x; i < x + n; i++) {
    for (let j = y; j < y + n; j++) {
      if (paper[x][y] !== paper[i][j]) {
        return false;
      }
    }
  }
  return true;
}

function solution(x, y, count) {
  if (count === 1) {
    answer[paper[x][y]] += 1;
    return;
  }
  if (checkSameNum(x, y, count)) {
    answer[paper[x][y]] += 1;
    return;
  }

  let n = count / 2;
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      solution(x + i * n, y + j * n, n);
    }
  }
}

solution(0, 0, num);
console.log(answer.join('\n'));
