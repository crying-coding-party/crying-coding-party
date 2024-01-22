function solution(key, lock) {
  let [M, N] = [key.length, lock.length];

  // key를 넣어 보기 위해 M * 2 + N 크기의 board 생성
  let board = new Array(M * 2 + N)
    .fill(0)
    .map(() => new Array(M * 2 + N).fill(0));

  // board 중앙에 좌물쇠 넣기
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      board[M + i][M + j] += lock[i][j];
    }
  }

  let nowKey = key;

  // 90도씩 4번 반복
  for (let i = 0; i < 4; i++) {
    nowKey = rotate(nowKey);

    for (let x = 1; x < M + N; x++) {
      for (let y = 1; y < M + N; y++) {
        // 열쇠 넣어보기
        keyIn(x, y, nowKey, board);

        // lock 가능 check
        if (check(board, M, N)) {
          return true;
        }

        // 열쇠 빼기
        keyOut(x, y, nowKey, board);
      }
    }
  }

  return false;
}

// 열쇠 넣어 보기
function keyIn(x, y, key, board) {
  for (let i = 0; i < key.length; i++) {
    for (let j = 0; j < key.length; j++) {
      board[x + i][y + j] += key[i][j];
    }
  }
}

// 열쇠 빼기
function keyOut(x, y, key, board) {
  for (let i = 0; i < key.length; i++) {
    for (let j = 0; j < key.length; j++) {
      board[x + i][y + j] -= key[i][j];
    }
  }
}

// 시계방향으로 90도 열쇠 돌리기
function rotate(key) {
  return key[0].map((_, i) => key.map((row) => row[i]).reverse());
}

// 잠금 풀 수 있는지 확인
function check(board, M, N) {
  for (let i = M; i < M + N; i++) {
    for (let j = M; j < M + N; j++) {
      if (board[i][j] !== 1) {
        return false;
      }
    }
  }
  return true;
}
