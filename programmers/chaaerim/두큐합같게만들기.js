class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }
  enqueue(value) {
    this.queue[this.rear++] = value;
  }
  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front += 1;
    return value;
  }
  isEmpty() {
    return this.rear === this.front;
  }
}

function solution(queue1, queue2) {
  let answer = 0;

  const countLimit = queue1.length;
  const q1 = new Queue();
  const q2 = new Queue();

  let oneTotal = queue1.reduce((acc, cul) => {
    q1.enqueue(cul);
    return acc + cul;
  }, 0);
  let twoTotal = queue2.reduce((acc, cul) => {
    q2.enqueue(cul);
    return acc + cul;
  }, 0);

  //   큐 종료조건을 countLimit*3으로 잡긴했는데 이유를 모르겠음. 얼마로 잡아야하지? 왜?
  //   최대 이동 횟수는 (len(queue1)-1)x3, 마지막 이동 후 검사를 위해 +1
  //   따라서 for문 지속횟수는 (len(queue1)-1)x3+1 또는 len(queue1)x3-2

  // test case:
  // [1,2] [4,1] 3 -> 0+1+2 = 3 -> for문 4번필요
  // [1,2,1] [1,6,1] 6 -> 1+2+3 = 6 -> for문 7번 필요
  // [1, 2, 1, 2] [1, 1, 10, 2] 9 -> 2+3+4 = 9 -> for문 10번 필요
  // [1, 2, 1, 1, 1] [1, 2, 1, 12, 2] 12 -> 3+4+5 = 12 -> for문 13번 필요
  // [1, 2, 1, 2, 1, 2] [1, 2, 1, 2, 16, 1] 15 -> 4+5+6 =15 -> for문 16번 필요

  while (oneTotal !== twoTotal || !q1.isEmpty() || !q2.isEmpty) {
    if (q1.isEmpty() || q2.isEmpty() || answer > countLimit * 3) {
      return -1;
    }

    if (oneTotal > twoTotal) {
      const temp = q1.dequeue();
      q2.enqueue(temp);
      oneTotal -= temp;
      twoTotal += temp;
      answer++;
    } else if (oneTotal < twoTotal) {
      const temp = q2.dequeue();
      q1.enqueue(temp);
      twoTotal -= temp;
      oneTotal += temp;
      answer++;
    }
    if (oneTotal === twoTotal) {
      break;
    }
  }

  return answer;
}
