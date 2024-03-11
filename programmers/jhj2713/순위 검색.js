function solution(info, query) {
  const answer = [];
  const infoMap = new Map();

  // infoMap에 info의 정보를 key값으로, score들을 value로 저장
  info.forEach((i) => {
    const [lang, position, career, eats, score] = i.split(" ");
    const key = `${lang}${position}${career}${eats}`;
    infoMap.set(key, [...(infoMap.get(key) ?? []), parseFloat(score)]);
  });

  // score 정렬
  for (const [key, value] of infoMap.entries()) {
    infoMap.set(
      key,
      value.sort((a, b) => a - b)
    );
  }

  query.forEach((q) => {
    const queryArr = q.split(" ");
    const score = queryArr[queryArr.length - 1];
    const [lang, position, career, eats] = q
      .replace(/and|\d/g, "")
      .split(" ")
      .filter(Boolean);

    const langArr = lang === "-" ? ["cpp", "java", "python"] : [lang];
    const positionArr = position === "-" ? ["backend", "frontend"] : [position];
    const careerArr = career === "-" ? ["junior", "senior"] : [career];
    const eatsArr = eats === "-" ? ["chicken", "pizza"] : [eats];

    const totalQuery = [];

    // 현재 쿼리로 가능한 조합들을 만들어냄
    langArr.forEach((lang) => {
      positionArr.forEach((position) => {
        careerArr.forEach((career) => {
          eatsArr.forEach((eats) => {
            totalQuery.push(`${lang}${position}${career}${eats}`);
          });
        });
      });
    });

    let sum = 0;
    totalQuery.forEach((query) => {
      const infoQuery = infoMap.get(query) ?? [];
      sum += getOverScoreCount(infoQuery, score);
    });

    answer.push(sum);
  });

  function getOverScoreCount(info, score) {
    let left = 0,
      right = info.length - 1;

    // 이진탐색으로 score가 넘는 info 쿼리의 개수를 구함
    while (left <= right) {
      const tmpMid = Math.floor((left + right) / 2);

      if (info[tmpMid] < score) {
        left = tmpMid + 1;
      } else {
        right = tmpMid - 1;
      }
    }

    return info.length - left;
  }

  return answer;
}
