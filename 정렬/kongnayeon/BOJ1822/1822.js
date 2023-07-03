const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);

let A = new Set(input[1].split(' ').map((el) => Number(el)));

let B = input[2].split(' ').map((el) => Number(el));

let count = 0;
let arr = [];

A.forEach((element) => {
    if (!B.includes(element)) {
        count++;
        arr.push(element);
    }
});

console.log(count);
console.log(arr.join(' '));
