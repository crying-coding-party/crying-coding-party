function solution(triangle) {
  for (let i = 1; i < triangle.length; i++) {
    for (let j = 0; j < triangle[i].length; j++) {
      triangle[i][j] += Math.max(triangle[i - 1][j] ?? 0, triangle[i - 1][j - 1] ?? 0);
    }
  }

  const lastLine = triangle[triangle.length - 1];

  return Math.max(...lastLine);
}
