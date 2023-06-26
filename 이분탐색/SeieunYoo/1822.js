const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input2.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input.shift().split(' ').map(Number);
const array = input.shift().split(' ').map(Number);
const array2 = new Set(input.shift().split(' ').map(Number));

function solution(array, array2) {
  let answer = [];
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (!array2.has(array[i])) {
      count++;
      answer.push(array[i]);
    }
  }

  console.log(count);
  answer.length && console.log(answer.sort((a, b) => a - b).join(' '));
}

solution(array, array2);
