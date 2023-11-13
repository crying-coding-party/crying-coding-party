function calcDiff(apeach, ryan) {
  let ryanScore = 0;
  let apeachScore = 0;
  for (let i = 0; i < ryan.length; i++) {
    if (ryan[i] > apeach[i]) ryanScore += 10 - i;
    if (ryan[i] < apeach[i]) apeachScore += 10 - i;
  }

  return ryanScore - apeachScore;
}

function solution(n, info) {
  let maxDiff = 0;
  let answer = [-1];

  function shot(peachScore, ryanScore, count, curIndex) {
    //더 이상 화살을 쏠 수 없다면
    if (count === 0) {
      const diff = calcDiff(peachScore, ryanScore);
      if (diff > maxDiff) {
        answer = ryanScore;
        maxDiff = diff;
      }
      return;
    }

    //모든 포인트에 대해 계산을 했다면
    if (curIndex < 0) {
      const diff = calcDiff(peachScore, ryanScore);
      if (diff > maxDiff) {
        answer = ryanScore;
        maxDiff = diff;
      }
      return ryanScore;
    }

    for (let i = curIndex; i >= 0; i--) {
      if (peachScore[i] + 1 <= count) {
        const array = [...ryanScore];
        array[i] = peachScore[i] + 1; //라이언이 화살을 쏘았을 떄
        shot(peachScore, array, count - (peachScore[i] + 1), i - 1);
      }
    }
  }

  shot(info, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], n, 10);
  return answer;
}
