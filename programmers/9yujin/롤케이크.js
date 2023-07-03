function solution(topping) {
  let answer = 0;
  const all = new Map();
  const bro = new Map();
  topping.forEach((v) =>
    all.has(v) ? all.set(v, all.get(v) + 1) : all.set(v, 1)
  );

  topping.forEach((v) => {
    bro.set(v, 1);
    all.set(v, all.get(v) - 1);
    all.get(v) == 0 && all.delete(v);

    if (bro.size == all.size) {
      //console.log(v, bro, all);
      answer += 1;
    }
  });

  return answer;
}

console.log(solution([1, 2, 3, 1, 4]));
