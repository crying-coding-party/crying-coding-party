const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input2.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [NUM] = input.shift().split(' ').map(Number);

const text = '어느 한 컴퓨터공학과 학생이 유명한 교수님을 찾아가 물었다.';
const question = `"재귀함수가 뭔가요?"`;
const description = `"잘 들어보게. 옛날옛날 한 산 꼭대기에 이세상 모든 지식을 통달한 선인이 있었어.`;
const description2 = `마을 사람들은 모두 그 선인에게 수많은 질문을 했고, 모두 지혜롭게 대답해 주었지.`;
const description3 = `그의 답은 대부분 옳았다고 하네. 그런데 어느 날, 그 선인에게 한 선비가 찾아와서 물었어."`;
const answer = `"재귀함수는 자기 자신을 호출하는 함수라네"`;
const result = '라고 답변하였지.';

function solution(num) {
  const temp = num - 1;
  const count = (NUM - num) * 4;
  const downText = '_'.repeat(count);
  if (num > 0) {
    console.log(downText + question);
    console.log(downText + description);
    console.log(downText + description2);
    console.log(downText + description3);
    solution(temp);
  } else if (num === 0) {
    console.log(downText + question);
    console.log(downText + answer);
  }
}

function solution2(num) {
  const temp = num + 1;
  const count = (NUM - num) * 4;
  const downText = '_'.repeat(count);
  if (num < NUM) {
    console.log(downText + result);
    solution2(temp);
  } else if (num === NUM) {
    console.log(downText + result);
  }
}

console.log(text);
solution(NUM);
solution2(0);
