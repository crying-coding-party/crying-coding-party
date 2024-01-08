//정확성은 다 맞았는데 효율성 에러남....
function solution(m, n, puddles) {
  const dp = new Array(n+1).fill().map(_ => new Array(m+1).fill(0));
    
  for(let i = 1; i <= n; i++) {
    for(let j = 1; j <= m; j++) {
      if(i === 1 && j === 1) {
        dp[1][1] = 1;
        continue;
      }
      
      //중첩 for 문안에서 또 for 문을 돌아서 그런 거 아닌지..
     for (const [x, y] of puddles) {
        dp[y][x] = 0;
    }

      dp[i][j] = (dp[i-1][j] + dp[i][j-1]) % 1000000007;
    }
  }
  
  return dp[n][m];
}
