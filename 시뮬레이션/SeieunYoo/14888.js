const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = Number(input[0]);
const num = input[1].split(' ').map(Number);
const array = input[2].split(' ').map(Number);

let max = Number.MIN_SAFE_INTEGER;
let min = Number.MAX_SAFE_INTEGER;

function solution(calculation, k) {
  if (k === n) {
    max = Math.max(max, calculation);
    min = Math.min(min, calculation);
    return;
  }

  for (let i = 0; i < 4; i++) {
    if (!array[i]) continue;
    array[i]--;
    if (i === 0) solution(calculation + num[k], k + 1);
    else if (i === 1) solution(calculation - num[k], k + 1);
    else if (i === 2) solution(calculation * num[k], k + 1);
    else if (i === 3) {
      if (calculation < 0) {
        solution(-Math.floor(-calculation / num[k]), k + 1);
      } else {
        solution(Math.floor(calculation / num[k]), k + 1);
      }
    }
    array[i]++;
  }
}

solution(num[0], 1);

console.log(max + '\n' + min);
