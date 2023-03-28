const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

solution(input);

function solution([input]) {
  const [a, b, c] = input.split(' ').map(Number);
  const A = BigInt(a);
  const C = BigInt(c);
  const answer = mult(A, b, C);
  function mult(a, b, c) {
    if (b === 1) return a % c;
    let val = mult(a, Math.floor(b / 2), c);
    val = (val * val) % c;
    if (b % 2 === 0) {
      return val;
    } else {
      return (val * (a % c)) % c;
    }
  }
  console.log(answer.toString());
}
