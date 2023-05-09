const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, W, L] = input[0].split(' ').map(Number);

const truck = input[1].split(' ').map(Number);

const getShortestTime = (N, W, L, truck) => {
  let totalTime = 0; // 총 걸리는 시간
  let queue = []; // 다리
  let sum = 0; // 현재 다리에 있는 차들의 무게

  for (let i = 0; i < N; i++) {
    while (true) {
      if (queue.length === W) {
        sum -= queue.shift();
      }
      if (sum + truck[i] <= L) break;
      queue.push(0)
      totalTime++;
    }
    queue.push(truck[i]);
    sum += truck[i];
    totalTime++;
  }
  totalTime += W; // 다리를 건너기 위해 추가로 걸린 시간
  return totalTime;
}

console.log(getShortestTime(N, W, L, truck));
