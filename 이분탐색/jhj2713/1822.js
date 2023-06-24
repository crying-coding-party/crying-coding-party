let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

const a = input[1].split(" ").map(Number);
const b = input[2].split(" ").map(Number);

a.sort((a, b) => a - b);
b.sort((a, b) => a - b);

const containArr = new Array(a.length).fill(0);

a.forEach((num, idx) => {
  let left = 0,
    right = b.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (num === b[mid]) {
      containArr[idx] += 1;
      break;
    }
    if (num < b[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
});

const answers = a.filter((num, idx) => containArr[idx] === 0);
console.log(answers.length);
console.log(answers.length !== 0 ? answers.join(" ") : "");
