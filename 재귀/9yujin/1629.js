// https://velog.io/@gidskql6671/%EB%82%98%EB%A8%B8%EC%A7%80Modulo-%EC%97%B0%EC%82%B0-%EB%B6%84%EB%B0%B0%EB%B2%95%EC%B9%99
// (A * B) % p = ((A % p) * (B % p)) % p

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [input] = fs.readFileSync(filePath).toString().trim().split("\n");
const [A, B, C] = input.split(" ").map((v) => BigInt(v));

const recursion = (degree) => {
  if (degree == 1n) return A % C;

  const half = recursion(degree / 2n);
  if (degree % 2n == 1n) {
    return (A * half * half) % C;
  } else {
    return (half * half) % C;
  }
};
console.log(recursion(B).toString());
