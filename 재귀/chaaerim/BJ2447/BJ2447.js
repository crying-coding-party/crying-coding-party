const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

solution(input);

function solution(input) {
  const num = Number(input);

  const starArray = Array.from(Array(num), () => new Array(num).fill(' '));

  drawStar(0, 0, num);
  starArray.map(i => console.log(i.join('')));

  function drawStar(colStart, rowStart, size) {
    if (size === 3) {
      if ((colStart / size) % 3 === 1 && (rowStart / size) % 3 === 1) {
        return;
      }
      for (let i = colStart; i < colStart + size; i++) {
        for (let j = rowStart; j < rowStart + size; j++) {
          if (i % 3 === 1 && j % 3 === 1) {
            continue;
          } else {
            starArray[i][j] = '*';
          }
        }
      }
      return;
    }

    if ((colStart / size) % 3 === 1 && (rowStart / size) % 3 === 1) {
      return;
    } else {
      drawStar(colStart, rowStart, size / 3);
      drawStar(colStart, rowStart + size / 3, size / 3);
      drawStar(colStart, rowStart + (size / 3) * 2, size / 3);
      drawStar(colStart + size / 3, rowStart, size / 3);
      drawStar(colStart + size / 3, rowStart + size / 3, size / 3);
      drawStar(colStart + size / 3, rowStart + (size / 3) * 2, size / 3);
      drawStar(colStart + (size / 3) * 2, rowStart, size / 3);
      drawStar(colStart + (size / 3) * 2, rowStart + size / 3, size / 3);
      drawStar(colStart + (size / 3) * 2, rowStart + (size / 3) * 2, size / 3);
    }
  }
}
