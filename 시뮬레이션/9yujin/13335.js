const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [n, w, L] = input.shift().split(" ").map(Number);
const trucks = input[0].split(" ").map(Number);
let ans = 0;
let queue = [];

const sum = (queue) =>
  queue.map((v) => v.truck).reduce((acc, cur) => acc + cur, 0);

while (true) {
  if (trucks.length == 0 && queue.length == 0) break;

  ans += 1;

  //다리 건너가기
  if (queue.length > 0) {
    queue.forEach((truck) => (truck.count += 1));
  }
  if (queue[0]?.count === w) queue.shift();

  //다리에 올라가기
  if (
    trucks.length > 0 &&
    queue.length < w &&
    sum(queue) + (trucks?.[0] || 0) <= L
  ) {
    queue.push({ truck: trucks.shift(), count: 0 });
  }
}

console.log(ans);
