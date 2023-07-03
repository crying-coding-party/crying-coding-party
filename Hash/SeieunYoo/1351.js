const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input2.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, p, q] = input.shift().split(' ').map(Number);
// let dp = new Array(n + 1).fill(0);
let dp = {};
dp[0] = 1;

// 배열로 풀이하면 런타임 에러남 -> 딕셔너리로 풀이하면 에러 안남
// @link https://velog.io/@jypapapaa/%EB%B0%B1%EC%A4%80-1351-%EB%AC%B4%ED%95%9C-%EC%88%98%EC%97%B4-HashDFS-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8

function solution(n) {
  if (dp[n]) return dp[n];
  return (dp[n] = solution(Math.floor(n / p)) + solution(Math.floor(n / q)));
}

console.log(solution(n));
