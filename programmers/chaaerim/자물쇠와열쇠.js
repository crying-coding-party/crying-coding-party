function solution(key, lock) {
  let result = false;
  let rotatedKey = [...key];

  //   키 90도씩 네 바퀴 돌려야함
  for (let i = 0; i < 4; i++) {
    rotate(rotatedKey);
    for (let k = -key.length; k < lock.length; k++) {
      for (let j = -key.length; j < lock.length; j++) {
        result = result || isUnlocked(k, j, rotatedKey, lock);
      }
    }
  }

  return result;
}

function isUnlocked(r, c, rotatedKey, lock) {
  let temp = JSON.parse(JSON.stringify(lock));
  for (let i = 0; i < rotatedKey.length; i++) {
    for (let j = 0; j < rotatedKey.length; j++) {
      if (c + j < 0 || r + i < 0 || r + i >= temp.length || c + j >= temp.length) continue;
      //    key 자리가 이미 1로 채워져 있으면 못 엶.
      else if (temp[r + i][c + j] == 1 && rotatedKey[i][j] == 1) return false;
      //   비워져 있으면 1로 채우기
      else if (rotatedKey[i][j] == 1) temp[r + i][c + j] = 1;
    }
  }

  for (let i = 0; i < temp.length; i++) {
    for (let j = 0; j < temp.length; j++) {
      if (temp[i][j] === 0) return false;
    }
  }

  return true;
}

function rotate(rotatedKey) {
  let temp = JSON.parse(JSON.stringify(rotatedKey));

  for (let i = 0; i < rotatedKey.length; i++) {
    for (let j = 0; j < rotatedKey.length; j++) {
      rotatedKey[i][j] = temp[rotatedKey.length - j - 1][i];
    }
  }
}
