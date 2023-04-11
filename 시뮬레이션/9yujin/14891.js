const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let wheel = input.splice(0, 4).map((row) => [...row].map(Number));

let isRotated = [0, 0, 0, 0];
const K = input.shift();
const rotation = input.map((row) => row.split(" ").map(Number));

const rotate = (target, direction) => {
  if (direction === -1) {
    //반시계
    const temp = wheel[target][0];
    wheel[target].shift();
    wheel[target] = [...wheel[target], temp];
  } else {
    //시계
    const temp = wheel[target][7];
    wheel[target].pop();
    wheel[target] = [temp, ...wheel[target]];
  }
};

const rotationRecursion = (start, direction) => {
  rotate(start, direction);
  isRotated[start] = 1;
  const left = start - 1;
  const right = start + 1;

  if (left >= 0 && wheel[left][2] !== wheel[start][6] && isRotated[left] == 0)
    rotationRecursion(left, direction * -1);
  if (right < 4 && wheel[right][6] !== wheel[start][2] && isRotated[right] == 0)
    rotationRecursion(right, direction * -1);
};

rotation.forEach(([start, direction]) => {
  rotationRecursion(start - 1, direction);
  isRotated = [0, 0, 0, 0];
});
console.log(wheel[0][0] + wheel[1][0] * 2 + wheel[2][0] * 4 + wheel[3][0] * 8);
``;
