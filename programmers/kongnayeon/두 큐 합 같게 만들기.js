function solution(queue1, queue2) {
  let answer = 0;

  let queue = [...queue1, ...queue2];
  let sum = queue.reduce((acc, num) => acc + num, 0);

  sum /= 2;

  let max = 2 * queue1.length + queue2.length - 2;

  let start = 0;
  let end = queue1.length;
  let check = queue.slice(start, end).reduce((acc, num) => acc + num, 0);

  // 각 큐의 총합이 더 작은 쪽에서 값 가져오기
  // answer이 max와 같아지면 return -1

  while (answer !== max) {
    if (sum === check) {
      return answer;
    } else if (sum > check) {
      check += queue[end];
      end++;
    } else {
      check -= queue[start];
      start++;
    }
    answer++;
  }

  return -1;
}
