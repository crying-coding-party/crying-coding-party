const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

solution(input);

function solution([N, A, B]) {
  const [n, m] = N.split(' ').map(Number);
  const a = A.split(' ').map(Number);

  const b = B.split(' ')
    .map(Number)
    .sort((i, j) => i - j);
  const ans = [];
  for (let i = 0; i < a.length; i++) {
    const result = binarySerarch(b, a[i]);
    if (result) {
      ans.push(result);
    }
  }
  if (ans.length > 0) {
    console.log(ans.length);
    console.log(ans.sort((i, j) => i - j).join(' '));
  } else {
    console.log(0);
  }
}

function binarySerarch(arr, find) {
  let left = 0;
  let right = arr.length - 1;
  let mid = Math.floor((left + right) / 2);

  while (left <= right) {
    if (arr[mid] === find) {
      return;
    }
    if (arr[mid] < find) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }

    mid = Math.floor((left + right) / 2);
  }
  return find;
}
