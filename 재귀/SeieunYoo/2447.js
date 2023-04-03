const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input5.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [num] = input.shift().split(' ').map(Number);
let star = Array.from(Array(num), () => new Array(num).fill(' '));

function solution(x, y, size) {
  if (size === 1) {
    star[x][y] = '*';
    return;
  }

  const m = size / 3;
  let count = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      count++;
      if (count !== 5) {
        solution(x + i * m, y + j * m, m);
      }
    }
  }
}

solution(0, 0, num);
console.log(star.map((ans) => ans.join('')).join('\n'));
