function solution(queue1, queue2) {
  let answer = 0;

  let sum = 0;
  let sum1 = queue1.reduce((acc, num) => acc + num, 0);
  let sum2 = queue2.reduce((acc, num) => acc + num, sum);
  sum = sum1 + sum2;

  sum = sum / 2;

  let max = 2 * queue1.length + queue2.length - 2;

  // 각 큐의 총합이 더 작은 쪽에서 값 가져오기
  // answer이 max와 같아지면 return -1

  while (answer != max) {
    let el = 0;

    // let sum1 = queue1.reduce((acc, num) => acc + num, 0);
    // let sum2 = queue2.reduce((acc, num) => acc + num, 0);

    if (sum1 === sum2) {
      return answer;
    } else if (sum1 > sum2) {
      el = queue1.shift();
      queue2.push(el);
      sum1 -= el;
      sum2 += el;
    } else {
      el = queue2.shift();
      queue1.push(el);
      sum2 -= el;
      sum1 += el;
    }
    answer++;
  }

  return -1;
}
