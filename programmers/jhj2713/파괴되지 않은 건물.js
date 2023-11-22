// 효율성 다 틀린 코드
// 각 위치의 누적합을 모두 구한 코드
function solution(board, skill) {
  let answer = 0;
  const yLength = board.length;
  const xLength = board[0].length;
  const arr = Array.from(Array(yLength), () => new Array(xLength).fill(0));

  skill.forEach((s) => {
    const [type, r1, c1, r2, c2, degree] = s;
    for (let i = r1; i <= r2; i++) {
      for (let j = c1; j <= c2; j++) {
        arr[i][j] = arr[i][j] + degree * (type === 1 ? -1 : 1);
      }
    }
  });

  for (let i = 0; i < yLength; i++) {
    for (let j = 0; j < xLength; j++) {
      board[i][j] += arr[i][j];
      if (board[i][j] > 0) {
        answer += 1;
      }
    }
  }

  return answer;
}

// 새로운 누적합으로 푼 코드
// r1, c1, r2, c2를 기준으로 가로, 세로의 누적합을 구했을때가 각 위치의 내구도 변화량
// -> skill 배열 내의 순회를 줄일 수 있음
function solution(board, skill) {
  let answer = 0;
  const yLength = board.length;
  const xLength = board[0].length;
  const sumArr = Array.from(Array(yLength + 1), () => new Array(xLength + 1).fill(0));

  skill.forEach((s) => {
    const [type, r1, c1, r2, c2, degree] = s;
    sumArr[r1][c1] += (type === 1 ? -1 : 1) * degree;
    sumArr[r1][c2 + 1] += (type === 1 ? 1 : -1) * degree;
    sumArr[r2 + 1][c1] += (type === 1 ? 1 : -1) * degree;
    sumArr[r2 + 1][c2 + 1] += (type === 1 ? -1 : 1) * degree;
  });

  for (let i = 0; i < yLength; i++) {
    for (let j = 0; j < xLength; j++) {
      sumArr[i][j + 1] += sumArr[i][j];
    }
  }
  for (let j = 0; j < xLength; j++) {
    for (let i = 0; i < yLength; i++) {
      sumArr[i + 1][j] += sumArr[i][j];
    }
  }

  for (let i = 0; i < yLength; i++) {
    for (let j = 0; j < xLength; j++) {
      board[i][j] += sumArr[i][j];
      if (board[i][j] > 0) {
        answer += 1;
      }
    }
  }

  return answer;
}
