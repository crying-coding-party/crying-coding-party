function solution(queue1, queue2) {
  var answer = -2;
  const totalQueue = [...queue1, ...queue2];
  const expected = totalQueue.reduce((acc, cur) => acc + cur, 0) / 2;

  let sum1 = queue1.reduce((prev, cur) => prev + cur, 0);
  let sum2 = queue2.reduce((prev, cur) => prev + cur, 0);
  let queue1Start = 0;
  let queue2Start = queue1.length;

  for (let count = 0; count < queue1.length * 3; count++) {
    if (sum1 === expected) {
      return count;
    }
    sum1 =
      sum1 > expected
        ? // 내가 더 크면 pop하고
          sum1 - totalQueue[queue1Start++ % totalQueue.length]
        : // 내가 더 작으면 pushgkrh
          sum1 + totalQueue[queue2Start++ % totalQueue.length];
  }
  return -1;
}
