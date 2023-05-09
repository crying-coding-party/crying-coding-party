const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

solution(input);

function solution([one, two, three, four, n, ...list]) {
  let chainOne = one.split('').map(Number);
  let chainTwo = two.split('').map(Number);
  let chainThree = three.split('').map(Number);
  let chainFour = four.split('').map(Number);
  const num = Number(n);
  const rotation = list.map(i => i.split(' ').map(Number));

  let count = 0;

  let newChainOne = [...chainOne];
  let newChainTwo = [...chainTwo];
  let newChainThree = [...chainThree];
  let newChainFour = [...chainFour];
  for (let i = 0; i < num; i++) {
    let howToRotate = rotation[i][1];

    if (rotation[i][0] === 1) {
      newChainOne = spin(chainOne, howToRotate);
      if (chainOne[2] !== chainTwo[6]) {
        // chainTwo 돌리기
        howToRotate = -howToRotate;
        newChainTwo = spin(chainTwo, howToRotate);
        if (chainTwo[2] !== chainThree[6]) {
          // chainThree 돌리기
          howToRotate = -howToRotate;
          newChainThree = spin(chainThree, howToRotate);
          if (chainThree[2] !== chainFour[6]) {
            howToRotate = -howToRotate;
            newChainFour = spin(chainFour, howToRotate);
          }
        }
      }
    }
    if (rotation[i][0] === 2) {
      // chain2는 돌려야지
      newChainTwo = spin(chainTwo, howToRotate);
      if (chainOne[2] !== chainTwo[6]) {
        // chainOne 돌리면 됨.
        howToRotate = -howToRotate;
        newChainOne = spin(chainOne, howToRotate);
        howToRotate = -howToRotate;
      }
      if (chainTwo[2] !== chainThree[6]) {
        // chainThree 돌리면 됨.
        howToRotate = -howToRotate;
        newChainThree = spin(chainThree, howToRotate);
        if (chainThree[2] !== chainFour[6]) {
          // chain4 돌리면 됨
          howToRotate = -howToRotate;
          newChainFour = spin(chainFour, howToRotate);
        }
      }
    }
    if (rotation[i][0] === 3) {
      // chain3는 돌려야지
      newChainThree = spin(chainThree, howToRotate);
      if (chainThree[2] !== chainFour[6]) {
        // chainFour 돌리면 됨
        // 맨 끝에서 돌리지 않고 중간부터 톱니가 돌아가는 경우 양 옆이 해당 톱니가 돌아가는 것과 반대로 돌아가므로 이거 고려해줘야 함..
        howToRotate = -howToRotate;
        newChainFour = spin(chainFour, howToRotate);
        howToRotate = -howToRotate;
      }
      if (chainThree[6] !== chainTwo[2]) {
        // chain2 돌리고
        howToRotate = -howToRotate;
        newChainTwo = spin(chainTwo, howToRotate);
        if (chainTwo[6] !== chainOne[2]) {
          // chainOne 돌리면 됨
          howToRotate = -howToRotate;
          newChainOne = spin(chainOne, howToRotate);
        }
      }
    }
    if (rotation[i][0] === 4) {
      newChainFour = spin(chainFour, howToRotate);

      if (chainFour[6] !== chainThree[2]) {
        // chain3돌리기
        howToRotate = -howToRotate;
        newChainThree = spin(chainThree, howToRotate);
        if (chainThree[6] !== chainTwo[2]) {
          // chain2 돌리기
          howToRotate = -howToRotate;
          newChainTwo = spin(chainTwo, howToRotate);
          if (chainTwo[6] !== chainOne[2]) {
            // chain1 돌리기
            howToRotate = -howToRotate;
            newChainOne = spin(chainOne, howToRotate);
          }
        }
      }
    }
    chainOne = [...newChainOne];
    chainTwo = [...newChainTwo];
    chainThree = [...newChainThree];
    chainFour = [...newChainFour];
    // console.log(i, '!!!!!!!');
    // console.log(chainOne, 'chainOne');
    // console.log(chainTwo, 'chain2');
    // console.log(chainThree, '333');
    // console.log(chainFour, '444');
  }

  if (chainOne[0] === 1) {
    count += 1;
  }
  if (chainTwo[0] === 1) {
    count += 2;
  }
  if (chainThree[0] === 1) {
    count += 4;
  }
  if (chainFour[0] === 1) {
    count += 8;
  }
  console.log(count);
}

function spin(chain, howToRotate) {
  const temp = [...chain];
  if (howToRotate === 1) {
    temp[0] = chain[7];
    temp.forEach((el, i) => {
      if (i < 7) {
        // console.log(i);
        temp[i + 1] = chain[i];
      }
    });
  }
  if (howToRotate === -1) {
    temp[7] = chain[0];
    temp.forEach((el, i) => {
      if (i < 7) {
        temp[i] = chain[i + 1];
      }
    });
  }
  //   console.log(temp, 'temp', howToRotate);
  return temp;
}
