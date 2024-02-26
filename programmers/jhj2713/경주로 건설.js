// 시간초과
/**
 * dfs로 경로를 탐색하면서 직선 도로로 가는 경우, 코너로 가는 경우 가중치를 계산
 * n-1, n-1에 다다랐을 때 가중치들을 확인해서 최소 가중치가 정답
 */
function solution(board) {
  let answer = Infinity;
  const n = board.length - 1;
  const visited = Array.from(new Array(n + 1), () => new Array(n + 1).fill(false));

  dfs(0, 0, -1, 0);

  // dir는 위아래에서 오는 경우 0, 좌우에서 오는 경우 1
  function dfs(i, j, dir, val) {
    if (i === n && j === n) {
      answer = Math.min(answer, val);
      return;
    }

    if (i !== 0 && !visited[i - 1][j] && board[i - 1][j] === 0) {
      visited[i - 1][j] = true;
      dfs(i - 1, j, 0, val + (dir === 0 || dir === -1 ? 100 : 600));
      visited[i - 1][j] = false;
    }
    if (j !== 0 && !visited[i][j - 1] && board[i][j - 1] === 0) {
      visited[i][j - 1] = true;
      dfs(i, j - 1, 1, val + (dir === 1 || dir === -1 ? 100 : 600));
      visited[i][j - 1] = false;
    }
    if (i !== n && !visited[i + 1][j] && board[i + 1][j] === 0) {
      visited[i + 1][j] = true;
      dfs(i + 1, j, 0, val + (dir === 0 || dir === -1 ? 100 : 600));
      visited[i + 1][j] = false;
    }
    if (j !== n && !visited[i][j + 1] && board[i][j + 1] === 0) {
      visited[i][j + 1] = true;
      dfs(i, j + 1, 1, val + (dir === 1 || dir === -1 ? 100 : 600));
      visited[i][j + 1] = false;
    }
  }

  return answer;
}

// 정답
/**
 * [y, x, 가중치]를 저장하는 3차원 배열을 생성해서 dp로 풀이 -> 중복된 순회 횟수를 줄임
 */
function solution(board) {
  let answer = Infinity;
  const n = board.length - 1;
  const dp = Array(n + 1)
    .fill()
    .map(() =>
      Array(n + 1)
        .fill()
        .map(() => Array(4).fill(Infinity))
    );

  // 오른쪽: 0, 왼쪽: 1, 아래쪽: 2, 왼쪽: 3
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  dfs(0, 0, 0, 0);
  dfs(0, 0, 2, 0);

  function dfs(i, j, dir, cost) {
    if (i === n && j === n) {
      answer = Math.min(answer, cost);
      return;
    }

    directions.forEach((direction, idx) => {
      const [y, x] = direction;
      const newY = y + i;
      const newX = x + j;

      if (isValidCoordinate(newY, newX)) {
        const newCost = cost + (idx === dir ? 100 : 600);

        if (newCost < dp[newY][newX][idx]) {
          dp[newY][newX][idx] = newCost;
          dfs(newY, newX, idx, newCost);
        }
      }
    });
  }

  function isValidCoordinate(y, x) {
    return y >= 0 && y <= n && x >= 0 && x <= n && board[y][x] === 0;
  }

  return answer;
}
