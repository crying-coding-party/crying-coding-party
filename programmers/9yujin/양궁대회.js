function solution(n, info) {
  const comb = combination([], n, 0, 0);
  comb.forEach((v) => {});
}

//조합
const combination = (arr, n, step, sum) => {
  if (step === 10) return [[...arr, n - sum]];
  let array = [];

  for (let i = 0; i <= n - sum; i++) {
    if (sum + i > n) break;
    const attached = combination([...arr, i], n, step + 1, sum + i);
    array.push(...attached);
  }
  return array;
};

const getScoreDifference = (apeachShot, lionShot) => {
  let apeachScore = 0;
  let lionScore = 0;

  for (let i = 0; i < 11; i++) {
    if (!apeachShot[i] && !lionShot[i]) {
      continue;
    }
    if (lionShot[i] > apeachShot[i]) {
      lionScore += 10 - i;
    } else {
      apeachScore += 10 - i;
    }
  }

  return lionScore - apeachScore;
};
