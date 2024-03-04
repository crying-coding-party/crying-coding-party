class BinaryTree {
  constructor() {
    this.root = null;
  }

  insertNode(node, newNode) {
    //newNode 의 x 좌표가 더 작다는 것은 왼쪽에 위치한다는 것임
    if (newNode.x < node.x) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  insert(value, x) {
    const newNode = {
      value: value,
      x: x,
      left: null,
      right: null,
    };

    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }
}

function solution(nodeinfo) {
  const nodes = nodeinfo.map(([x, y], index) => ({ index: index + 1, x, y }));
  nodes.sort((a, b) => b.y - a.y);

  //nodeInfo 라는 배열을 y좌표를 기준으로 소팅해서 nodes 배열에 저장

  // console.log(nodes)
  const tree = new BinaryTree();

  nodes.forEach(({ index, x }) => tree.insert(index, x));

  // console.log(tree.root)
  //전위: 루트 -> 왼쪽 -> 오른쪽
  function preOrder(node, result) {
    if (node) {
      result.push(node.value);
      preOrder(node.left, result);
      preOrder(node.right, result);
    }
    return result;
  }

  //후위 : 왼쪽 -> 오른족 -> 루트
  function postOrder(node, result) {
    if (node) {
      //console.log(node.left)
      postOrder(node.left, result);
      postOrder(node.right, result);
      result.push(node.value);
    }
    return result;
  }
  return [preOrder(tree.root, []), postOrder(tree.root, [])];
}
