solution([[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]]);

// 반복문 안에서의 비교를 최소화해야 시간이 줄어든다 .. !!!
function solution(triangle) {
  const dp = Array.from(Array(triangle.length), () => new Array());

  dp[triangle.length - 1] = [...triangle[triangle.length - 1]];
  for (let i = triangle.length - 2; i >= 0; i--) {
    for (let j = 0; j < triangle[i].length; j++) {
      dp[i][j] = Math.max(dp[i + 1][j], dp[i + 1][j + 1]) + triangle[i][j];
    }
  }
  return dp[0][0];

  //  시간초과 나는 답
  //   for (let i = 1; i < triangle.length; i++) {
  //     for (let j = 0; j < triangle[i].length; j++) {
  //       if (j === 0) {
  //         dp[i][j] = dp[i - 1][j] + triangle[i][j];
  //       } else if (j === triangle[i].length - 1) {
  //         dp[i][j] = dp[i - 1][j - 1] + triangle[i][j];
  //       } else {
  //         dp[i][j] = Math.max(dp[i - 1][j - 1], dp[i - 1][j]) + triangle[i][j];
  //       }
  //     }
  //   }
}
