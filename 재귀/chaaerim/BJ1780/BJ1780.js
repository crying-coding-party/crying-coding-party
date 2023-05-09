const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

solution(input);

function solution([n, ...list]) {
  const num = Number(n);
  const numberMap = list.map(i => i.split(' ').map(Number));
  let countZero = 0;
  let countOne = 0;
  let countMinus = 0;

  countNum(0, 0, num);
  console.log(countMinus);
  console.log(countZero);
  console.log(countOne);

  function countNum(colStart, rowStart, size) {
    if (size === 1) {
      if (numberMap[colStart][rowStart] === 0) {
        countZero++;
      } else if (numberMap[colStart][rowStart] === 1) {
        countOne++;
      } else if (numberMap[colStart][rowStart] === -1) {
        countMinus++;
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

    if (flag === true) {
      if (numberMap[colStart][rowStart] === 0) {
        countZero++;
      } else if (numberMap[colStart][rowStart] === 1) {
        countOne++;
      } else if (numberMap[colStart][rowStart] === -1) {
        countMinus++;
      }
      return;
    } else {
      let resize1 = size / 3;
      let resize2 = (size / 3) * 2;
      countNum(colStart, rowStart, size / 3);
      countNum(colStart, rowStart + resize1, size / 3);
      countNum(colStart, rowStart + resize2, size / 3);
      countNum(colStart + resize1, rowStart, size / 3);
      countNum(colStart + resize1, rowStart + resize1, size / 3);
      countNum(colStart + resize1, rowStart + resize2, size / 3);
      countNum(colStart + resize2, rowStart, size / 3);
      countNum(colStart + resize2, rowStart + resize1, size / 3);
      countNum(colStart + resize2, rowStart + resize2, size / 3);
    }
  }
}
