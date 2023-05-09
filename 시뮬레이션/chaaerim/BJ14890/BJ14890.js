const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

solution(input);
function solution([n, ...list]) {
  const [size, l] = n.split(' ').map(Number);
  const numMap = list.map(i => i.split(' ').map(Number));

  // numMap 행렬 바꿔서 넘겨주기
  const reverseNumMap = Array.from(Array(Number(size)), () => new Array(Number(size)));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      reverseNumMap[j][i] = numMap[i][j];
    }
  }
  // console.log(reverseNumMap, 'reverse');
  const rowAns = row(numMap, size, l);
  const colAns = row(reverseNumMap, size, l);

  // console.log(size, numMap);
  console.log(rowAns + colAns);
}

function row(numMap, size, l) {
  // 행 검사
  const visited = Array.from(Array(Number(size)), () => new Array(Number(size)));

  let answer = 0;
  for (let i = 0; i < size; i++) {
    let flag = true;
    for (let j = 0; j < size - 1; j++) {
      // 높이 차가 2 이상 나는 경우
      if (Math.abs(numMap[i][j] - numMap[i][j + 1]) > 1) {
        flag = false;
        break;
      }
      // 높이 차가 1이면 l개 칸을 놓을 수 있는지 검사
      // 오른쪽이 더 높은 경우
      if (numMap[i][j] < numMap[i][j + 1] && j + 1 - l >= 0) {
        // 사이에 낀 경우
        if (numMap[i][j + 1] < size && numMap[i][j - l] === numMap[i][j + 1]) {
          flag = false;
        }
        for (let k = j - l + 1; k < j; k++) {
          // 칸이 다 같은지 검사
          if (numMap[i][k] !== numMap[i][k + 1] || visited[i][k]) {
            flag = false;
          }
        }
        // 겹치치 못하게
        if (flag) {
          for (let k = j - l + 1; k <= j; k++) {
            visited[i][k] = true;
          }
        }
      } else if (numMap[i][j] < numMap[i][j + 1] && j + 1 - l < 0) {
        flag = false;
      }
      // 왼쪽이 더 높은 경우
      if (numMap[i][j] > numMap[i][j + 1] && j + l < size) {
        // console.log(i, j, j + l, 'll');
        // 사이에 낀 경우
        if (numMap[i][j + l + 1] < size && numMap[i][j] === numMap[i][j + l + 1]) {
          flag = false;
        }
        for (let k = j + 1; k < j + l; k++) {
          // 칸 다 같은지 검사
          if (numMap[i][k] !== numMap[i][k + 1] || visited[i][k]) {
            flag = false;
          }
        }
        // 겹쳐서 놓지 못하게
        if (flag) {
          for (let k = j + 1; k <= j + l; k++) {
            visited[i][k] = true;
          }
        }
      } else if (numMap[i][j] > numMap[i][j + 1] && j + l >= size) {
        flag = false;
      }
      // 사이에 낀 경우 빼야함
    }

    if (flag) {
      // console.log('hihi');
      // console.log(numMap[i], i);
      answer += 1;
    }
  }
  return answer;
}
