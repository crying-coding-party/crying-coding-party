const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, P, Q] = input.shift().split(" ");
/* A0 = 1
Ai = A⌊i/P⌋ + A⌊i/Q⌋ (i ≥ 1) */

/* let arr = Array.from({ length: N + 1 }, () => 0);
arr[0] = 1;
arr[1] = 2; */
const map = new Map();

const calc = (i) => {
  if (i == 0) return 1;

  if (map.has(i)) {
    return map.get(i);
  }

  const c = calc(Math.floor(i / P)) + calc(Math.floor(i / Q));
  map.set(i, c);
  return c;
};

console.log(calc(N));
