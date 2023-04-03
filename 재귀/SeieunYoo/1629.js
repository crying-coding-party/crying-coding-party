const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [num1, num2, num3] = input.shift().split(' ').map(BigInt);

function solution(a, b) {
  if (parseInt(b) === 0) {
    return BigInt(1);
  } else {
    const temp = solution(a, BigInt(parseInt(b / BigInt(2))));
    if (b % BigInt(2) === 0) {
      return (temp * temp) % num3;
    } else {
      return (temp * temp * a) % num3;
    }
  }
}

console.log(parseInt(solution(num1, num2)));
