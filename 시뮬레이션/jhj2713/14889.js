const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = Number(input[0]);
const S = input.slice(1).map((inp) => inp.split(" ").map(Number));
const visited = new Array(n).fill(false);

let diff = Infinity;

function track(idx, count) {
  if (count === n / 2) {
    let scoreA = 0,
      scoreB = 0;

    const aIdx = [],
      bIdx = [];
    visited.forEach((v1, idx) => {
      if (v1) aIdx.push(idx);
      else bIdx.push(idx);
    });

    aIdx.forEach((i) => {
      aIdx.forEach((j) => {
        scoreA += S[i][j];
      });
    });

    bIdx.forEach((i) => {
      bIdx.forEach((j) => {
        scoreB += S[i][j];
      });
    });

    if (diff > Math.abs(scoreA - scoreB)) diff = Math.abs(scoreA - scoreB);

    return;
  }

  for (let i = idx; i < n; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    track(i + 1, count + 1);
    visited[i] = false;
  }
}

visited[0] = true;
track(1, 1);

console.log(diff);
