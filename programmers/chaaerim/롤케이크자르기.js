solution([1, 2, 1, 3, 1, 4, 1, 2]);

// hash 문제인듯..?
function solution(topping) {
  let ans = 0;

  //   시간초과 나는 답,, 왜 ? slice 시간이 오래걸리나 ..?
  //   그냥 for문 돌릴 때마다 자료구조를 개편해서 시간이 오래 걸리는 것 .
  //   for (let i = 0; i < topping.length; i++) {
  //     const c = topping.slice(0, i);
  //     const b = topping.slice(i, topping.length);
  //     const cSet = new Set(c);
  //     const bSet = new Set(b);
  //     if (cSet.size === bSet.size) {
  //       ans++;
  //     }
  //   }

  const b = new Map();
  const c = new Set();

  for (let i = 0; i < topping.length; i++) {
    if (b.has(topping[i])) {
      const temp = b.get(topping[i]) + 1;
      b.set(topping[i], temp);
    } else {
      b.set(topping[i], 1);
    }
  }

  for (let i = topping.length - 1; i >= 0; i--) {
    if (b.has(topping[i])) {
      const temp = b.get(topping[i]) - 1;
      if (temp === 0) {
        b.delete(topping[i]);
      } else {
        b.set(topping[i], temp);
      }
    }
    c.add(topping[i]);
    if (c.size === b.size) {
      ans++;
    }
  }
  return ans;
}
