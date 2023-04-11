const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let arr = [];

for (let i = 0; i < 12; i++) {
    const line = input.shift().split(' ');
    arr.push(line);
}

let isExploded = false;
let explosion = 0;


const dx = [-1, 0, 1, 0]; // 상 우 하 좌
const dy = [0, 1, 0, -1];

// 뿌요가 하나라도 있는지 검사
const hasPuyo = () => arr.flat().some((elem) => elem !== '.');

// 밑으로 내려 주기
const setPuyo = () => {
    for (let i = 0; i < 6; i++) {
        for (let j = 11, k = 11; j >= 0 && k >= 0;) {
            if (arr[j][i] === '.') {
                j--;
            } else if (arr[k][i] !== '.') {
                k--;
            } else {
                [arr[k][i], arr[j][i]] = [arr[j][i], arr[k][i]];
                j--;
                k--;
            }
        }
    }
};


const explodePuyo = () => {
    let targets = [];
    isExploded = false;
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
  
        if (count > 3) {
        isExploded = true;
        }
      }
      targets.forEach(([x, y]) => {
        arr[x][y] = '.';
      });
    
      return targets.length;
    }

    // while (targets.length) {
    //     let [x, y] = targets.shift();
    //     arr[x][y] = '.';

    //     for (let k = 0; k < 4; k++) {
    //       let nx = x + dx[k];
    //       let ny = y + dy[k];

    //       if (nx < 0 || nx > 11 || ny < 0 || ny > 5) continue;
    //       if (visited[nx][ny] || arr[nx][ny] !== arr[x][y]) continue;

    //       arr[nx][ny] = '.';
    //     }

    //     explosion++;
    // }
   
};

  

// 뿌요가 하나 이상 있는 경우에만 루프 실행
if (hasPuyo()) {
    while (true) {
        if (explodePuyo()) {
            explosion += explodePuyo;
            setPuyo();
        } else {
            break;
        }
    }
}

console.log(explosion);