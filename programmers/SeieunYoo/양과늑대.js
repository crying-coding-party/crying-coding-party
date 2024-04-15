//dfs
function solution(info, edges) {
  var answer = 0;
  let node = Array.from(Array(info.length), () => []);

  //부모 자식 노드를 짝지어줌
  edges.forEach((edge) => {
    node[edge[0]].push(edge[1]);
  });
  //console.log(node);

  function dfs(sheep, wolf, currentNode, nextNode) {
    info[currentNode] === 0 ? sheep++ : wolf++;
    s;
    answer = Math.max(sheep, answer);
    //    console.log(answer)
    if (sheep <= wolf) return; //양과 늑대 수가 같으면 리턴

    let possibleNode = [...node[currentNode], ...nextNode]; //자식 노드와 갈 수 있느 노드를 합친다
    possibleNode.splice(possibleNode.indexOf(currentNode), 1); //현재 노드제거

    possibleNode.forEach((pn) => {
      dfs(sheep, wolf, pn, possibleNode);
    });
  }

  dfs(1, 0, 0, [0]);

  return answer;
}
