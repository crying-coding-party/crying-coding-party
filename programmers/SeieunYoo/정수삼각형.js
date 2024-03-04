function solution(triangle) {
  const dp = triangle.slice();
  
  //dp : 맨 아랫칸 부터 시작해서 다음 칸의 왼쪽/오른쪽 숫자 중에 무엇이 더 큰 숫자인지 계산한다.
// 그것을 위로 올려보낸다
  for(let i = dp.length-2; i >= 0; i--) {
    for(let j = 0; j < dp[i].length; j++) {
      dp[i][j] += Math.max(dp[i+1][j], dp[i+1][j+1]);
    }
  }
  
  return dp[0][0];
}
