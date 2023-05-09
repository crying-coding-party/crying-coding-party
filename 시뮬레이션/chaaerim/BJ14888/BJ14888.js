const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

solution(input);

function solution([n, nums, list]) {
  const size = Number(n);
  const num = nums.split(' ').map(Number);
  const operator = list.split(' ').map(Number);
  const op = [];
  let max = -Infinity;
  let min = Infinity;
  for (let i = 0; i < operator.length; i++) {
    while (operator[i] !== 0) {
      operator[i]--;
      if (i === 0) {
        op.push('p');
      }
      if (i === 1) {
        op.push('m');
      }
      if (i === 2) {
        op.push('l');
      }
      if (i === 3) {
        op.push('d');
      }
    }
  }
  //   console.log(op);

  const array = new Array(size - 1).fill(0);
  const visited = new Array(size - 1).fill(false);

  const answer = [];
  back(0);

  function back(count) {
    if (count === size - 1) {
      // 계산 p-덧셈, m-뺄셈, l-곱셈, d-나눗셈
      //   console.log(array);
      let sum = num[0];
      for (let i = 1; i < num.length; i++) {
        if (array[i - 1] === 'p') {
          sum += num[i];
        }
        if (array[i - 1] === 'm') {
          sum -= num[i];
        }
        if (array[i - 1] === 'l') {
          sum *= num[i];
        }
        if (array[i - 1] === 'd') {
          if (sum < 0) {
            sum = Math.ceil(sum / num[i]);
          } else {
            sum = Math.floor(sum / num[i]);
          }
        }
        // console.log(sum, num[i], array[i - 1]);
      }

      answer.push(sum);

      return;
    }
    for (let i = 0; i < op.length; i++) {
      if (!visited[i]) {
        // console.log(operator[i], i, count);
        array[count] = op[i];
        visited[i] = true;
        back(count + 1);
        visited[i] = false;
      }
    }
  }

  max = Math.max(...answer);
  min = Math.min(...answer);

  console.log(max ? max : 0);
  console.log(min ? min : 0);
}
