solution([
  ['100', 'ryan', 'music', '2'],
  ['200', 'apeach', 'math', '2'],
  ['300', 'tube', 'computer', '3'],
  ['400', 'con', 'computer', '4'],
  ['500', 'muzi', 'music', '3'],
  ['600', 'apeach', 'music', '2'],
]);

function solution(relation) {
  let combinations = [];

  for (let i = 0; i < 1; i++) {
    for (let j = 0; j < relation[0].length; j++) {
      const array = new Array(j + 1).fill(0);
      const visited = new Array(relation[0].length).fill(false);
      back(relation[i], j + 1, 0, 0, array, visited, combinations);
    }
  }
  //   console.log(ans);
  let i = 0;
  let answer = 0;

  const temp = [];
  while (i < combinations.length) {
    // col index 꺼내기
    const col = combinations[i].split('');
    // 유일키 이미 include하고 있으면 후보키가 아니므로 거르기
    if (temp.filter(item => item.every(v => col.includes(v))).length !== 0) {
      i++;
      continue;
    }

    const key = relation.flatMap(val => col.map(item => val[item]).join(''));
    if ([...new Set(key)].length === relation.length) {
      // 겹치는거 없으면 일단 temp에 넣기, index 개수 작은 순서대로 combinations에 들어가 있으므로
      // 후보키는 여기서 고려 안해도 됨.
      temp.push(col);
      answer++;
    }
    i++;
  }
  console.log(answer);
  return answer;
}

function back(list, endNum, n, start, array, visited, combinations) {
  if (endNum === n) {
    combinations.push(array.join(''));
    return;
  }

  // 처음에는 list[i]를 넣었다가 column이 중요한 요소라 그냥 인덱스를 구함.
  // 0, 1, 2, 3, [0, 1], [0, 2] 이런식으로 column 조합만 구해도
  // 각 열에 인덱스 적용하면 필요한 조합은 다 구할 수 있으므로
  for (let i = start; i < list.length; i++) {
    if (!visited[i]) {
      array[n] = i;
      visited[i] = true;
      back(list, endNum, n + 1, i + 1, array, visited, combinations);
      visited[i] = false;
    }
  }
}
