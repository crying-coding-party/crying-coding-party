function solution(board) {
  const N = board.length;
  const directions = [
    [-1, 0], // 위쪽
    [0, 1], // 오른쪽
    [1, 0], // 아래쪽
    [0, -1], // 왼쪽
  ];

  let queue = [[0, 0, -1, 0]];

  //visited 배열 방향 정보도 저장하도록 3차원으로 변경
  let visited = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => Array(4).fill(Infinity))
  );

  while (queue.length) {
    const [x, y, dir, price] = queue.shift();

    directions.forEach(([dx, dy], nextDir) => {
      const nx = x + dx;
      const ny = y + dy;

      if (nx < 0 || nx >= board.length || ny < 0 || ny >= board.length) return;

      //벽인지 확인
      if (board[nx][ny] === 1) return;

      let nextPrice = price + 100;

      // 다음 방향이 이전과 달라졌다면 코너 방향임
      if (dir !== -1 && dir !== nextDir) nextPrice = nextPrice + 500;

      // 방문한 적이 없거나 이미 방문했어도 적은 비용으로 갈 수 있다면
      if (
        visited[nx][ny] === Infinity ||
        visited[nx][ny][nextDir] > nextPrice
      ) {
        visited[nx][ny][nextDir] = nextPrice;
        queue.push([nx, ny, nextDir, nextPrice]);
      }
    });
  }

  return Math.min(...visited[N - 1][N - 1]);
}

const test25 = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 1, 1, 1, 1, 0],
  [1, 0, 0, 1, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 0],
]; //25번 테스트 케이스

// function solution (board) {

//     const directions = [
//       [-1, 0], // 위쪽
//       [0, 1], // 오른쪽
//       [1, 0], // 아래쪽
//       [0, -1], // 왼쪽
//     ];

//     let queue = [[0, 0, -1, 0]];
//     let visited = Array.from(new Array(board.length), () => new Array(board.length).fill(Infinity));

//     while (queue.length) {
//       const [x, y, dir, price] = queue.shift();

//       directions.forEach(([dx, dy], k) => {
//         const nx = x + dx;
//         const ny = y + dy;

//         if (nx < 0 || nx >= board.length || ny < 0 || ny >= board.length) return;
//         if (board[nx][ny] === 1) return;

//         let nextPrice = price + 100;

//         // 방향이 이전과 달라졌다면 코너 방향임
//         if (dir !== -1 && dir !== k) nextPrice += 500;

//         // 방문한 적이 없거나 이미 방문했어도 적은 비용으로 갈 수 있다면
//         if (visited[nx][ny] === Infinity || visited[nx][ny] > nextPrice) {
//           visited[nx][ny] = nextPrice;
//           queue.push([nx, ny, k, nextPrice]);
//         }
//       });
//     }

//     return visited[board.length - 1][board.length - 1];
//   };
