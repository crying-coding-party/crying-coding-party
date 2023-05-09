const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

solution(input);

function solution([n, list]) {
  const [num, length, weight] = n.split(' ').map(Number);
  const trucks = list.split(' ').map(Number);
  //  현재 다리 위에 달리고 있는 트럭을 배열에 기록해줘야 하나...?
  let sec = 0;
  let sum = 0;
  const passing = [];

  //   대기 트럭 && 건너고 있는 트럭이 모두 빠질 때까지
  while (trucks.length !== 0 || passing.length !== 0) {
    // 다음 트럭 올릴 수 있고 건너고 있는 트럭 개수가 다리 길이보다 작으면
    if (weight >= sum + trucks[0] && passing.length <= length) {
      const truck = trucks.shift();
      sum += truck;
      passing.push([truck, sec + length]);
      sec++;
    } else {
      // 트럭이 더 이상 못올라가는 경우
      const [truck, passedSec] = passing.shift();
      //   다리에 트럭이 들어갈 때만 초가 증가하기 때문에 교체 필요
      if (sec < passedSec) {
        sec = passedSec;
      }
      // 트럭 내보내기
      sum -= truck;
    }
  }

  console.log(sec + 1);
}
