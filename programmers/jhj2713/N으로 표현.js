function solution(N, number) {
  const set = new Array(8);

  for (let i = 0; i < 8; i++) {
    set[i] = new Set();
    set[i].add(parseInt(`${N}`.repeat(i + 1))); // 사용한 N의 개수가 i + 1인 값들이 set[i]에 존재

    for (let j = 0; j < i; j++) {
      for (const jVal of set[j]) {
        for (const ijVal of set[i - j - 1]) {
          // 사용한 N의 개수가 j + 1인 값 + 사용한 N의 개수가 i - j인 값 -> 사용한 N의 개수가 i + 1인 값
          set[i].add(jVal + ijVal);
          set[i].add(jVal - ijVal);
          set[i].add(jVal * ijVal);
          set[i].add(Math.floor(jVal / ijVal));
        }
      }
    }

    if (set[i].has(number)) {
      return i + 1;
    }
  }

  return -1;
}
