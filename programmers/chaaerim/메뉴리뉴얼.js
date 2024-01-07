let answer = {};
solution(['XYZ', 'XWY', 'WXA'], [2, 3, 4]);
function solution(orders, course) {
  let result = [];
  course.forEach(el => (answer[`${el}`] = []));
  for (let i = 0; i < orders.length; i++) {
    for (let j = 0; j < course.length; j++) {
      const array = new Array(course[j]).fill(0);
      const visited = new Array(orders[i].split('').length + 1).fill(false);
      back(orders[i].split(''), course[j], 0, 0, array, visited);
    }
  }

  for (let i in answer) {
    // console.log(answer[i]);
    const answerMap = new Map();

    for (let j = 0; j < answer[i].length; j++) {
      answer[i][j] = answer[i][j].split('').sort().join('');
      if (answerMap.has(answer[i][j])) {
        const temp = answerMap.get(answer[i][j]);
        answerMap.set(answer[i][j], temp + 1);
      } else {
        answerMap.set(answer[i][j], 1);
      }
    }
    answer[i] = Array.from(answerMap);
    answer[i].sort((a, b) => b[1] - a[1]);
  }
  console.log(answer);

  for (let i in answer) {
    let max = 0;
    for (let j = 0; j < answer[i].length; j++) {
      const [menu, count] = answer[i][j];
      //   console.log(menu, count);
      if (count < 2) {
        break;
      } else if (max < count) {
        max = count;
      }
      if (max > count) {
        break;
      } else {
        result.push(menu);
      }
    }
  }
  console.log(answer, result.sort());
  //   result = result.map(el => el.split('').sort().join(''));
  //   //   console.log(new Set(result));
  //   result = Array.from(new Set(result));
  //   console.log(result);
  //   console.log(answerMap);
  return result.sort();
}

function back(order, number, count, start, array, visited) {
  if (number === count) {
    answer[`${number}`].push(array.join(''));
    return;
  }

  for (let i = start; i < order.length; i++) {
    if (!visited[i]) {
      array[count] = order[i];
      visited[i] = true;
      back(order, number, count + 1, i + 1, array, visited);
      visited[i] = false;
    }
  }
}
