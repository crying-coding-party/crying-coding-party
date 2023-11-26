function solution(board, skill) {
  let answer = 0;
  let arr = Array.from({ length: board.length + 1 }, () => Array(board[0].length + 1).fill(0)); // 밑과 옆으로 board보다 1을 증가시킨 배열을 생성

  for (let i = 0; i < skill.length; i++) {
    const [type, r1, c1, r2, c2, degree] = skill[i];
    arr[r1][c1] += type === 1 ? -degree : degree;
    arr[r1][c2 + 1] += type === 1 ? degree : -degree;
    arr[r2 + 1][c1] += type === 1 ? degree : -degree;
    arr[r2 + 1][c2 + 1] += type === 1 ? -degree : degree;
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      arr[i + 1][j] += arr[i][j];
    }
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      arr[i][j + 1] += arr[i][j];
    }
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      board[i][j] += arr[i][j];
    }
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] > 0) {
        answer++;
      }
    }
  }

  return answer;
}
