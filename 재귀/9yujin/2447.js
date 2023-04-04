const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = Number(input[0]);

let arr = Array.from(Array(N), () => Array(N).fill("*"));

// 가운데 빵꾸 뚫는 함수
const punch = (x, y, offsetX, offsetY, pieceSize) => {
  for (let i = y; i < y + pieceSize; i++) {
    for (let j = x; j < x + pieceSize; j++) {
      arr[offsetY + i][offsetX + j] = " ";
    }
  }
};

const recursion = (size, offsetX, offsetY) => {
  if (size === 1) return;
  const pieceSize = size / 3;

  const pieceMap = [
    [0, 0],
    [pieceSize, 0],
    [pieceSize * 2, 0],
    [0, pieceSize],
    [pieceSize, pieceSize],
    [pieceSize * 2, pieceSize],
    [0, pieceSize * 2],
    [pieceSize, pieceSize * 2],
    [pieceSize * 2, pieceSize * 2],
  ];

  pieceMap.map(([x, y], idx) => {
    if (idx == 4) punch(x, y, offsetX, offsetY, pieceSize);
    else recursion(pieceSize, offsetX + x, offsetY + y);
  });
};

recursion(N, 0, 0);
arr.forEach((v) => console.log(v.join("")));
