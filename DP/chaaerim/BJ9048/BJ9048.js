const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

solution(input);

function solution([n, ...list]) {
  const t = Number(n);
  for (let i = 0; i < t; i++) {
    const arr = [];
    const n = list.shift();
    const coins = list.shift();
    const money = list.shift();
    arr.push(n, coins, money);
    dp(arr);
  }
}

function dp(arr) {
  const num = Number(arr[0]);
  const coins = arr[1].split(' ').map(Number);
  const money = Number(arr[2]);
  const d = new Array(money + 1).fill(0);
  // d[i] : i원까지 만드는 모든 방법의 수
  d[0] = 1;

  for (const c of coins) {
    for (let i = c; i <= money; i++) {
      d[i] += d[i - c];
    }
  }
  console.log(d[money]);
}
