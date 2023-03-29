const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n').map((str) => str.trim());

const [N, M] = input[0].split(' ').map(Number);

const arr = [];

for (let i = 1; i <= N; i++) {
    arr.push(input[i].split('').map(Number));
}

// 채림 운니 짱...
class Queue {
    constructor() {
      this.queue = [];
      this.front = 0;
      this.rear = 0;
    }
    enqueue(value) {
      this.queue[this.rear++] = value;
    }
    dequeue() {
      const value = this.queue[this.front];
      delete this.queue[this.front];
      this.front += 1;
      return value;
    }
    isEmpty() {
      return this.rear === this.front;
    }
}

console.log(bfs(N, M, arr));

function bfs(N, M, arr){
    let queue = new Queue;
    let visited = Array.from(Array(N), () => Array.from(Array(M), () => [false, false])); // 방문 여부

    
    const dx = [-1, 0, 1, 0]; // 상 우 하 좌
    const dy = [0, 1, 0, -1];

    for(let i = 0; i < N; i++){
       for(let j = 0; j < M; j++){
            if(arr[i][j] === 0 && !visited[i][j]){
                visited[i][j][0] = true;

                queue.enqueue([i, j, 0, 0]);
                while(!queue.isEmpty()){
                    let [x, y, isBreak, length] = queue.dequeue();

                    if (i + 1 === N && j + 1 === M) return length;

                    for (let dir = 0; dir < 4; dir++){
                        let nx = x + dx[dir];
                        let ny = y + dy[dir];

                        if(nx < 0 || nx >= M || ny < 0 || ny >= N) continue;
                        if(visited[nx][ny]) continue;

                       
                        if(arr[nx][ny] === 1 && isBreak === 0 ){ // 벽을 부순 횟수가 0인 경우 벽을 만나면 벽을 부순다
                            arr[nx][ny][1] = arr[x][y][0] + 1;
                            queue.enqueue([nx, ny, 1, length + 1]);
                        }
                        else if(arr[nx][ny] === 0 && isBreak === 0){ // 벽 안 부숨, 벽 x
                            arr[nx][ny][0] =  arr[x][y][0] + 1;
                            queue.enqueue([nx, ny, 0, length + 1]);
                        }
                        else if(arr[nx][ny] === 0 && isBreak === 1){ // 벽 부숨, 벽 o
                            arr[nx][ny][1] =  arr[x][y][1] + 1
                            queue.enqueue([nx, ny, 1, length + 1]);
                        }
                        
                    }
                }
            }
        }
    }
    return -1; // 목적지에 도착하지 못한 경우
}