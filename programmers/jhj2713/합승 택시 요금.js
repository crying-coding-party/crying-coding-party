function solution(n, s, a, b, fares) {
  let answer = Infinity;
  const graph = Array.from(Array(n), () => new Array(n).fill(Infinity));

  fares.forEach((fare) => {
    const [a, b, val] = fare;
    graph[a - 1][b - 1] = val;
    graph[b - 1][a - 1] = val;
    graph[a - 1][a - 1] = 0;
    graph[b - 1][b - 1] = 0;
  });

  // 플로이드 와샬로 모든 정점에서 다른 모든 정점으로 향하는 최소 비용을 구함
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        graph[j][k] = Math.min(graph[j][k], graph[j][i] + graph[i][k]);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    // i가 합승 지점일 경우
    answer = Math.min(answer, graph[s - 1][i] + graph[i][a - 1] + graph[i][b - 1]);
  }

  return answer;
}
