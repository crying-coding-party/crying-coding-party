const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

solution(input);

function solution([n, ...list]) {
  const numList = list.map(i => i.split(' ').map(Number));
  const size = Number(n);

  // d[i][n] : i번째 줄의 n인덱스 중 가장 최댓값
  // 제발 케이스 범위 좀 보고 풀어라 .... ^^
  let d = [];
  for (let i = 1; i <= size; i++) {
    let temp = [];
    for (let j = 0; j < i; j++) {
      temp.push(0);
    }
    d.push(temp);
  }
  //   console.log(d);
  d[0][0] = numList[0][0];

  for (let i = 1; i < size; i++) {
    for (let j = 0; j <= i; j++) {
      if (j !== 0 && j < i) {
        d[i][j] = Math.max(d[i - 1][j - 1] + numList[i][j], d[i - 1][j] + numList[i][j]);
      }
      if (j == 0) {
        d[i][j] = d[i - 1][0] + numList[i][j];
      }
      if (j == i) {
        d[i][j] = d[i - 1][j - 1] + numList[i][j];
      }
    }
  }
  //   console.log(d);
  console.log(Math.max(...d[size - 1]));
}
