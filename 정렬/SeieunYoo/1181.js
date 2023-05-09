const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input2.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input.shift());

const array = input.map((item) =>
  item.includes('\r') ? item.slice(0, item.length - 1) : item
);

array.sort();

array.sort(function (a, b) {
  return a.length - b.length;
});

const setArray = new Set(array);

Array(...setArray).map((item)=> console.log(item));
