const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

solution(input);

function solution([n, ...list]) {
  const size = Number(n);
  const numberMap = list.map(i => i.split(' ').map(Number));

  //   1이 blue, 0이 white
  let white = 0;
  let blue = 0;
  countColor(0, 0, size);

  console.log(white);
  console.log(blue);
  function countColor(colStart, rowStart, size) {
    if (size === 1) {
      if (numberMap[colStart][rowStart] === 1) {
        blue++;
      } else if (numberMap[colStart][rowStart] === 0) {
        white++;
      }
      return;
    }

    let flag = true;
    for (let i = colStart; i < colStart + size; i++) {
      for (let j = rowStart; j < rowStart + size; j++) {
        if (numberMap[i][j] !== numberMap[colStart][rowStart]) {
          flag = false;
        }
      }
    }
    if (flag) {
      if (numberMap[colStart][rowStart] === 1) {
        blue++;
      } else if (numberMap[colStart][rowStart] === 0) {
        white++;
      }
      return;
    } else {
      countColor(colStart, rowStart, size / 2);
      countColor(colStart, rowStart + size / 2, size / 2);
      countColor(colStart + size / 2, rowStart, size / 2);
      countColor(colStart + size / 2, rowStart + size / 2, size / 2);
    }
  }
}
