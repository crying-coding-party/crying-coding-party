/**
 * @description 응시자의 맨해튼 거리 내의 좌표들을 dfs해서 거리 내에 또다른 응시자가 있는지 확인하는 풀이
 */
function solution(places) {
  // 모든 응시자의 좌표를 저장
  // 응시자 좌표를 2차원 배열로 순회하면서 거리두기를 지키는지 확인

  const answer = [];
  places.forEach((place) => {
    const placeCoordinates = place.map((p) => p.split(""));
    let visited = placeCoordinates.map((p) => p.map(() => false));
    let isPass = true;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (placeCoordinates[i][j] === "P") {
          // 응시자 자리인 경우
          // 순회를 위한 초기화
          visited = placeCoordinates.map((p) => p.map(() => false));
          visited[i][j] = true;
          isPass = true;

          dfs(i, j, 0);
          if (!isPass) {
            break;
          }
        }
      }
      if (!isPass) {
        break;
      }
    }

    answer.push(isPass ? 1 : 0);

    function dfs(i, j, count) {
      if (count === 2) {
        return;
      }
      if (i !== 0) {
        if (placeCoordinates[i - 1][j] === "P" && !visited[i - 1][j]) {
          isPass = false;
          return;
        }
        if (placeCoordinates[i - 1][j] !== "X") {
          dfs(i - 1, j, count + 1);
        }
      }
      if (j !== 0) {
        if (placeCoordinates[i][j - 1] === "P" && !visited[i][j - 1]) {
          isPass = false;
          return;
        }
        if (placeCoordinates[i][j - 1] !== "X") {
          dfs(i, j - 1, count + 1);
        }
      }
      if (i !== 4) {
        if (placeCoordinates[i + 1][j] === "P" && !visited[i + 1][j]) {
          isPass = false;
          return;
        }
        if (placeCoordinates[i + 1][j] !== "X") {
          dfs(i + 1, j, count + 1);
        }
      }
      if (j !== 4) {
        if (placeCoordinates[i][j + 1] === "P" && !visited[i][j + 1]) {
          isPass = false;
          return;
        }
        if (placeCoordinates[i][j + 1] !== "X") {
          dfs(i, j + 1, count + 1);
        }
      }
    }
  });

  return answer;
}

function getManhattanLength(a, b) {
  const [aPartY, aPartX] = a;
  const [bPartY, bPartX] = b;

  return Math.abs(aPartY - bPartY) + Math.abs(aPartX - bPartX);
}

/**
 * @description 그냥... 모든 참가자 사이 맨해튼 거리 구한 풀이
 */
function solution(places) {
  // 모든 응시자의 좌표를 저장
  // 응시자 좌표를 2차원 배열로 순회하면서 거리두기를 지키는지 확인

  const answer = [];
  places.forEach((place) => {
    const participantsCoordinates = [];
    const placeCoordinates = place.map((p) => p.split(""));

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (placeCoordinates[i][j] === "P") {
          // 응시자 자리인 경우
          participantsCoordinates.push([i, j]);
        }
      }
    }

    const participantsCount = participantsCoordinates.length;
    let canPass = true;

    // 참가자 사이 맨해튼 거리를 모두 확인
    for (let i = 0; i < participantsCount; i++) {
      for (let j = i + 1; j < participantsCount; j++) {
        const aPart = participantsCoordinates[i];
        const bPart = participantsCoordinates[j];

        const manhattanLength = getManhattanLength(aPart, bPart);

        if (manhattanLength > 2) {
          continue;
        }

        if (!hasPartition(placeCoordinates, aPart, bPart)) {
          canPass = false;
          break;
        }
      }
    }

    answer.push(canPass ? 1 : 0);
  });

  return answer;
}

function getManhattanLength(a, b) {
  const [aPartY, aPartX] = a;
  const [bPartY, bPartX] = b;

  return Math.abs(aPartY - bPartY) + Math.abs(aPartX - bPartX);
}

function hasPartition(coordinates, a, b) {
  // a와 b 사이에 파티션이 있는지 여부 반환
  const [aPartY, aPartX] = a;
  const [bPartY, bPartX] = b;

  if (aPartY === bPartY) {
    if (Math.abs(aPartX - bPartX) === 1) {
      // 바로 옆자리면 파티션 없음
      return false;
    }
    if (aPartX > bPartX) {
      return coordinates[aPartY][aPartX - 1] === "X";
    } else {
      return coordinates[aPartY][bPartX - 1] === "X";
    }
  } else if (aPartX === bPartX) {
    if (Math.abs(aPartY - bPartY) === 1) {
      // 바로 옆자리면 파티션 없음
      return false;
    }
    if (aPartY > bPartY) {
      return coordinates[aPartY - 1][aPartX] === "X";
    } else {
      return coordinates[bPartY - 1][aPartX] === "X";
    }
  }

  return coordinates[bPartY][aPartX] === "X" && coordinates[aPartY][bPartX] === "X";
}
