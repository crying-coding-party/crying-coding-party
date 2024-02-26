function solution(board) {
    let answer = board.length * board.length * 500;
    
    // 상 우 하 좌
    let dx = [0, 1, 0, -1]; 
    let dy = [1, 0, -1, 0]; 
    
    let N = board.length;
    let arr = Array.from(Array(board.length),()=>Array(board.length).fill(0));
    
    const queue=[];
    
    function bfs(){

        while(queue.length){
            // [y, x, 이전 방향, 이전 비용]
            let [Y, X, direction, cost] = queue.shift();

            if(Y === N - 1 && X === N - 1){
                answer = (answer > cost) ? cost : answer;}

            for (let i = 0; i < 4; i++){
                let ny = Y + dy[i], nx = X + dx[i];
                if(ny < 0 || nx < 0 || ny > N - 1 || nx > N - 1 || board[ny][nx]) continue;
                let charge = (direction === i) ? cost + 100 : cost + 600;
                if(!arr[ny][nx] || arr[ny][nx] >= charge){
                  arr[ny][nx] = charge;  
                  queue.push([ny, nx, i, charge]);
                } 
            }
        }
    }

    queue.push([0,0,0,0]);
    queue.push([0,0,1,0]);

    bfs();
    return answer;
}