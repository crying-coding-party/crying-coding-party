const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input.shift());

for (let i = 0; i < N; i++) {
  const num = Number(input.shift());
  const array = [];

  for (let j = 0; j < num; j++) {
    const element = input
      .shift()
      .split(' ')
      .map((item) => item.replace(/\r/g, ''));
    array.push(element);
  }
  solution(array);
}

function solution(array) {
  let countArray = new Map();

  for (let i = 0; i < array.length; i++) {
    if (countArray.has(array[i][1])) {
      const num = countArray.get(array[i][1]);
      countArray.set(array[i][1], num + 1);
    } else {
      countArray.set(array[i][1], 1);
    }
  }

  const arr = Array.from(countArray.values()); // map 에서 value 만 꺼내서 배열로 만들기

  let result = 1;

  for (let i = 0; i < arr.length; i++) {
    result = result * (arr[i] + 1); // 해당 의상 경우의 수 + 1 (그 의상을 입지 않은 경우)
  }
  console.log(result - 1); // 아무것도 입지 않은 경우
}
