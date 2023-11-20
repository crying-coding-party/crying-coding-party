function solution(n, k) {
  var answer = -1;
  const numbers = getNBaseNumber(n, k)
    .split("0")
    .filter((v) => Boolean(v));
  return numbers.reduce((acc, cur) => {
    console.log(isPrime(Number(cur)), cur);
    return isPrime(Number(cur)) ? acc + 1 : acc;
  }, 0);
}

const getNBaseNumber = (n, k) => {
  let temp = n;
  let toBe = [];
  while (temp > k) {
    toBe = [...toBe, temp % k];
    temp = Math.floor(temp / k);
  }
  toBe = [...toBe, temp];
  return toBe.reverse().join("");
};

const isPrime = (number) => {
  if (number === 1) return false;
  for (let i = 2; i <= Math.floor(Math.sqrt(number)); i++) {
    if (number % i === 0) return false;
  }
  return true;
};
