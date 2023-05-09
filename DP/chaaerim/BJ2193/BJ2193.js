const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

solution(input);

function solution(input) {
  const n = Number(input[0]);
  const d = new Array(n + 1).fill(0);
  d[1] = 1;
  d[2] = 1;

  for (let i = 3; i <= n; i++) {
    d[i] = BigInt(d[i - 1]) + BigInt(d[i - 2]);
  }
  console.log(String(d[n]));
}
