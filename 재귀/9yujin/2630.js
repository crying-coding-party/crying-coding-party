const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = input.shift();
const graph = input.map((row) => row.split(" ").map((v) => Number(v)));

const check = (piece, target) => {
  return piece
    .map((row) => row.every((cell) => cell === target))
    .every((v) => v);
};

const cutPaper = (piece) => {
  const size = piece.length / 2;
  const pieceMap = [
    [0, 0],
    [size, 0],
    [0, size],
    [size, size],
  ];

  return pieceMap.map(([x, y]) => {
    const temp = [];
    for (let i = y; i < y + size; i++) {
      temp.push(piece[i].slice(x, x + size));
    }
    return temp;
  });
};

const recursive = (target, piece) => {
  if (check(piece, target)) {
    return 1;
  }
  if (piece.length === 1) {
    return check(piece, target) ? 1 : 0;
  }

  const newPieces = cutPaper(piece);
  return newPieces.reduce(
    (acc, newPiece) => acc + recursive(target, newPiece),
    0
  );
};
console.log(recursive(0, graph));
console.log(recursive(1, graph));
