const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input.shift());

const arr = [];

for (let i = 0; i < N; i++) {
    arr.push(input[i].split(''));
}

console.log(`${bfs(N, N, arr, false)} ${bfs(N, N, arr, true)}`);

function bfs(M, N, arr, isColorWeakness){
    if(isColorWeakness){
        for(let i = 0; i < M; i++){
            for(let j = 0; j < N; j++){
                if(arr[i][j] === 'G') arr[i][j] = 'R';
            }
        }
    }

    let queue = [];
    let visited = Array.from(Array(M), () => Array(N).fill(false)); // 방문 여부
    
    const dx = [-1, 0, 1, 0]; // 상 우 하 좌
    const dy = [0, 1, 0, -1];
    
    let count = 0;

    for(let i = 0; i < M; i++){
       for(let j = 0; j < N; j++){
            if(!visited[i][j]){
                visited[i][j] = true;
                queue.push([i, j]);
                while(queue.length !== 0){
                    const [x, y] = queue.shift();
                    for (let dir = 0; dir < 4; dir++){
                        let nx = x + dx[dir];
                        let ny = y + dy[dir];
                        if(nx < 0 || nx >= M || ny < 0 || ny >= N) continue;
                        if(visited[nx][ny] || arr[nx][ny] !== arr[x][y]) continue;           
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