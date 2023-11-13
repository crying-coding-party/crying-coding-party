function solution(queue1, queue2) {
  let answer = Infinity;

  const sum = queue1.reduce((acc, val) => acc + val, 0) + queue2.reduce((acc, val) => acc + val, 0);
  const halfSum = sum / 2;

  const totalQueue = [...queue1, ...queue2];
  let left = 0,
    right = 0,
    currentSum = totalQueue[0];
  const leftRightCoordinates = [];

  while (left <= right && right < totalQueue.length) {
    if (currentSum === halfSum) {
      leftRightCoordinates.push([left, right]);
      right += 1;
      currentSum += totalQueue[right];
      continue;
    }
    if (currentSum < halfSum) {
      right += 1;
      currentSum += totalQueue[right];
    } else if (currentSum > halfSum) {
      currentSum -= totalQueue[left];
      left += 1;
    }
  }

  if (leftRightCoordinates.length === 0) {
    return -1;
  }

  leftRightCoordinates.forEach((coor) => {
    const [left, right] = coor;
    // left가 queue1 내에 있고 right가 queue2 내에 있으면
    if (left < queue1.length && right >= queue1.length) {
      answer = Math.min(answer, left + (right - queue1.length + 1));
    }

    if (left < queue1.length && right < queue1.length - 1) {
      // left가 queue1 내에 있고 right가 queue1 내에 있고 queue1에 남은 숫자가 있으면
      answer = Math.min(answer, right + 1 + queue2.length + left);
    } else if (left < queue1.length && right < queue1.length) {
      // left가 queue1 내에 있고 right가 queue1 내에 있고 queue1에 남은 숫자가 없으면
      answer = Math.min(answer, left);
    }

    if (left >= queue1.length && right >= queue1.length && right < totalQueue.length - 1) {
      // left가 queue2 내에 있고 right가 queue2 내에 있고 queue2에 남은 숫자가 있으면
      answer = Math.min(answer, right - queue1.length + 1 + queue1.length + (left - queue1.length));
    } else if (left >= queue1.length && right >= queue1.length) {
      // left가 queue2 내에 있고 right가 queue2 내에 있고 queue2에 남은 숫자가 없으면
      answer = Math.min(answer, right - queue1.length);
    }
  });

  return answer;
}
