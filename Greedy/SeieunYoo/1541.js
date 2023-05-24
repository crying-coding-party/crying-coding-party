const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');

// 최솟값이 되려면 - 기준으로 나머지 것들끼리 더한 후에 빼줘야함.
const number = input[0].split("-").map((item) => item.includes("+") ? item.split("+").map(Number).reduce(((acc, num) => acc + parseInt(num))) : Number(item));

const result = number.reduce(((acc, num) => acc - parseInt(num)));

console.log(result);