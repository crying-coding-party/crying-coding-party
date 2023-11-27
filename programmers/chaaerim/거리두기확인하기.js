const answer = [];
const DR = [1, -1, 0, 0];
const DC = [0, 0, 1, -1];

const DD = [1, -1, 1, -1];
const DI = [1, -1, -1, 1];

// 5, 11, 16

const TR = [2, -2, 0, 0];
const TC = [0, 0, 2, -2];

function solution(places) {
  for (let i = 0; i < places.length; i++) {
    const placeMap = places[i].map(el => el.split(''));
    main(placeMap);
  }
  //   if(answer.length===0){
  //     answer.push()
  //   }
  //   console.log(answer);
  return answer;
}

function main(placeMap) {
  //   console.log(placeMap);
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (placeMap[i][j] === 'P') {
        const res = findPeer(placeMap, i, j);
        if (res === true) {
          return;
        }
      }
    }
  }
  answer.push(1);
  return;
}
function findPeer(placeMap, col, row) {
  //   console.log(placeMap, col, row);
  //   위아래양옆에 p가 있는 경우
  for (let i = 0; i < DR.length; i++) {
    const nextC = col + DC[i];
    const nextR = row + DR[i];

    if (nextC < 0 || nextC >= 5 || nextR < 0 || nextR >= 5) {
      continue;
    }
    if (placeMap[nextC][nextR] === 'P') {
      //   console.log('hi');
      console.log(nextC, nextR);
      answer.push(0);
      return true;
    }
  }

  for (let i = 0; i < DD.length; i++) {
    const nextC = col + TC[i];
    const nextR = row + TR[i];

    const tableC = col + DC[i];
    const tableR = row + DR[i];

    if (nextC < 0 || nextC >= 5 || nextR < 0 || nextR >= 5) {
      continue;
    }

    if (placeMap[nextC][nextR] === 'P' && placeMap[tableC][tableR] !== 'X') {
      //   console.log(nextC, nextR, tableC, tableR);

      answer.push(0);
      return true;
    }
  }

  for (let i = 0; i < DD.length; i++) {
    const nextC = col + DI[i];
    const nextR = row + DD[i];

    if (nextC < 0 || nextC >= 5 || nextR < 0 || nextR >= 5) {
      continue;
    }
    if (placeMap[nextC][nextR] === 'P' && (placeMap[col][nextR] === 'O' || placeMap[nextC][row] === 'O')) {
      answer.push(0);
      return true;
    }
  }
  return;
}
