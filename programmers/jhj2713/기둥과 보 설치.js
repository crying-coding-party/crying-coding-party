function solution(n, build_frame) {
  const frames = [];

  build_frame.forEach((build) => {
    const [x, y, a, b] = build;
    if (b === 0) {
      // 삭제
      deleteFrame(x, y, a, frames);
    } else {
      // 설치
      if (addFrame(x, y, a, frames)) {
        frames.push([x, y, a]);
      }
    }
  });

  return frames.sort(sortFrames);
}

function addFrame(x, y, a, frames) {
  if (a === 0) {
    // 기둥
    /**
     * 1. 바닥에 있는 경우
     * 2. 아래에 기둥이 있는 경우
     * 3. 왼쪽에 보가 있는 경우
     * 4. 오른쪽에 보가 있는 경우
     */
    if (
      y === 0 ||
      frames.find(([_x, _y, _a]) => _x === x && _y === y - 1 && _a === 0) ||
      frames.find(([_x, _y, _a]) => _x === x - 1 && _y === y && _a === 1) ||
      frames.find(([_x, _y, _a]) => _x === x && _y === y && _a === 1)
    ) {
      return true;
    }
  } else {
    // 보
    /**
     * 1. 왼쪽에 기둥이 있는 경우
     * 2. 오른쪽에 기둥이 있는 경우
     * 3. 양쪽 끝에 보가 있는 경우
     */
    if (
      frames.find(([_x, _y, _a]) => _x === x && _y === y - 1 && _a === 0) ||
      frames.find(([_x, _y, _a]) => _x === x + 1 && _y === y - 1 && _a === 0) ||
      (frames.find(([_x, _y, _a]) => _x === x - 1 && _y === y && _a === 1) && frames.find(([_x, _y, _a]) => _x === x + 1 && _y === y && _a === 1))
    ) {
      return true;
    }
  }

  return false;
}

function deleteFrame(x, y, a, frames) {
  const copyFrames = frames.slice();
  const deleteIndex = copyFrames.findIndex(([_x, _y, _a]) => _x === x && _y === y && _a === a);
  copyFrames.splice(deleteIndex, 1);

  if (copyFrames.every(([_x, _y, _a]) => addFrame(_x, _y, _a, copyFrames))) {
    frames.splice(deleteIndex, 1);
  }
}

function sortFrames(a, b) {
  const [aX, aY, aA] = a;
  const [bX, bY, bA] = b;

  if (aX === bX) {
    if (aY === bY) {
      return aA - bA;
    }
    return aY - bY;
  }
  return aX - bX;
}
