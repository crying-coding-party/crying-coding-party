function solution(expression) {
  let answer = 0;

  // 나올수 있는 연산자 우선순위
  const exp = [
    ['+', '-', '*'],
    ['+', '*', '-'],
    ['-', '+', '*'],
    ['-', '*', '+'],
    ['*', '+', '-'],
    ['*', '-', '+'],
  ];

  //숫자별로 연산자별로 구분
  let numbers = expression.match(/[^-*+]+/g).map((v) => Number(v));
  let operators = expression.match(/[-*+]/g);

  for (let i = 0; i < exp.length; i++) {
    let tmpNum = [...numbers]; // [1,2,3....]
    let tmpOperator = [...operators]; //[+,-,*...]
    let current = exp[i];

    for (let j = 0; j < current.length; j++) {
      switch (current[j]) {
        case '+':
          for (let k = 0; k < tmpOperator.length; k++) {
            if (tmpOperator[k] === '+') {
              let sum = tmpNum[k] + tmpNum[k + 1];
              tmpNum.splice(k, 2, sum);
              tmpOperator.splice(k, 1);
              k--;
            }
          }
          break;
        case '-':
          for (let k = 0; k < tmpOperator.length; k++) {
            if (tmpOperator[k] === '-') {
              let sum = tmpNum[k] - tmpNum[k + 1];
              tmpNum.splice(k, 2, sum);
              tmpOperator.splice(k, 1);
              k--;
            }
          }
          break;
        case '*':
          for (let k = 0; k < tmpOperator.length; k++) {
            if (tmpOperator[k] === '*') {
              let sum = tmpNum[k] * tmpNum[k + 1];
              tmpNum.splice(k, 2, sum);
              tmpOperator.splice(k, 1);
              k--;
            }
          }
          break;
      }
    }

    answer = Math.max(answer, Math.abs(...tmpNum));
  }

  return answer;
}
