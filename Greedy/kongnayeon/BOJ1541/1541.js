const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const expression = input.shift();
let arr = expression.split('-');

arr.map((el, index) => {
    arr[index] = calcSum(arr[index]);
});

function calcSum(string) {
    let str = string.split('+').map(Number);
    return str.reduce((a, b) => a + b);
}

console.log(arr.reduce((a, b) => a - b));

// -를 기준으로 분리
// 분리된 것들 다 계산해서 더해 주기...
// 빼기~...
