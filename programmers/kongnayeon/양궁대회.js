function solution(n, info) {
  let max = 0; // 가장 큰 점수 차이
  let answer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  function findMax(apeach, ryan, shot, point, ryanInfo) {
    if (n < shot) return;

    // 10점까지 다 확인한 경우
    if (point > 10) {
      let diff = ryan - apeach;
      if (diff > max) {
        ryanInfo[10] = n - shot; // 0점 shot
        max = diff; // 최대 점수 차 갱신
        answer = ryanInfo;
      }
      return;
    }

    // 라이언이 이기는 경우
    if (n > shot) {
      let current = [...ryanInfo];
      current[10 - point] = info[10 - point] + 1; // 어피치보다 1발 더 쏘기
      findMax(
        apeach,
        ryan + point,
        shot + info[10 - point] + 1,
        point + 1,
        current
      );
    }
    // 어피치가 이기는 경우
    if (info[10 - point] > 0) {
      findMax(apeach + point, ryan, shot, point + 1, ryanInfo); // 라이언은 아예 쏘지 않음
    } else {
      // 둘 다 점수 x
      findMax(apeach, ryan, shot, point + 1, ryanInfo);
    }
  }

  findMax(0, 0, 0, 0, answer);

  return max === 0 ? [-1] : answer;
}
