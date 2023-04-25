const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = Number(input[0]);
const A = input[1].split(" ").map(Number);
const operator = input[2].split(" ").map(Number);
let min = Infinity,
  max = -Infinity;

function track(count, sum, operator) {
  if (count === n - 1) {
    if (min > sum) min = sum;
    if (max < sum) max = sum;
    return;
  }

  operator.forEach((op, idx) => {
    if (op === 0) return;

    const newOperator = [...operator];
    newOperator[idx] = op - 1;

    if (idx === 0) track(count + 1, sum + A[count + 1], newOperator);
    else if (idx === 1) track(count + 1, sum - A[count + 1], newOperator);
    else if (idx === 2) track(count + 1, sum * A[count + 1], newOperator);
    else if (idx === 3) track(count + 1, sum < 0 ? -Math.floor(-sum / A[count + 1]) : Math.floor(sum / A[count + 1]), newOperator);
  });
}

track(0, A[0], operator);

console.log(`${max}\n${min}`);
