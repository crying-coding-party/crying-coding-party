const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const gear = input.slice(0, 4).map((inp) => inp.split("").map(Number));
const cycle = input.slice(5).map((inp) => inp.split(" ").map(Number));

function spin(num, dir) {
  if (dir === 1) {
    const last = gear[num].pop();
    gear[num].unshift(last);
    return;
  }

  const first = gear[num].shift();
  gear[num].push(first);
}

cycle.forEach((c) => {
  const [num, direction] = c;

  const spinQueue = [[num - 1, direction]];

  let preNum = gear[num - 1][6],
    preDir = direction;
  for (let i = num - 2; i >= 0; i--) {
    const curNum = gear[i][2];
    if (preNum === curNum) break;

    const curDir = (num - 1) % 2 === i % 2 ? direction : -direction;
    spinQueue.push([i, curDir]);
    preNum = gear[i][6];
    preDir = curDir;
  }
  preNum = gear[num - 1][2];
  preDir = direction;
  for (let i = num; i < 4; i++) {
    const curNum = gear[i][6];
    if (preNum === curNum) break;

    const curDir = (num - 1) % 2 === i % 2 ? direction : -direction;
    spinQueue.push([i, curDir]);
    preNum = gear[i][2];
    preDir = curDir;
  }

  spinQueue.forEach(([num, dir]) => {
    spin(num, dir);
  });
});

let answer = 0;
gear.forEach((g, idx) => {
  if (g[0] === 1) answer += 2 ** idx;
});

console.log(answer);
