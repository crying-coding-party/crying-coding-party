function solution(key, lock) {
  const keyLength = key.length;
  const lockLength = lock.length;

  for (let c = 0; c < 4; c++) {
    // 키를 시계 방향으로 돌리기
    const rotatedKey = rotateKey(c);
    let tmpLock = initLock();

    // key가 겹칠 수 있는 영역까지 lock을 확장해서 key를 맞춰보기
    for (let r = 0; r < lockLength + keyLength - 1; r++) {
      for (let c = 0; c < lockLength + keyLength - 1; c++) {
        // key가 lock 상에서 시작되는 row, col을 바꿔가면서 확인
        tmpLock = initLock();
        for (let i = 0; i < keyLength; i++) {
          for (let j = 0; j < keyLength; j++) {
            tmpLock[r + i][c + j] += rotatedKey[i][j];
          }
        }

        let isMatch = true;
        for (let i = 0; i < lockLength; i++) {
          for (let j = 0; j < lockLength; j++) {
            if (tmpLock[i + keyLength - 1][j + keyLength - 1] !== 1) {
              // 자물쇠 영역이 모두 1이면 맞는 키인 것
              isMatch = false;
              break;
            }
          }
        }
        if (isMatch) {
          return true;
        }
      }
    }
  }

  return false;

  function rotateKey(count) {
    const rotatedKey = Array.from(new Array(keyLength), () => new Array(keyLength).fill(0));
    const tmpKey = Array.from(new Array(keyLength), () => new Array(keyLength).fill(0));
    for (let i = 0; i < keyLength; i++) {
      for (let j = 0; j < keyLength; j++) {
        tmpKey[i][j] = key[i][j];
      }
    }

    for (let c = 0; c < count; c++) {
      for (let i = 0; i < keyLength; i++) {
        for (let j = 0; j < keyLength; j++) {
          rotatedKey[i][j] = tmpKey[keyLength - j - 1][i];
        }
      }
      for (let i = 0; i < keyLength; i++) {
        for (let j = 0; j < keyLength; j++) {
          tmpKey[i][j] = rotatedKey[i][j];
        }
      }
    }
    return tmpKey;
  }
  function initLock() {
    const tmpLock = Array.from(new Array(lockLength + (keyLength - 1) * 2), () => new Array(lockLength + (keyLength - 1) * 2).fill(0));
    for (let i = 0; i < lockLength; i++) {
      for (let j = 0; j < lockLength; j++) {
        tmpLock[i + keyLength - 1][j + keyLength - 1] = lock[i][j];
      }
    }
    return tmpLock;
  }
}

// 시계 방향으로 돌리면서 해당 key를 첫 번째 칼럼에서부터 맞추면서 (1을 더하면서) 맞는 키인지 확인
