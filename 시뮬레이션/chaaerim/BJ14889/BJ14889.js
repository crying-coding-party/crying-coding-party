const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

solution(input);
function solution([size, ...list]) {
  const n = Number(size);
  const numMap = list.map(i => i.split(' ').map(Number));

  const visited = new Array(n).fill(false);
  const array = new Array(n / 2).fill(0);
  const answer = [];
  back(0, 0);
  console.log(Math.min(...answer));
  function back(count, start) {
    if (count === n / 2) {
      const pair = [];
      for (let i = 0; i < visited.length; i++) {
        if (!visited[i]) {
          pair.push(i);
        }
      }
      //   2개씩 뽑아서 빼줘야함 ^^..

      const v = new Array(array.length).fill(false);
      const a = new Array(2).fill(0);
      const p = new Array(2).fill(0);
      let arraySum = 0;
      let pairSum = 0;

      binaryBack(0, a, p, v, array, pair, numMap);

      function binaryBack(c, a, p, v, array, pair, numMap) {
        if (c === 2) {
          //   console.log(a, 'aa', numMap[a[0]][a[1]]);
          arraySum += numMap[a[0]][a[1]];
          pairSum += numMap[p[0]][p[1]];
          return;
        }

        for (let i = 0; i < array.length; i++) {
          if (!v[i]) {
            a[c] = array[i];
            p[c] = pair[i];
            v[i] = true;
            binaryBack(c + 1, a, p, v, array, pair, numMap);
            v[i] = false;
          }
        }
      }
      //   console.log(arraySum, pairSum);
      answer.push(Math.abs(arraySum - pairSum));

      return;
    }

    for (let i = start; i < n; i++) {
      if (!visited[i]) {
        array[count] = i;
        visited[i] = true;
        back(count + 1, i + 1);
        visited[i] = false;
      }
    }
  }
}
