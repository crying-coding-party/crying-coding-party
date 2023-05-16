const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input6.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input.shift());
const work = input.map((row) => row.split(' ').map(Number));

let dp = new Array(N + 1).fill(0); 

for (let j = 0; j < N; j++) {
  const workDay = j + work[j][0];
  if (workDay <= N) {

    dp[workDay] = Math.max(dp[workDay], dp[j] + work[j][1]); //workday 랑 현재까지 일한 거 + 현재 날짜 보상
  }
  dp[j + 1] = Math.max(dp[j + 1], dp[j]);
}
console.log(Math.max(...dp));
