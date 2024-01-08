function solution(orders, course) {
  const menuSetMap = {};

  orders.forEach((order) => {
    const orderArr = order.split("").sort();
    dfs(orderArr, "", 0);
  });

  const maxCount = {};
  Object.entries(menuSetMap).forEach(([key, value]) => {
    if (value <= 1 || !course.includes(key.length)) {
      return;
    }

    if (!maxCount[key.length] || maxCount[key.length] < value) {
      // 가장 많이 주문된 조합의 주문 횟수를 저장
      maxCount[key.length] = value;
    }
  });

  const answer = [];
  Object.entries(menuSetMap).forEach(([key, value]) => {
    if (maxCount[key.length] === value) {
      // 최대 주문 횟수에 해당하는 key값이 원하는 메뉴 조합
      answer.push(key);
    }
  });

  function dfs(order, menuSet, idx) {
    if (order.length === idx) {
      menuSetMap[menuSet] = (menuSetMap[menuSet] ?? 0) + 1;
      return;
    }

    dfs(order, menuSet + order[idx], idx + 1);
    dfs(order, menuSet, idx + 1);
  }
  return answer.sort();
}
