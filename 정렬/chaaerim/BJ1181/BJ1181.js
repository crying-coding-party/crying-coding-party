const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

solution(input);
function solution([n, ...list]) {
  const num = Number(n);
  const setList = new Set(list);
  const setArr = [...setList];
  const answerArr = [];
  for (let i = 0; i < setArr.length; i++) {
    answerArr.push([setArr[i], setArr[i].length]);
  }
  answerArr.sort((a, b) => {
    return a[1] - b[1];
  });
  const ans = [];
  let temp = [];
  for (let i = 0; i < answerArr.length; i++) {
    if (i < answerArr.length - 1 && answerArr[i][1] === answerArr[i + 1][1]) {
      temp.push(answerArr[i][0]);
    } else {
      temp.push(answerArr[i][0]);
      temp.sort();
      ans.push(...temp);
      temp = [];
      //   ans.push(answerArr[i][0]);
    }
  }
  ans.forEach(i => console.log(i));
}
