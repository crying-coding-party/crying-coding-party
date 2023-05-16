const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

solution(input);

function solution([N, ...list]) {
  const n = Number(N);
  const numList = list.map(i => i.split(' ').map(Number));
  // 처음에 일 수 다 저장 -> 시간초과 남 ^^ ...
  // d[i] i일까지 상담했을 때 받을 수 있는 최대 금액

  const d = new Array(n + 1).fill(0);
  let max = 0;

  for (let i = 0; i < n; i++) {
    max = Math.max(d[i], max);
    if (i + numList[i][0] <= n) {
      d[i + numList[i][0]] = Math.max(d[i + numList[i][0]], max + numList[i][1]);
    }
  }
  // console.log(d);
  console.log(Math.max(...d));
}
