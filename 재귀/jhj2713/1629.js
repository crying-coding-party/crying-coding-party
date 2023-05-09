const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split(" ");

const [a, b, c] = input.map(Number);

function recur(count) {
  if (parseInt(count) === 0) return BigInt(1);

  const recurNum = recur(BigInt(parseInt(count / BigInt(2))));

  if (parseInt(count % BigInt(2)) === 0) return (recurNum * recurNum) % BigInt(c);
  return (recurNum * recurNum * BigInt(a)) % BigInt(c);
}

console.log(parseInt(recur(BigInt(b))));
