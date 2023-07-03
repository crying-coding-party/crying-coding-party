const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

solution(input);

function solution(input) {
  const [n, p, q] = input[0].split(' ').map(Number);
  const d = new Map();
  d.set(0, 1);

  // for문을 돌릴 경우 map과 array의 크기가 넘쳐버림
  // for (let i = 1; i <= n; i++) {
  //   const next = d.get(Math.floor(i / p)) + d.get(Math.floor(i / p));
  //   d.set(i, next);
  //   // d[i] = d[Math.floor(i / p)] + d[Math.floor(i / q)];
  // }

  dp(n);

  function dp(count) {
    if (d.has(count)) {
      return d.get(count);
    }
    const next = dp(Math.floor(count / p)) + dp(Math.floor(count / q));
    d.set(count, next);

    return d.get(count);
  }
  console.log(d.get(n));
}
