function solution(n, info) {
  function dfs(infoIndex, lionArrowArr, arrowCount, lionSum, apeachSum) {
    // 더 이상 화살을 쏠 수 없는 경우 종료
    if (arrowCount === 0 || infoIndex === info.length) {
      let lion = 0,
        apeach = 0,
        lionCount = 0;
      for (let i = 0; i < 11; i++) {
        if (info[i] === 0 && lionArrowArr[i] === 0) {
          continue;
        }
        if (info[i] < lionArrowArr[i]) {
          lionCount += lionArrowArr[i];
          lion += 10 - i;
        } else {
          apeach += 10 - i;
        }
      }
      return [lion, apeach, [...lionArrowArr], n - lionCount];
    }

    let currentLionSum = 0,
      currentApeachSum = 0,
      lionArr = [...lionArrowArr],
      remainArrow = arrowCount;

    // 라이언이 쏠 화살이 있는 경우
    if (info[infoIndex] < arrowCount) {
      const lionCurrentArrow = info[infoIndex] + 1;
      const includeArr = [...lionArrowArr];
      includeArr[infoIndex] = lionCurrentArrow;
      // 현재 index 점수를 라이언이 가져가는 경우
      const [includeLionSum, includeApeachSum, includeResultArr, includeRemainArrow] = dfs(
        infoIndex + 1,
        includeArr,
        arrowCount - lionCurrentArrow,
        lionSum + (10 - infoIndex),
        apeachSum
      );

      // 현재 index 점수를 라이언이 가져가지 않는 경우
      const apeachArrow = info[infoIndex] !== 0 ? 10 - infoIndex : 0;
      const [notIncludeLionSum, notIncludeApeachSum, notIncludeResultArr, notIncludeRemainArrow] = dfs(
        infoIndex + 1,
        [...lionArrowArr],
        arrowCount,
        lionSum,
        apeachSum + apeachArrow
      );

      // 라이언이 가장 큰 점수 차이로 우승할 수 있는 방법이 여러 가지 일 경우
      if (includeLionSum - includeApeachSum === notIncludeLionSum - notIncludeApeachSum) {
        // 가장 낮은 점수를 많이 맞힌 경우를 return
        let includeMinTarget = 11,
          notIncludeMinTarget = 11;
        for (let i = 10; i >= 0; i--) {
          if (includeResultArr[i] !== 0) {
            includeMinTarget = i;
            break;
          }
        }
        for (let i = 10; i >= 0; i--) {
          if (notIncludeResultArr[i] !== 0) {
            notIncludeMinTarget = i;
            break;
          }
        }

        if (includeMinTarget < notIncludeMinTarget) {
          currentLionSum = notIncludeLionSum;
          currentApeachSum = notIncludeApeachSum;
          remainArrow = notIncludeRemainArrow;
          lionArr = [...notIncludeResultArr];
        } else {
          currentLionSum = includeLionSum;
          currentApeachSum = includeApeachSum;
          remainArrow = includeRemainArrow;
          lionArr = [...includeResultArr];
        }
      } else if (includeLionSum - includeApeachSum < notIncludeLionSum - notIncludeApeachSum) {
        currentLionSum = notIncludeLionSum;
        currentApeachSum = notIncludeApeachSum;
        remainArrow = notIncludeRemainArrow;
        lionArr = [...notIncludeResultArr];
      } else {
        currentLionSum = includeLionSum;
        currentApeachSum = includeApeachSum;
        remainArrow = includeRemainArrow;
        lionArr = [...includeResultArr];
      }
    } else {
      // 라이언이 쏠 화살이 없는 경우
      const apeachArrow = info[infoIndex] !== 0 ? 10 - infoIndex : 0;
      const [notIncludeLionSum, notIncludeApeachSum, notIncludeResultArr, notIncludeRemainArrow] = dfs(
        infoIndex + 1,
        [...lionArrowArr],
        arrowCount,
        lionSum,
        apeachSum + apeachArrow
      );
      currentLionSum = notIncludeLionSum;
      currentApeachSum = notIncludeApeachSum;
      remainArrow = notIncludeRemainArrow;
      lionArr = [...notIncludeResultArr];
    }
    return [currentLionSum, currentApeachSum, lionArr, remainArrow];
  }

  // 라이언이 가장 큰 점수 차이로 우승할 수 있는 방법이 여러 가지 일 경우, 가장 낮은 점수를 더 많이 맞힌 경우를 return 해주세요.

  const [lion, apeach, answer, remainCount] = dfs(0, new Array(11).fill(0), n, 0, 0);

  if (lion <= apeach) {
    return [-1];
  }

  if (remainCount > 0) {
    // 화살이 남은 경우 0점에 모두 추가
    answer[10] += remainCount;
  }

  return answer;
}

// 해당 단계를 이기고 들어갔을때, 지고 들어갔을때 각각 dfs
