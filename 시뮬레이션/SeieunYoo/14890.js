const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input3.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, L] = input.shift().split(' ').map(Number);
const map = input.map((row) => row.split(' ').map(Number));

let count = 0;

function solution(array) {
  let beforeHeight = array[0];
  let beforeBridge = 1;
  const bridge = Array(N).fill(false);

  for (let i = 1; i < N; i++) {
    const currentHeight = array[i];
    const diff = beforeHeight - currentHeight;

    if (Math.abs(diff) > 1) {
      return false;
    }

    // 오르막길인 경우
    if (diff === -1) {
      if (beforeBridge < L) {
        return false;
      }
      for (let j = i - 1; j > i - 1 - L; j--) {
        if (bridge[j] || array[j] !== beforeHeight) {
          return false;
        }
        bridge[j] = true;
      }
      beforeBridge = 0;
    }

    // 내리막길인 경우
    if (diff === 1) {
      if (i + L > N) {
        return false;
      }
      for (let j = i; j < i + L; j++) {
        if (bridge[j] || array[j] !== currentHeight) {
          return false;
        }
        bridge[j] = true;
      }
      beforeBridge = L;
      i = i + L - 1;
    }

    beforeHeight = currentHeight;
    beforeBridge++;
  }

  return true;
}

for (let i = 0; i < N; i++) {
  if (solution(map[i])) {
    count++;
  }
}

const map2 = map[0].map((_, i) => map.map((row) => row[i]));

for (let i = 0; i < N; i++) {
  if (solution(map2[i])) {
    count++;
  }
}

console.log(count);
