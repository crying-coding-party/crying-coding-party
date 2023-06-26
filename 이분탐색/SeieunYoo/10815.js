const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = input.shift();
const array = new Set(input.shift().split(' ').map(Number));
const m = input.shift();
const array2 = input.shift().split(' ').map(Number);

function isInclude(arrayNum) {
  if (array.has(arrayNum)) {
    return 1;
  } else {
    return 0;
  }
}

function solution(array2) {
  let answer = [];
  for (let i = 0; i < array2.length; i++) {
    answer.push(isInclude(array2[i]));
  }

  console.log(answer.join(' '));
}

solution(array2);
