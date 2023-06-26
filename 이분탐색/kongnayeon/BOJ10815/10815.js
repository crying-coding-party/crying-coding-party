const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input.shift());
let card = new Set(
    input
        .shift()
        .split(' ')
        .map((el) => Number(el))
);
const M = Number(input.shift());
let target = input
    .shift()
    .split(' ')
    .map((el) => Number(el));

let arr = [];

target.map((element) => (card.has(element) ? arr.push(1) : arr.push(0)));

console.log(arr.join(' '));
