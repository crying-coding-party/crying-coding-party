const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n').map((str) => str.trim());

const T = Number(input.shift());


for(let i = 0; i < T; i++){ // 테스트 케이스 수만큼 반복
    const [M, N, K] = input.shift().split(' ').map(Number);
    let arr = Array.from(Array(M), () => Array(N).fill(0)); // 배추밭

    for(let j = 0; j < K; j++){
        const[x, y] = input.shift().split(' ').map(Number);
        arr[x][y] = 1;
    }

    let result = bfs(M, N, arr)
    console.log(result);

}

// 뭉쳐 있는 1 구하기

function bfs(M, N, arr){
    let queue = [];
    let visited = Array.from(Array(M), () => Array(N).fill(false)); // 방문 여부
    
    const dx = [-1, 0, 1, 0]; // 상 우 하 좌
    const dy = [0, 1, 0, -1];
    
    let count = 0;

    for(let i = 0; i < M; i++){
       for(let j = 0; j < N; j++){
            if(arr[i][j] === 1 && !visited[i][j]){
                visited[i][j] = true;
                queue.push([i, j]);
                while(queue.length !== 0){
                    const [x, y] = queue.shift();
                    for (let dir = 0; dir < 4; dir++){
                        let nx = x + dx[dir];
                        let ny = y + dy[dir];
                        if(nx < 0 || nx >= M || ny < 0 || ny >= N) continue;
                        if(visited[nx][ny] || arr[nx][ny] === 0) continue;           
                        visited[nx][ny] = true;
                        queue.push([nx, ny]);
                    }
                }
                count++;
            }
        }
    }
    return(count);
}