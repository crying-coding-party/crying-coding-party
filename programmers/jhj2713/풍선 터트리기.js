// 최대값을 고르고 해당 최대값과 인접한 두 수 중 최대값보다 작은 수가 있으면 최대값을 터뜨림 (더 큰 풍선 터뜨리기)
// 시간초과
function solution(a) {
  let answer = 0;

  a.forEach((last) => {
    const currentA = a.slice();
    let minBump = 1;
    while (currentA.length > 1) {
      let max = -Infinity,
        maxIndex = -1;
      for (let i = 0; i < currentA.length; i++) {
        if (currentA[i] !== last && max < currentA[i]) {
          max = currentA[i];
          maxIndex = i;
        }
      }

      if (
        (maxIndex !== 0 && currentA[maxIndex - 1] < currentA[maxIndex]) ||
        (maxIndex !== currentA.length - 1 && currentA[maxIndex + 1] < currentA[maxIndex])
      ) {
        // 더 큰 풍선 터뜨리기
        currentA.splice(maxIndex, 1);
      } else {
        // 더 큰 풍선만 인접해있는 경우
        if (minBump === 0) {
          break;
        }
        minBump -= 1;
        currentA.splice(maxIndex, 1);
      }
    }

    if (currentA.length === 1) {
      answer += 1;
    }
  });

  return answer;
}

// 왼쪽 최소값, 오른쪽 최소값을 구했을때 두 값보다 현재 선택된 값이 크면 터트리는거 불가능 (번호가 더 작은 풍선은 한 번만 터트릴 수 있기 때문에)
function solution(a) {
  let answer = 0;
  const leftMinArr = [];
  const rightMinArr = [];

  let min = Infinity;
  for (let i = 0; i < a.length; i++) {
    if (min > a[i]) {
      min = a[i];
    }
    leftMinArr[i] = min;
  }

  min = Infinity;
  for (let i = a.length - 1; i >= 0; i--) {
    if (min > a[i]) {
      min = a[i];
    }
    rightMinArr[i] = min;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] <= leftMinArr[i] || a[i] <= rightMinArr[i]) {
      answer += 1;
    }
  }

  return answer;
}
