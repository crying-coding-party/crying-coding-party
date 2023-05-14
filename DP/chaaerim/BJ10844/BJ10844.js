const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

solution(input);

function solution(input) {
  const n = Number(input[0]);
  // d[i][j] 숫자 길이 별 각 자릿수에 올 수 있는 숫자의 개수
  const d = Array.from(Array(n + 1), () => new Array(10).fill(0));

  for (let i = 1; i <= 9; i++) {
    d[1][i] = 1;
  }

  for (let i = 2; i <= n; i++) {
    d[i][0] = d[i - 1][1];
    for (let j = 1; j <= 9; j++) {
      d[i][j] = (d[i - 1][j - 1] + d[i - 1][j + 1]) % 1000000000;
    }
    d[i][9] = d[i - 1][8] % 1000000000;
  }
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += d[n][i];
  }
  // console.log(d);
  console.log(sum % 1000000000);
}
