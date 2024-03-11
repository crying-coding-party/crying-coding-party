//이중 for 문을 사용해서 탐색하면 효율성 뻑남,,,

function solution(info, query) {
  const infoMap = new Map();

  //info 로 주어진 배열에서 가능한 조합을 모두 만든다.
  //javabackendjuniorpizza
  //-backendjuniorpizza
  function combination(arr, score, start) {
    const key = arr.join('');

    infoMap.get(key) ? infoMap.get(key).push(score) : infoMap.set(key, [score]);

    for (let i = start; i < arr.length; i++) {
      const temp = [...arr];
      temp[i] = '-';
      combination(temp, score, i + 1);
    }
  }

  info.forEach((infoStr) => {
    const info = infoStr.split(' ');
    const score = Number(info.pop());
    combination([...info], score, 0);
  });

  //점수를 오름차순으로 정렬
  for (const [key, value] of infoMap.entries()) {
    infoMap.set(
      key,
      value.sort((a, b) => a - b)
    );
  }

  //처음과 끝을 기준으로 중간 지점을 찾아서 중간 지점의 점수가 검색 점수일 때까지 찾는다 (처음 인덱스 = 끝 인덱스)
  function binarySearch(scores, target) {
    let start = 0;
    let end = scores.length;
    while (start < end) {
      const mid = Math.floor((start + end) / 2);
      if (scores[mid] >= target) {
        end = mid;
      } else {
        start = mid + 1;
      }
    }
    return scores.length - start;
  }

  const answer = [];
  query.forEach((queryStr) => {
    const [language, _, position, __, career, ___, food, score] =
      queryStr.split(' ');
    const key = language + position + career + food;

    //검색 파라미터로 만든 키가 만약 맵에 존재하게 되면 이진탐색 시작
    infoMap.get(key)
      ? answer.push(binarySearch(infoMap.get(key), Number(score)))
      : answer.push(0);
  });

  return answer;
}
