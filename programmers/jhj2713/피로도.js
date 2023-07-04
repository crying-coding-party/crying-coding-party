function solution(k, dungeons) {
  var answer = 0;
  var visited = new Array(dungeons.length).fill(false);

  function dfs(idx, n) {
    if (n < 0 || idx == dungeons.length) return;

    for (var i = 0; i < dungeons.length; i++) {
      if (n >= dungeons[i][0] && !visited[i]) {
        answer = Math.max(answer, idx + 1);
        visited[i] = true;
        dfs(idx + 1, n - dungeons[i][1]);
        visited[i] = false;
      }
    }
  }

  dfs(0, k);

  return answer;
}
