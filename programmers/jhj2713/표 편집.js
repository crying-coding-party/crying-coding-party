// 효율성 50점
function solution(n, k, cmd) {
  const answerArr = new Array(n).fill("O");
  const deleteArr = [];
  let focus = k;

  cmd.forEach((c) => {
    if (c.startsWith("D")) {
      // down 명령
      const [, num] = c.split(" ").map(Number);
      let currentFocus = focus;
      for (let i = currentFocus + 1; i <= currentFocus + num; i++) {
        focus += 1;
        if (answerArr[i] === "X") {
          currentFocus += 1;
        }
      }
    } else if (c.startsWith("U")) {
      // up 명령
      const [, num] = c.split(" ").map(Number);
      let currentFocus = focus;
      for (let i = currentFocus - 1; i >= currentFocus - num; i--) {
        focus -= 1;
        if (answerArr[i] === "X") {
          currentFocus -= 1;
        }
      }
    } else if (c.startsWith("C")) {
      // 삭제 및 아래 행으로 포커스 조정
      answerArr[focus] = "X";
      deleteArr.push(focus);

      let currentFocus = focus;
      for (let i = currentFocus; i < n; i++) {
        if (answerArr[i] === "O") {
          focus = i;
          break;
        }
      }
      if (currentFocus === focus) {
        // 삭제된 행이 가장 마지막 행인 경우
        for (let i = currentFocus - 1; i >= 0; i--) {
          if (answerArr[i] === "O") {
            focus = i;
            break;
          }
        }
      }
    } else if (c.startsWith("Z")) {
      // 최근에 삭제된 항목 되돌리기
      const deleteRow = deleteArr.pop();
      answerArr[deleteRow] = "O";
    }
  });

  return answerArr.join("");
}

// 정답
class Node {
  constructor(val, prev) {
    this.val = val;
    this.prev = prev;
    this.next = null;
  }
}
function solution(n, k, cmd) {
  const answer = new Array(n).fill("O");

  let root = new Node(0);
  let currentNode = root;
  let prevNode = root;
  for (let i = 1; i < n; i++) {
    const newNode = new Node(i, prevNode);
    prevNode.next = newNode;
    prevNode = newNode;

    if (i === k) {
      currentNode = newNode;
    }
  }

  const deleteArr = [];
  cmd.map((c) => {
    const [com, num] = c.split(" ");
    if (com === "U") {
      // up 명령
      for (let i = 0; i < num; i++) {
        currentNode = currentNode.prev;
      }
    } else if (com === "D") {
      // down 명령
      for (let i = 0; i < num; i++) {
        currentNode = currentNode.next;
      }
    } else if (com === "C") {
      // 삭제 및 아래 행으로 포커스 조정
      deleteArr.push(currentNode);
      const prev = currentNode.prev;
      const next = currentNode.next;

      if (prev && next) {
        prev.next = next;
        next.prev = prev;
        currentNode = next;
      } else if (prev) {
        prev.next = null;
        currentNode = prev;
      } else if (next) {
        next.prev = null;
        currentNode = next;
      }
    } else if (com === "Z") {
      // 최근에 삭제된 항목 되돌리기
      const node = deleteArr.pop();
      const prev = node.prev;
      const next = node.next;
      if (prev) {
        prev.next = node;
      }
      if (next) {
        next.prev = node;
      }
    }
  });

  deleteArr.forEach((del) => {
    answer[del.val] = "X";
  });

  return answer.join("");
}
