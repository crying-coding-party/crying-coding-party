function solution(users, emoticons) {
  const answer = [0, 0];
  recur(0, [], emoticons, users, answer);
  console.log(answer);

  return answer;
}

function recur(idx, price, emoticons, users, answer) {
  if (idx === emoticons.length) {
    const [count, remainPrice] = checkSales(price, users);
    if (answer[0] < count || (answer[0] === count && answer[1] <= remainPrice)) {
      answer[0] = count;
      answer[1] = remainPrice;
    }
    return;
  }

  for (let i = 1; i <= 4; i++) {
    recur(idx + 1, [...price, { percent: i * 10, price: emoticons[idx] - (emoticons[idx] * (i * 10)) / 100 }], emoticons, users, answer);
  }
}

function checkSales(price, users) {
  let count = 0,
    remainPrice = 0;
  users.forEach((u) => {
    const sum = price.reduce((acc, val) => (val.percent >= u[0] ? acc + val.price : acc), 0);
    if (sum >= u[1]) {
      count += 1;
    } else {
      remainPrice += sum;
    }
  });

  return [count, remainPrice];
}
