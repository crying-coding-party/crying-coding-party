const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

solution(input);

function solution([n, ...list]) {
  for (let i = 0; i < Number(n); i++) {
    let temp = [];
    for (let j = 0; j < 3; j++) {
      temp.push(list.shift());
    }
    console.log(sortSet(temp));
  }
}

function sortSet(temp) {
  let ans = 0;
  const [n, m] = temp.shift().split(' ').map(Number);
  const a = temp.shift().split(' ').map(Number);
  const b = temp.shift().split(' ').map(Number);

  a.sort((a, b) => b - a);
  b.sort((a, b) => a - b);
  for (let i = 0; i < a.length; i++) {
    if (a[i] <= b[0]) {
      continue;
    }
    for (let j = 0; j < b.length; j++) {
      if (a[i] > b[j]) {
        ans++;
      } else {
        continue;
      }
    }
  }
  // console.log(n, m, a, b);

  return ans;
}
