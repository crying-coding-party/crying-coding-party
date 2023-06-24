let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

const n = Number(input[0]);
const cards = input[1].split(" ").map(Number);
const m = Number(input[2]);
const numbers = input[3].split(" ").map(Number);

cards.sort((a, b) => a - b);

const answers = new Array(m).fill(0);

numbers.forEach((num, idx) => {
  let left = 0,
    right = n - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (num === cards[mid]) {
      answers[idx] += 1;
      break;
    }
    if (num < cards[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
});

console.log(answers.join(" "));
