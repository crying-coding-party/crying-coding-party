function solution(triangle) {
  const height = triangle.length;

  let dp = triangle.map((v) => [...v].map((u) => 0));
  dp[0][0] = triangle[0][0];
  dp[1][0] = dp[0][0] + triangle[1][0];
  dp[1][1] = dp[0][0] + triangle[1][1];

  for (i = 2; i < height; i++) {
    dp[i][0] = dp[i - 1][0] + triangle[i][0];
    dp[i][i] = dp[i - 1][i - 1] + triangle[i][i];

    dp[i].forEach((v, j) => {
      if (j == 0 || j == dp[i].length - 1) return;
      dp[i][j] = Math.max(dp[i - 1][j - 1], dp[i - 1][j]) + triangle[i][j];
    });
  }

  return Math.max(...dp[dp.length - 1]);
}
