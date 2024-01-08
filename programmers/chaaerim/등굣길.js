solution(4, 3, [[2, 2]]);

function solution(m, n, puddles) {
  const schoolMap = Array.from(Array(n), () => new Array(m).fill(1));
  puddles.forEach(el => {
    schoolMap[el[1] - 1][el[0] - 1] = 0;
    // 1번째 행이나 열에 우물이 있는 경우 직선 최소 거리 없으므로 이후 최소 거리 다 0으로 바꿔줘야함.
    if (el[1] - 1 === 0) {
      // 첫번째 열 다 0으로 바꿈
      for (let i = el[0] - 1; i < m; i++) {
        schoolMap[el[1] - 1][i] = 0;
      }
    } else if (el[0] - 1 === 0) {
      // 첫번째 행 다 0으로 바꿈
      for (let i = el[1] - 1; i < n; i++) {
        schoolMap[i][el[0] - 1] = 0;
      }
    }
  });

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (i - 1 < 0 || j - 1 < 0) {
        continue;
      }
      if (schoolMap[i][j] === 0) {
        continue;
      }

      schoolMap[i][j] = (schoolMap[i - 1][j] + schoolMap[i][j - 1]) % 1000000007;
      //   console.log(schoolMap);
    }
  }
  return schoolMap[n - 1][m - 1];
}
