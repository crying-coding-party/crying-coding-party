function solution(relation) {
  const colLength = relation[0].length;
  const selectedColumns = [];
  const uniqKeys = [];

  dfs(0, selectedColumns);

  function dfs(idx, selectedColumns) {
    if (selectedColumns.length !== 0 && isUniqueKey(selectedColumns)) {
      uniqKeys.push([...selectedColumns]);
      return;
    }
    if (idx === colLength) {
      return;
    }

    dfs(idx + 1, [...selectedColumns, idx]);
    dfs(idx + 1, [...selectedColumns]);
  }

  // 유일성을 만족하는지 확인
  function isUniqueKey(selectedColumns) {
    const dict = {};

    return relation.every((rel) => {
      const selectedColumn = rel.filter((_, idx) => selectedColumns.includes(idx));
      if (dict[JSON.stringify(selectedColumn)]) {
        return false;
      }
      dict[JSON.stringify(selectedColumn)] = 1;
      return true;
    });
  }

  // 최소성을 만족하는지 확인
  const candidateKeys = [];
  uniqKeys.sort((a, b) => a.length - b.length);
  uniqKeys.forEach((uniqKeys) => {
    let isMinimal = true;
    for (const candKey of candidateKeys) {
      let matchKeyCount = 0;
      for (const key of uniqKeys) {
        if (candKey.includes(key)) {
          matchKeyCount += 1;
        }
      }
      if (candKey.length === matchKeyCount) {
        isMinimal = false;
        break;
      }
    }
    if (isMinimal) {
      candidateKeys.push(uniqKeys);
    }
  });

  return candidateKeys.length;
}
