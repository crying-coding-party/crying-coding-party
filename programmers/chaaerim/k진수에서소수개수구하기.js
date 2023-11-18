function solution(n, k) {
  let answer = -1;
  // 진수 변환
  const kNumber = parseInt(String(n), 10).toString(k);

  let numbers = [];
  let num = '';
  let primes = [];
  for (let i = 0; i < kNumber.length; i++) {
    console.log(num);
    if (kNumber[i] !== '0') {
      num += kNumber[i];
    } else if (num !== '') {
      numbers.push(num);
      num = '';
    }

    if (i === kNumber.length - 1) {
      numbers.push(num);
    }
  }
  numbers.forEach(el => {
    if (isPrime(Number(el)) && el !== '') {
      primes.push(el);
    }
  });

  console.log(num, numbers, kNumber, primes);

  return primes.length;
}

function isPrime(num) {
  if (num === 1) {
    return false;
  }
  if (num === 2) {
    return true;
  }

  for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
    if (num % i === 0) {
      // 한 번이라도 나누어 졌으니 소수가 아니므로 return false
      return false;
    }
  }
  // 나눠진 수가 없다면 해당 수는 소수이므로 return true
  return true;
}
