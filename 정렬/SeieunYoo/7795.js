const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input4.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');

const T = Number(input.shift());

for (let i = 0; i < T; i++) {
  const array = [];
  const [a, b] = input.shift();
  array.push(input.shift().split(' ').map(Number));
  array.push(input.shift().split(' ').map(Number));
  solution(array);
}

function solution(array) {
  const array1 = array[0];
  const array2 = array[1];
  let count = 0;

  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] > array2[j]) count++;
    }
  }

  console.log(count);
}
