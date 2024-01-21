solution([
  ['100', 'ryan', 'music', '2'],
  ['200', 'apeach', 'math', '2'],
  ['300', 'tube', 'computer', '3'],
  ['400', 'con', 'computer', '4'],
  ['500', 'muzi', 'music', '3'],
  ['600', 'apeach', 'music', '2'],
]);

function solution(relation) {
  let ans = [];

  relation.forEach(el => el.forEach((_, idx) => {}));
  for (let i = 0; i < 1; i++) {
    for (let j = 0; j < relation[0].length; j++) {
      const array = new Array(j + 1).fill(0);
      const visited = new Array(relation[0].length).fill(false);
      back(relation[i], j + 1, 0, 0, array, visited, ans);
    }
  }
  //   console.log(ans);
  let count = 0;
  let num = 0;
  const skip = [];
  while (count < ans.length) {
    const col = ans[count].split('');
    if (skip.filter(item => item.every(v => col.includes(v))).length !== 0) {
      count++;
      continue;
    }
    const key = relation.flatMap(val => col.map(item => val[item]).join(''));
    if ([...new Set(key)].length === relation.length) {
      skip.push(col);
      num++;
    }
    count++;
  }
  console.log(num);
  return num;
}

function back(list, endNum, n, start, array, visited, ans) {
  //   console.log(list, endNum, array, visited);

  if (endNum === n) {
    ans.push(array.join(''));
    return;
  }

  for (let i = start; i < list.length; i++) {
    if (!visited[i]) {
      array[n] = i;
      visited[i] = true;
      back(list, endNum, n + 1, i + 1, array, visited, ans);
      visited[i] = false;
    }
  }
}
