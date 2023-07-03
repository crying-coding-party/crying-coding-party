const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const testCase = input.shift();
for (let i = 0; i < testCase; i++) {
  const N = input.shift();
  const map = new Map();
  for (let j = 0; j < N; j++) {
    const [, key] = input.shift().split(" ");

    const count = map.get(key);
    count ? map.set(key, count + 1) : map.set(key, 1);
  }
  const counts = Object.entries(Object.fromEntries(map)).map((v) => v[1]);
  console.log(counts.reduce((acc, cur) => acc * (cur + 1), 1) - 1);
}
