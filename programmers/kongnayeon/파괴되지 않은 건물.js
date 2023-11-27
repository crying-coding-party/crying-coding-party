function changeBoard(board, skill) {
  let [type, r1, c1, r2, c2, degree] = skill;
  for (let i = r1; i <= r2; i++) {
    for (let j = c1; j <= c2; j++) {
      if (type === 1) {
        board[i][j] -= degree;
      } else if (type === 2) {
        board[i][j] += degree;
      } else {
        continue;
      }
    }
  }
}

function check(board) {
  let result = 0;
  board.forEach((row) =>
    row.forEach((el) => {
      if (el >= 1) result++;
    })
  );
  return result;
}

function solution(board, skill) {
  skill.map((el) => changeBoard(board, el));
  let answer = check(board);
  console.log(answer);
  return answer;
}
