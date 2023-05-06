const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

solution(input);

function solution(input) {
  const n = Number(input[0]);
  const d = new Array(n + 1).fill(0);
  //   n에서 제곱수를 빼고 남은 d[i]를 더해주면 됨.
  //   d[i]는 n까지 최소 제곱수
  d[1] = 1;
  d[2] = 2;
  d[3] = 3;
  let square = 0;
  for (let i = 4; i <= n; i++) {
    if (Number.isInteger(Math.sqrt(i))) {
      d[i] = 1;
      square = i;
      //   console.log(i);
    } else {
      let s = Math.sqrt(square);
      let min = Infinity;
      while (s >= 1) {
        min > d[s ** 2] + d[i - s ** 2] ? (min = d[s ** 2] + d[i - s ** 2]) : (min = min);
        s = s - 1;
      }
      d[i] = min;
    }
  }
  console.log(d[n]);
}
