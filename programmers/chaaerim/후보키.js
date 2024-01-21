let ans = [];

solution([
  ['100', 'ryan', 'music', '2'],
  ['200', 'apeach', 'math', '2'],
  ['300', 'tube', 'computer', '3'],
  ['400', 'con', 'computer', '4'],
  ['500', 'muzi', 'music', '3'],
  ['600', 'apeach', 'music', '2'],
]);

function solution(relation) {
  //   relation[0].forEach((_, idx) => (ans[`${idx + 1}`] = []));
  for (let i = 0; i < relation.length; i++) {
    for (let j = 0; j < relation[0].length; j++) {
      const array = new Array(j + 1).fill(0);
      const visited = new Array(relation[0].length).fill(false);
      back(relation[i], j + 1, 0, 0, array, visited);
    }
  }
  console.log(ans);
  return;
}

function back(list, endNum, n, start, array, visited) {
  //   console.log(list, endNum, array, visited);

  if (endNum === n) {
    console.log(array, endNum, start);
    // ans[`${endNum}`].push(array.join(' '));
    // console.log(ans);
    ans.push(array.join(' '));
    return;
  }

  for (let i = start; i < list.length; i++) {
    if (!visited[i]) {
      array[n] = list[i];
      visited[i] = true;
      back(list, endNum, n + 1, i + 1, array, visited);
      visited[i] = false;
    }
  }
}
