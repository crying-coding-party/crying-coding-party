const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

solution(input);

function solution([n, ...list]) {
  const [num, size] = n.split(' ').map(Number);
  const numberList = list[0].split(' ').map(Number);
  const numMap = new Map();
  // 숫자, 빈도, 처음 나온 인덱스 저장해야겠다...
  for (let i = 0; i < numberList.length; i++) {
    if (numMap.has(numberList[i])) {
      const temp = numMap.get(numberList[i]);
      const newNum = temp[0] + 1;
      const newIdx = temp[1];
      numMap.set(numberList[i], [newNum, newIdx]);
    } else {
      numMap.set(numberList[i], [1, i]);
    }
  }

  const mapArr = [...numMap].map(i => i.flat(1));
  mapArr.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[2] - b[2];
    } else {
      return b[1] - a[1];
    }
  });
  const ans = [];
  for (let i = 0; i < mapArr.length; i++) {
    for (let j = 0; j < mapArr[i][1]; j++) {
      ans.push(mapArr[i][0]);
    }
  }
  console.log(ans.join(' '));
}
