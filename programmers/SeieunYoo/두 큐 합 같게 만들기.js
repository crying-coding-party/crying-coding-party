//11,28 번 시간 초과남.... -> count를 매번 ++ 해주지 않고 마지막에만 해주는 것으로 변경
function solution(queue1, queue2) {
  const queue = [...queue1, ...queue2];

  //먼저 큐1 의 합을 구해본다.
  let queue1Sum = queue1.reduce((acc, currentValue) => acc + currentValue, 0);
  let queueSum = queue.reduce((acc, currentValue) => acc + currentValue, 0);

  const halfSum = queueSum / 2;

  let firstQueueStart = 0;
  let secondQueueStart = queue1.length;
  let count = 0;

  //여기서 queue.length 만큼만 돌았을 때 테스트 개수 실패가 떠서 queue.length 의 2배만큼을 도는 것으로 수정
  while (count < queue.length * 2) {
    if (queue1Sum === halfSum) return count;
    //queue2 에서 원소를 가져와 queue1에 원소를 추가해주어야 함
    //queue2 의 인덱스는 하나 밀림
    else if (halfSum > queue1Sum) {
      queue1Sum += queue[secondQueueStart];
      secondQueueStart++;
    }

    //queue1 에서 원소를 가져와 queue2에 원소를 추가해주어야 함
    //queue1 의 인덱스는 뒤로 하나 밀림
    else if (halfSum < queue1Sum) {
      queue1Sum -= queue[firstQueueStart];
      firstQueueStart++;
    }
    count++;
  }

  return -1;
}
