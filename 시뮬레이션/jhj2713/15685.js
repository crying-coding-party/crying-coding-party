const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const curveArr = input.slice(1).map((inp) => inp.split(" ").map(Number));

const coordinate = Array.from(Array(101), () => new Array(101).fill(false));

function curve(curveMap) {
  const tmpMap = [];
  let preX = curveMap[0][0],
    preY = curveMap[0][1];

  curveMap.forEach((curve) => {
    const [x1, y1, x2, y2, d] = curve;
    let newX1 = preX,
      newY1 = preY,
      newX2,
      newY2,
      newD;
    if (d === 0) {
      // 동쪽
      newX2 = newX1;
      newY2 = newY1 + 1;
      newD = 3;
    } else if (d === 1) {
      // 북쪽
      newX2 = newX1 + 1;
      newY2 = newY1;
      newD = 0;
    } else if (d === 2) {
      // 서쪽
      newX2 = newX1;
      newY2 = newY1 - 1;
      newD = 1;
    } else if (d === 3) {
      // 남쪽
      newX2 = newX1 - 1;
      newY2 = newY1;
      newD = 2;
    }

    (preX = newX2), (preY = newY2);
    tmpMap.push([newX1, newY1, newX2, newY2, newD]);
  });

  const reverseTmpMap = tmpMap.reverse();
  const [lastX1, lastY1, lastX2, lastY2, lastD] = curveMap[curveMap.length - 1];
  const [firstX1, firstY1, firstX2, firstY2, firstD] = reverseTmpMap[0];
  const xLength = lastX2 - firstX2;
  const yLength = lastY2 - firstY2;

  return reverseTmpMap.map((data) => {
    return [data[2] + xLength, data[3] + yLength, data[0] + xLength, data[1] + yLength, (data[4] + 2) % 4];
  });
}

curveArr.forEach((c) => {
  const [x, y, d, g] = c;
  const tmpMap = [];

  let newX, newY;
  if (d === 0) {
    // 동쪽
    newX = x + 1;
    newY = y;
  } else if (d === 1) {
    // 북쪽
    newX = x;
    newY = y - 1;
  } else if (d === 2) {
    // 서쪽
    newX = x - 1;
    newY = y;
  } else if (d === 3) {
    // 남쪽
    newX = x;
    newY = y + 1;
  }

  tmpMap.push([x, y, newX, newY, d]);

  for (let i = 0; i < g; i++) {
    const newTmpMap = curve(tmpMap);
    tmpMap.push(...newTmpMap);
  }

  tmpMap.forEach(([x1, y1, x2, y2]) => {
    coordinate[y1][x1] = true;
    coordinate[y2][x2] = true;
  });
});

let answer = 0;
for (let i = 1; i <= 100; i++) {
  for (let j = 1; j <= 100; j++) {
    if (coordinate[i - 1][j - 1] && coordinate[i - 1][j] && coordinate[i][j - 1] && coordinate[i][j]) answer += 1;
  }
}

console.log(answer);
