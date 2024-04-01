/**
 * 실패 (런타임에러, 시간초과)
 *
 * dfs로 탐색하면서 end 지점 찾기
 * d -> l -> r -> u로 탐색해서 사전 순으로 가장 빠른 경로가 먼저 answer에 들어가게 하기
 */
function solution(n, m, x, y, r, c, k) {
  let answer = "impossible";
  const coordinates = [
    [1, 0, "d"],
    [0, -1, "l"],
    [0, 1, "r"],
    [-1, 0, "u"],
  ];

  dfs(x - 1, y - 1, 0, "");

  function dfs(i, j, currentLength, direction) {
    if (currentLength === k) {
      if (i === r - 1 && j === c - 1 && answer === "impossible") {
        // 거리가 k이고 목표지점에 다다랐을 때
        answer = direction;
      }
      return;
    }

    coordinates.forEach(([_i, _j, d]) => {
      const newI = i + _i;
      const newJ = j + _j;

      if (isRightCoordinate(newI, newJ)) {
        dfs(newI, newJ, currentLength + 1, `${direction}${d}`);
      }
    });
  }
  function isRightCoordinate(x, y) {
    return x >= 0 && x < n && y >= 0 && y < m;
  }

  return answer;
}

/**
 * 9~ 런타임에러
 *
 * early return되는 조건들 추가
 */
function solution(n, m, x, y, r, c, k) {
  let answer = "impossible";

  const coordinates = [
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, 0],
  ]; // d, l, r, u
  const minimumLength = Math.abs(x - r) + Math.abs(y - c);

  if (minimumLength > k || (k - minimumLength) % 2 !== 0) {
    return answer;
  }

  dfs(x, y, 0, "");

  function dfs(i, j, currentLength, direction) {
    if (answer !== "impossible") {
      // 사전 순으로 가장 빠른 경로가 이미 탐색된 경우
      return;
    }
    if (k - currentLength < Math.abs(r - i) + Math.abs(c - j)) {
      // 남은 거리가 최단 거리보다 짧은 경우 (k 길이로 r, c에 다다를 수 없음)
      return;
    }
    if (currentLength === k) {
      if (i === r && j === c) {
        // 거리가 k이고 목표지점에 다다랐을 때
        answer = direction;
      }
      return;
    }

    coordinates.forEach(([_i, _j], idx) => {
      const newI = i + _i;
      const newJ = j + _j;

      let d = "";
      if (idx === 0) {
        d = "d";
      } else if (idx === 1) {
        d = "l";
      } else if (idx === 2) {
        d = "r";
      } else if (idx === 3) {
        d = "u";
      }

      if (isRightCoordinate(newI, newJ)) {
        dfs(newI, newJ, currentLength + 1, direction + d);
      }
    });
  }
  function isRightCoordinate(x, y) {
    return x >= 1 && x <= n && y >= 1 && y <= m;
  }

  return answer;
}
