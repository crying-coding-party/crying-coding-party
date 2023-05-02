const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, C] = input.shift().split(" ").map(Number);
const numbers = input[0].split(" ").map(Number);
let arr = new Map();

numbers.forEach((v) => {
  if (arr.has(v)) {
    arr.set(v, {
      count: arr.get(v).count + 1,
      time: numbers.findIndex((item) => item === v),
    });
  } else {
    arr.set(v, { count: 1, time: numbers.findIndex((item) => item === v) });
  }
});

/* numbers.forEach((v) => {
  arr[v - 1] += 1;
});

arr = arr.map((v, i) => {
  return {
    num: i + 1,
    count: v,
    time: numbers.findIndex((item) => item === i + 1),
  };
});
 */

const arrMap = [...arr];

arrMap.sort((a, b) => (a[1].time < b[1].time ? 1 : -1));
arrMap.sort((a, b) => (a[1].count < b[1].count ? 1 : -1));

let ans = [];
arrMap.forEach((v) => {
  for (let i = 0; i < v[1].count; i++) {
    ans.push(v[0]);
  }
});
console.log(ans.join(" "));
/* arr.sort((a, b) => (a.time < b.time ? 1 : -1));
arr.sort((a, b) => (a.count < b.count ? 1 : -1));

let ans = [];
arr.forEach((v) => {
  for (let i = 0; i < v.count; i++) {
    ans.push(v.num);
  }
});

console.log(ans.join(" "));
 */
