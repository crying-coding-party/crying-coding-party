const fs = require("fs");
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [N, ...input] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(/[ \n]+/);
let reverseArray = [];

input.forEach((item) =>
  reverseArray.push(parseInt(item.split('').reverse().join('')))
);

reverseArray.sort(function (a, b) {
  return a - b;
});

reverseArray.map((item) => console.log(item));
