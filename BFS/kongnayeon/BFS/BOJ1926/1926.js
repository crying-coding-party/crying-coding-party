const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);

const arr = [];

for (let i = 1; i <= n; i++) {
    arr.push(input[i].split(' ').map(Number));
}

let painting = 0; // 그림의 수
let maxArea = 0; // 넓이가 가장 큰 그림
let visited = Array.from(Array(n), () => Array(m).fill(false)); // 방문 여부
let queue = [];

const dx = [-1, 0, 1, 0]; // 상 우 하 좌
const dy = [0, 1, 0, -1];



for(let i = 0; i < n; i++){
    arr[i].map((el, idx) => {
        if(!(arr[i][idx] === 0 || visited[i][idx])){ // 그림이 없거나 방문하지 않은 경우 제외
            painting++;
            visited[i][idx] = 1;
            queue.push([i, idx]);
            let area = 0;
            while(queue.length !== 0){
                area++;
                const [x, y] = queue.shift();
                for (let dir = 0; dir < 4; dir++){
                    let nx = x + dx[dir];
                    let ny = y + dy[dir];
                    if(nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
                    if(visited[nx][ny] || arr[nx][ny] !== 1) continue;
                    visited[nx][ny] = 1;
                    queue.push([nx, ny]);
                }
            }
            maxArea = Math.max(maxArea, area);
        }
    })
}

console.log(painting);
console.log(maxArea);