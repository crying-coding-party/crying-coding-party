function solution(s) {
  const tuples = s.match(/{[\d,]+}/g).map((s) => s.replace(/[{}]/g, "").split(",").map(Number));

  const answer = tuples
    .sort((a, b) => a.length - b.length)
    .reduce((acc, val) => {
      if (acc.length === 0) {
        return val;
      }
      const newVal = val.filter((v) => !acc.includes(v))[0];
      return [...acc, newVal];
    }, []);

  return answer;
}
