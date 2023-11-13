function solution(queue1, queue2) {
  let answer = 0;

  let sum = 0;
  queue1.forEach((num) => {
    sum += num;
  });
  queue2.forEach((num) => {
    sum += num;
  });
  sum = sum / 2;

  let max = 2 * queue1.length + queue2.length - 2;

  // 각 큐의 총합이 더 작은 쪽에서 값 가져오기
  // answer이 max와 같아지면 return -1

  while (answer != max) {
    let sum1 = 0;
    let sum2 = 0;
    let el = 0;

    queue1.forEach((num) => {
      sum1 += num;
    });
    queue2.forEach((num) => {
      sum2 += num;
    });

    if (sum1 === sum2) {
      return answer;
    } else if (sum1 > sum2) {
      el = queue1.shift();
      queue2.push(el);
      answer++;
    } else {
      el = queue2.shift();
      queue1.push(el);
      answer++;
    }
  }

  return -1;
}
