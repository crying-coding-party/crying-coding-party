const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input3.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, L] = input.shift().split(' ').map(Number);
const map = input.map((row) => row.split(' ').map(Number));

let answer = 0;
let count = 0;

// function solution(map) {
//   for (let j = 0; j < N; j++) {
//     let isGo = false;
//     let bridge = Array(N).fill(false);
//     let isBridges = Array(N - 1).fill(false);
//     for (let i = 0; i < N - 1; i++) {
//       if (map[j][i] == map[j][i + 1]) isBridges[i] = true;
//       else if (Math.abs(map[j][i] - map[j][i + 1]) > 1) isBridges[i] = false;
//       else {
//         const min = map[j][i]> map[j][i + 1] ? i : i+1;
//         const isBridge = checkAllAdjacentNumbers(map[j],min, bridge);
//         if (isBridge) {
//         isBridges[i] = true;
//         } else {
//         isBridges[i] = false;
//         }
//       }
//       if (i == N - 2 && !isBridges.includes(false)) {
//         //console.log(j, i, !isBridges.includes(false));
//         answer = answer + 1;
//       }
//     }
//   }
// }

// function checkAllAdjacentNumbers(arr, index, bridge) {
//   let count = 0;
//   for (let i = index - L; i <= index + L; i++) {
//     if (i > 0 && i < arr.length && i !== index) {
//       if (Math.abs(arr[index] - arr[i]) === 1 && !bridge[i]) {
//         //console.log(index,i,arr[index] , arr[i]);
//         count++;
//         bridge[i] = true;
//       }

//     }
//     bridge[index] = true;
//     //console.log(index,i,arr[index] , arr[i],bridge);
//   }

//   //console.log(arr, count, L);
//   return count >= L;
// }

// function transpose(arr) {
//     return arr[0].map((_, i) => arr.map(row => row[i]));
//   }

// solution(map);
// console.log(answer);
// const map2 = transpose(map);
// solution(map2);
// console.log(answer);

// 길 검사 함수
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
