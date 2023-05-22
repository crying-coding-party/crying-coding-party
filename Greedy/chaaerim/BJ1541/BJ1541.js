const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

solution(input);

function solution([input]) {
  //   console.log(input);
  const cal = [];
  //  문자열 연산자와 나누기
  let temp = 0;
  for (let i = 0; i < input.length; i++) {
    // console.log(input[i]);
    if (input[i] === '-' || input[i] === '+') {
      cal.push(Number(input.substring(temp, i)));
      cal.push(input.substring(i, i + 1));
      temp = i + 1;
    }
    if (i === input.length - 1) {
      cal.push(Number(input.substring(temp, i + 1)));
    }
  }

  //   그리디로 풀기 +인 것은 일단 다 더하자
  const t = [];
  for (let i = 0; i < cal.length; i++) {
    if (cal[i] === '+') {
      let a = t.pop();
      t.push(a + cal[i + 1]);
      i = i + 1;
    } else {
      t.push(cal[i]);
    }

    // console.log(t);
  }
  console.log(eval(t.join('')));
}
