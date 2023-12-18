function solution(m, n, puddles) {
  let answer = 0;
  const dp = Array.from(new Array(n + 1), () => new Array(m + 1).fill(0));

  for (let i = 0; i < puddles.length; i++) {
    if (puddles[i].length === 0) break;
    const [y, x] = puddles[i];
    dp[x][y] = -1; // 물에 잠긴 지역은 -1로 표시
  }

  if (dp[1][2] !== -1) dp[1][2] = 1;
  if (dp[2][1] !== -1) dp[2][1] = 1;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (dp[i][j] === -1) continue;

      if (dp[i - 1][j] !== -1) dp[i][j] = (dp[i][j] + dp[i - 1][j]) % 1000000007;
      if (dp[i][j - 1] !== -1) dp[i][j] = (dp[i][j] + dp[i][j - 1]) % 1000000007;
    }
  }

  return dp[n][m] % 1000000007;
}
