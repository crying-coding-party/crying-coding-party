function solution(n, k) {
    var answer = 0;
    const num = n.toString(k);
    const num2 = num.split('0');
    for(let i = 0; i < num2.length; i++){
        if(isPrime(num2[i])){
            answer++;
        }
    }

    console.log(answer)
    return answer
}

function isPrime(number) {
  if (number <= 1) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}
