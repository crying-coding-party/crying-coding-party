function solution(n, computers) {
  let answer = 0;

  let visited = new Array(n).fill(0);
  let dfs = [];
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs.push(i);
      visited[i] = 1;
      while (dfs.length !== 0) {
        let cur = dfs.shift();
        for (let j = 0; j < computers[cur].length; j++) {
          if (computers[cur][j] == 1 && !visited[j]) {
            dfs.push(j);
            visited[j] = 1;
          }
        }
      }
      answer++;
    }
  }
  return answer;
}

console.log(
  solution(3, [
    [1, 1, 0],
    [1, 1, 1],
    [0, 1, 1],
  ])
);
