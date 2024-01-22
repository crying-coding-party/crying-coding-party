function solution(relation) {
  let idxArr = Array.from(Array(relation[0].length), (v, i) => i);
  let combinations = [];
  for (let i = 0; i < idxArr.length; i++) {
    combinations.push(...combination(idxArr, i + 1));
  }

  combinations = checkUniqueness(relation, combinations);
  combinations = checkMinimality(combinations);

  return combinations.length;
}

// 유일성 체크
const checkUniqueness = (arr, comb) => {
  const results = [];

  comb.forEach((v1, i1) => {
    let set = new Set();
    arr.forEach((v2, i2) => {
      set.add(v1.map((e) => v2[e]).join(','));
    });

    if (set.size == arr.length) results.push(v1);
  });

  return results;
};

// 최소성 체크
const checkMinimality = (comb) => {
  const results = [];

  while (comb.length) {
    results.push(comb[0]);
    comb = comb.reduce((a, c) => {
      let check = comb[0].every((e) => c.includes(e));
      if (!check) a.push(c);
      return a;
    }, []);
  }

  return results;
};

// 후보키 조합 구하기
function combination(arr, num) {
  let results = [];

  if (num === 1) return arr.map((v) => [v]);

  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = combination(rest, num - 1);
    const attached = combinations.map((v) => [fixed, ...v]);
    results.push(...attached);
  });

  return results;
}
