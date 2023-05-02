const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const S = input.map((v) => v.split(" ").map(Number));
let team = [];
let min = Infinity;

const calculatAnswer = () => {
  const start = team;
  const link = Array.from({ length: N }, (v, i) => i).filter(
    (v) => !start.includes(v)
  );
  const startPoint = calculatePoint(start);
  const linkPoint = calculatePoint(link);

  return Math.abs(startPoint - linkPoint);
};

const calculatePoint = (team) => {
  const num = team.length;
  let sum = 0;
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      sum += S[team[i]][team[j]];
    }
  }
  return sum;
};

const dfs = (cur) => {
  if (team.length === N / 2) {
    min = Math.min(min, calculatAnswer());
    if (min === 0) {
      console.log(0);
      process.exit();
    }
  } else {
    for (let i = cur; i < N; i++) {
      if (!team.includes(i)) {
        team.push(i);
        dfs(i);
        team.pop(i);
      }
    }
  }
};

dfs(0);
console.log(min);
