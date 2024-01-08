function solution(orders, course) {
  const answer = [];
  course.forEach((n) => {
    const result = {};
    let max = 0;

    orders.forEach((order) => {
      const combinations = getCombinations([...order], n);
      //console.log(order,combinations)
      combinations.forEach((combination) => {
        const menu = combination.sort().join("");
          //해당하는 조합이 result 에  있다면 +1 을 해준다.
        if (!result[menu]) {
            result[menu] = 1;
          
        } else{ result[menu] = result[menu] + 1;}
      });
    });
      
      findMaxValue(result) && answer.push(...findMaxValue(result));
      //console.log(result,answer)
  });
  return answer.sort();
}

function findMaxValue(obj) {
  let maxKey = null;
  let maxValue = -Infinity;
  const result = [];

  for (const key in obj) {
    const value = obj[key];

    if (value > maxValue) {
      maxKey = key;
      maxValue = value;
      result.length = 0;
    }

    if (value === maxValue) {
      result.push(key);
    }
  }

  return maxValue > 1 ? result : [];
}

function getCombinations (arr, selectNumber) {
  const results = [];
    //console.log(arr,selectNumber)
    if (selectNumber === 1) {
    return arr.map((value) => [value]);
  }
  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, selectNumber - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);

    results.push(...attached);
  });

  return results;
};
