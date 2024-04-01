function solution(expression) {
  let answer = 0;
  const operatorPriority = [
    ["*", "+", "-"],
    ["*", "-", "+"],
    ["+", "*", "-"],
    ["+", "-", "*"],
    ["-", "*", "+"],
    ["-", "+", "*"],
  ];

  const expressionOperator = expression.match(/[\+\-\*]/g);
  const expressionNumbers = expression.match(/\d+/g).map(Number);

  operatorPriority.forEach((operator) => {
    const currentOperator = [...expressionOperator];
    const currentNumbers = [...expressionNumbers];

    operator.forEach((op) => {
      for (let i = 0; i < currentOperator.length; i++) {
        if (currentOperator[i] === op) {
          // 현재 우선순위의 연산자인 경우 계산
          let sum;
          const currentNum1 = currentNumbers[i],
            currentNum2 = currentNumbers[i + 1];
          switch (op) {
            case "*":
              sum = currentNum1 * currentNum2;
              break;
            case "+":
              sum = currentNum1 + currentNum2;
              break;
            case "-":
              sum = currentNum1 - currentNum2;
              break;
          }

          currentOperator.splice(i, 1);
          currentNumbers.splice(i, 2, sum);
          i -= 1;
        }
      }
    });
    answer = Math.max(answer, Math.abs(currentNumbers[0]));
  });

  return answer;
}
