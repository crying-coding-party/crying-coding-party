function solution(n, computers) {
  var answer = 0;
  var visited = new Array(n).fill(false);

  function dfs(computers, i) {
    visited[i] = true;
    for (var j = 0; j < computers.length; j++) {
      if (!visited[j] && computers[i][j] === 1) {
        dfs(computers, j);
      }
    }
  }

  for (var i = 0; i < n; i++) {
    if (visited[i]) continue;

    answer++;
    dfs(computers, i);
  }

  return answer;
}
