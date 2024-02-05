function solution (n, s, a, b, fares) {
 const board = Array.from(Array(n), () => new Array(n).fill(Infinity));
  
  fares.forEach(fare => {
      const [x, y, value] = fare;
      board[x-1][y-1] = value;
      board[y-1][x-1] = value;
      board[x-1][x-1] = 0;
      board[y-1][y-1] = 0;
  });
  
    
    // k는 경유하는 노드, i는 출발하는 노드, j는 도착하는 노드
  for(let k = 0; k < n; k++) {
    for(let i = 0; i < n; i++) {
      for(let j = 0; j < n; j++) {
        if(board[i][j] > board[i][k] + board[k][j])
          board[i][j] = board[i][k] + board[k][j];
      }
    }
  }

    //따로 간다고 할 떄
    let answer = board[s-1][a-1] + board[s-1][b-1];
  for(let i = 0; i < n; i++) {
      //시작지점에서 i까지 합승하고 i 부터 a 랑 b 가 각자 간다고 할 때
    answer = Math.min(answer, board[s-1][i] + board[i][a-1] + board[i][b-1]);
  }
  
  return answer;
}
