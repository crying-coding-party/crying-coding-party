//누적합으로 푼 코드
//누적합

// [0,0,0,0,0]  =>      [n,0,0,0,0,-n]     =>       [n,n,n,n,n,0]

// [0, 0 ,0, 0]	=> 	 	[n, 0, 0, -n]	   => 		[n, n, n, 0]
// [0, 0 ,0, 0]		 	[0, 0, 0, 0]	 	    	[n, n, n, 0]
// [0, 0 ,0, 0]		 	[0, 0, 0, 0]				[n, n, n, 0]
// [0, 0 ,0, 0]		 	[-n, 0, 0, n]				[0, 0, 0, 0]

function solution (board, skill) {
    let answer = 0;
    let arr = Array.from({ length: board.length + 1 }, () =>
    Array(board[0].length + 1).fill(0)
  ); // board보다 1을 증가시킨 배열을 생성

    
    for(let i = 0; i < skill.length; i++){
        const [type, r1, c1, r2, c2, degree] = skill[i];
        
        arr[r1][c1] += type === 1 ? -degree : degree; //n
        arr[r1][c2 + 1] += type === 1 ? degree : -degree; //-n
        arr[r2 + 1][c1] += type === 1 ? degree : -degree; //-n
        arr[r2 + 1][c2 + 1] += type === 1 ? -degree : degree; //n
    }
    
  //왼쪽 오른쪽
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      arr[i][j + 1] = arr[i][j + 1] + arr[i][j];
    }
  }
    
    //위 아래
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      arr[i + 1][j] = arr[i + 1][j] + arr[i][j]; 
    }
  }
    
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      board[i][j] = board[i][j] + arr[i][j]; // board에 해당 배열인 arr을 더해 최종 배열
    }
  }
     for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] > 0) {
        answer++; // 해당 값 중 0보다 큰 위치의 수
      }
    }
  }
    
    return answer;
}
