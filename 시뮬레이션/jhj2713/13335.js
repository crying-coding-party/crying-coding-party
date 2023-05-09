const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, w, l] = input[0].split(" ").map(Number);
const aArr = input[1].split(" ").map(Number);

const road = new Array(n).fill(0);

let count = 0,
  curIdx = 0;
while (true) {
  let sum = 0;
  for (let i = curIdx; i < n; i++) {
    if (sum + aArr[i] > l) break;
    sum += aArr[i];
    road[i] += 1;
    if (road[i] === w) curIdx += 1;
    if (road[i] === 1) break;
  }

  count += 1;

  if (curIdx === n) break;
}

console.log(count + 1);
