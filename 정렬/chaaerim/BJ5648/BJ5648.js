const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [n, ...input] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(/[ \n]+/);

solution(input);

function solution(input) {
  const reverseString = input.map(i => i.split('').reverse().join(''));
  const reverseNum = reverseString.map(Number);
  console.log(reverseNum.sort((a, b) => a - b).join('\n'));
  //   console.log(reverseNum);
}
