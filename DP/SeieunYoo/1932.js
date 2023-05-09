const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input4.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = Number(input.shift());
const array = input.map((row) => row.split(' ').map(Number));

const dp = new Array(n).fill(0).map((_, i) => new Array(i + 1).fill(0));

let answer = 0;
dp[0][0] = array[0][0];

for (let i = 0; i < n - 1; i++) {
  //dp 배열 에는 대각선 합한 값을 넣어줌 이때 왼쪽에서 오는 거랑 오른쪽에서 오는 게 겹치기 때문에 max 값을 저장
  for (let j = 0; j < dp[i].length; j++) {
    dp[i + 1][j] = Math.max(dp[i + 1][j], array[i + 1][j] + dp[i][j]);
    dp[i + 1][j + 1] = Math.max(
      dp[i + 1][j + 1],
      array[i + 1][j + 1] + dp[i][j]
    );

    answer = Math.max(dp[i + 1][j], dp[i + 1][j + 1]);
  }
}

console.log(Math.max(...dp[n - 1]));
