const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = Number(input[0]);
const students = input.slice(1).map((inp) => inp.split(" ").map(Number));
const seat = Array.from(Array(n), () => new Array(n).fill(0)); // 학생 자리

const coordinates = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];
const favoriteDic = {};

students.forEach((student) => {
  const [s, ...favorites] = student;
  favoriteDic[s] = favorites;
  const countArr = Array.from(Array(n), () => new Array(n).fill(-1)); // 인접한 학생이 가장 많은 자리
  let maxCount = -1;

  // 인접한 칸에 좋아하는 학생의 수 구하기
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (seat[i][j] !== 0) continue;

      let count = 0;
      coordinates.forEach((coor) => {
        const newI = i + coor[0];
        const newJ = j + coor[1];

        if (newI >= 0 && newI < n && newJ >= 0 && newJ < n && favorites.includes(seat[newI][newJ])) {
          count += 1;
        }
      });
      countArr[i][j] = count;
      maxCount = Math.max(count, maxCount);
    }
  }

  const maxIndex = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (countArr[i][j] === maxCount) {
        maxIndex.push([i, j]);
      }
    }
  }

  // 좋아하는 학생이 인접한 칸에 가장 많은 칸이 하나인 경우
  if (maxIndex.length === 1) {
    seat[maxIndex[0][0]][maxIndex[0][1]] = s;
    return;
  }
  // 좋아하는 학생이 인접한 칸에 가장 많은 칸이 많은 경우
  let emptyCount = -1,
    answer = [];
  maxIndex.forEach((idx) => {
    const [i, j] = idx;
    let count = 0;

    coordinates.forEach((coor) => {
      const newI = i + coor[0];
      const newJ = j + coor[1];
      if (newI >= 0 && newI < n && newJ >= 0 && newJ < n && seat[newI][newJ] === 0) {
        count += 1;
      }
    });

    if (emptyCount < count) {
      emptyCount = count;
      answer = idx;
    }
  });

  seat[answer[0]][answer[1]] = s;
});

let answer = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    let count = 0;

    coordinates.forEach((coor) => {
      const newI = i + coor[0];
      const newJ = j + coor[1];

      if (newI >= 0 && newI < n && newJ >= 0 && newJ < n && favoriteDic[seat[i][j]].includes(seat[newI][newJ])) {
        count += 1;
      }
    });

    switch (count) {
      case 0:
        answer += 0;
        break;
      case 1:
        answer += 1;
        break;
      case 2:
        answer += 10;
        break;
      case 3:
        answer += 100;
        break;
      case 4:
        answer += 1000;
        break;
    }
  }
}
console.log(answer);
