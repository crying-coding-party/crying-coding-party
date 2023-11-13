function solution(n, k) {
  let answer = 0;
  const kArr = n.toString(k).split("0").filter(Boolean);

  kArr.forEach((str) => {
    if (!isPrime(parseInt(str))) {
      // 소수가 아닌 경우
      return;
    }
    answer += 1;
  });

  return answer;
}

function isPrime(num) {
  if (num <= 1) {
    return false;
  }
  for (let i = 2; i <= parseInt(Math.sqrt(num)); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

// 0 단위로 끊어서 해당 숫자가 조건을 만족하는지 확인
// 조건을 만족하는 숫자가 소수인지 확인
