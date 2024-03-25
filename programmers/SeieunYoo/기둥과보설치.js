function solution(n, build_frame) {
  let answer = [];

  build_frame.forEach((build) => {
    const [x, y, frame, isInstall] = build;

    if (isInstall === 1) {
      if (buildFrame(answer, x, y, frame)) answer.push([x, y, frame]);
    } else {
      answer = deleteFrame(answer, x, y, frame);
    }
  });

  return answer.sort((a, b) =>
    a[0] === b[0] ? (a[1] === b[1] ? a[2] - b[2] : a[1] - b[1]) : a[0] - b[0]
  );
}

function buildFrame(answer, x, y, frame) {
  if (frame === 1) {
    // 보인 경우
    // 1. 보 왼쪽에 기둥이 오는 경우
    // 2. 보의 끝에 기둥이 오는 경우
    // 3. 양쪽에 보가 오는 경우
    if (answer.find(([nx, ny, fr]) => fr === 0 && nx === x && ny === y - 1))
      return true;
    if (answer.find(([nx, ny, fr]) => fr === 0 && nx === x + 1 && ny === y - 1))
      return true;
    if (
      answer.find(([nx, ny, fr]) => fr === 1 && nx === x - 1 && ny === y) &&
      answer.find(([nx, ny, fr]) => fr === 1 && nx === x + 1 && ny === y)
    )
      return true;
    return false;
  } else {
    // 기둥인 경우
    // 1. 바닥인 경우
    // 2. 밑에 기둥인 경우
    // 3. 기둥 왼쪽이 보인 경우
    // 4. 기둥 오른쪽이 보인 경우

    if (y === 0) return true;
    if (answer.find(([nx, ny, fr]) => fr === 0 && nx === x && ny === y - 1))
      return true;
    if (answer.find(([nx, ny, fr]) => fr === 1 && nx === x - 1 && ny === y))
      return true;
    if (answer.find(([nx, ny, fr]) => fr === 1 && nx === x && ny === y))
      return true;

    return false;
  }
}

function deleteFrame(answer, x, y, frame) {
  const filtered = answer.filter(
    ([a, b, fr]) => !(a === x && b === y && fr === frame)
  );

  // 제거된 상태에서 프레임들이 기둥과 보 조건에 만족하는지 체크
  for (let frame of filtered) {
    const [nx, ny, fr] = frame;
    if (!buildFrame(filtered, nx, ny, fr)) return answer;
  }

  return filtered;
}
