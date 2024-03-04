// 시간초과, 틀림
/**
 * bfs로 현재 노드보다 Y가 작은 좌표들 중에서 현재 노드보다 X가 작은 애들, X가 큰 애들을 나눠주기
 * 부모 노드도 고려해야하므로 min, max값도 같이 적어주기
 */
class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }
  enqueue(val) {
    this.queue[this.rear++] = val;
  }
  dequeue() {
    const tmp = this.queue[this.front];
    delete this.queue[this.front++];
    return tmp;
  }
  isEmpty() {
    return this.front === this.rear;
  }
}
class Node {
  constructor(x, y, val) {
    this.x = x;
    this.y = y;
    this.val = val;
    this.left = null;
    this.right = null;
  }
  setNode(leftNode, rightNode) {
    this.left = leftNode;
    this.right = rightNode;
  }
}
function solution(nodeinfo) {
  let maxCoordinate = [0, 0],
    maxIndex = 0;
  nodeinfo.map((n, idx) => {
    if (maxCoordinate[1] < n[1]) {
      maxCoordinate = [...n];
      maxIndex = idx + 1;
    }
  });

  const tree = new Node(maxCoordinate[0], maxCoordinate[1], maxIndex);

  // tree(x, y, value), min, max
  const queue = new Queue();
  queue.enqueue([tree, 0, 100000]);

  while (!queue.isEmpty()) {
    const [tree, min, max] = queue.dequeue();

    // 왼쪽 노드 조건에 만족하는 노드
    const left = nodeinfo
      .map((n, idx) => {
        if (n[0] < tree.x && n[0] > min && n[0] < max && n[1] < tree.y) {
          return [n, idx + 1];
        }
        return [-1, -1, -1];
      })
      .reduce(
        (acc, val) => {
          const [coor, idx] = val;
          if (acc[1] < coor[1]) {
            return [coor[0], coor[1], idx];
          }
          return [acc[0], acc[1], acc[2]];
        },
        [-1, -1, -1]
      );
    // 오른쪽 노드 조건에 만족하는 노드
    const right = nodeinfo
      .map((n, idx) => {
        if (n[0] > tree.x && n[0] > min && n[0] < max && n[1] < tree.y) {
          return [n, idx + 1];
        }
        return [-1, -1, -1];
      })
      .reduce(
        (acc, val) => {
          const [coor, idx] = val;
          if (acc[1] < coor[1]) {
            return [coor[0], coor[1], idx];
          }
          return [acc[0], acc[1], acc[2]];
        },
        [-1, -1, -1]
      );

    if (left[0] !== -1) {
      const leftNode = new Node(left[0], left[1], left[2]);
      tree.left = leftNode;
      queue.enqueue([leftNode, min, tree.x]);
    }
    if (right[0] !== -1) {
      const rightNode = new Node(right[0], right[1], right[2]);
      tree.right = rightNode;
      queue.enqueue([rightNode, tree.x, max]);
    }
  }

  // 전위 순회 : 자신 -> 왼쪽 -> 오른쪽
  const preorder = [];
  getPreorder(tree);
  function getPreorder(currentNode) {
    preorder.push(currentNode.val);
    if (currentNode.left) {
      getPreorder(currentNode.left);
    }
    if (currentNode.right) {
      getPreorder(currentNode.right);
    }
  }

  // 후위 순회 : 왼쪽 -> 오른쪽 -> 자신
  const postorder = [];
  getPostorder(tree);
  function getPostorder(currentNode) {
    if (currentNode.left) {
      getPostorder(currentNode.left);
    }
    if (currentNode.right) {
      getPostorder(currentNode.right);
    }
    postorder.push(currentNode.val);
  }

  return [preorder, postorder];
}

// 정답
class BinaryTree {
  constructor(val, x) {
    this.val = val;
    this.x = x;
    this.left = null;
    this.right = null;
  }
  insert(val, x) {
    if (this.x > x) {
      this.toLeft(val, x);
    } else {
      this.toRight(val, x);
    }
  }
  toLeft(val, x) {
    if (this.left) {
      this.left.insert(val, x);
    } else {
      this.left = new BinaryTree(val, x);
    }
  }
  toRight(val, x) {
    if (this.right) {
      this.right.insert(val, x);
    } else {
      this.right = new BinaryTree(val, x);
    }
  }
}
function solution(nodeinfo) {
  const preorderArr = [];
  const postorderArr = [];

  // y축 내림차순 정렬
  const nodes = nodeinfo.map((node, idx) => [idx + 1, node[0], node[1]]).sort((a, b) => b[2] - a[2]);

  const tree = new BinaryTree(nodes[0][0], nodes[0][1]);
  for (let i = 1; i < nodes.length; i++) {
    tree.insert(nodes[i][0], nodes[i][1]);
  }

  getPreorder(tree);
  function getPreorder(tree) {
    if (tree) {
      preorderArr.push(tree.val);
      getPreorder(tree.left);
      getPreorder(tree.right);
    }
  }
  getPostorder(tree);
  function getPostorder(tree) {
    if (tree) {
      getPostorder(tree.left);
      getPostorder(tree.right);
      postorderArr.push(tree.val);
    }
  }

  return [preorderArr, postorderArr];
}
