const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

solution(input);

function solution() {
  const [a, b, c, d] = input;

  const m = Number(a);
  const has = b
    .split(' ')
    .map(Number)
    .sort((i, j) => i - j);

  const n = Number(c);
  const numList = d.split(' ').map(Number);

  const ans = [];
  for (let i = 0; i < n; i++) {
    ans.push(binarySerarch(has, numList[i]));
  }
  console.log(ans.join(' '));
}

function binarySerarch(arr, find) {
  let left = 0;
  let right = arr.length - 1;
  let mid = Math.floor((left + right) / 2);

  while (left <= right) {
    if (arr[mid] === find) {
      return 1;
    }
    if (arr[mid] < find) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
    mid = Math.floor((left + right) / 2);
  }

  return 0;
}
