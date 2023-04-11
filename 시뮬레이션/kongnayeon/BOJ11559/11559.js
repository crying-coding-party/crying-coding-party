const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let arr = [];

for (let i = 0; i < 12; i++) {
    const line = input.shift().split('');
    arr.push(line);
}

let explosions = 0;

const dx = [-1, 0, 1, 0]; // 상 우 하 좌
const dy = [0, 1, 0, -1];


// 뿌요 밑으로 내리기
const setPuyo = () => {
    for (let i = 0; i < 6; i++) {
        for (let j = 11; j >= 0; j--) {
            if (arr[j][i] === '.') {
                for (let k = j - 1; k >= 0; k--) {
                    if (arr[k][i] !== '.') {
                        arr[j][i] = arr[k][i];
                        arr[k][i] = '.';
                        break;
                    }
                }
            }
        }
    }
};


const explodePuyo = () => {
    let targets = [];
    let visited = Array.from(Array(12), () => Array(6).fill(false));
  
    for (let i = 11; i >= 0; i--) {
      for (let j = 5; j >= 0; j--) {
        if (arr[i][j] === '.' || visited[i][j]) continue;
  
        let queue = [[i, j]];
        visited[i][j] = true;
        let count = 0;

        while (queue.length) {
          let [x, y] = queue.shift();
  
          for (let k = 0; k < 4; k++) {
            let nx = x + dx[k];
            let ny = y + dy[k];
  
            if (nx < 0 || nx > 11 || ny < 0 || ny > 5) continue;
            if (visited[nx][ny] || arr[nx][ny] !== arr[x][y]) continue;

            count++;
            visited[nx][ny] = true;
            queue.push([nx, ny]);
            targets.push([nx, ny]);
          }
        }
  
        if (count > 2) {
            targets.push([i, j]);
        }
      }
    }
    if (targets.length === 0) return false;

    targets.forEach(([x, y]) => {
        arr[x][y] = '.';
    });

    setPuyo();
    explosions++;

    return true;
   
};

while (true) {
    const count = explodePuyo();
    if (count === 0) break;
    setPuyo();
    explosions++;
}
console.log(explosions);