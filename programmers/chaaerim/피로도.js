solution(80, [
  [80, 20],
  [50, 40],
  [30, 10],
  [80, 20],
  [50, 40],
  [30, 10],
]);

function solution(k, dungeons) {
  let answer = 0;
  const array = new Array(dungeons.length).fill(0);
  const visited = new Array(dungeons.length).fill(false);

  back(0);

  function back(count) {
    if (count === dungeons.length) {
      let power = k;
      let temp = 0;
      // dungeon 비교
      for (let i = 0; i < array.length; i++) {
        const [leastPower, consumePower] = array[i];
        if (power >= leastPower) {
          power = power - consumePower;
          temp += 1;
        } else {
          break;
        }
      }
      temp > answer ? (answer = temp) : (answer = answer);
      //   answer += 1;
      //   console.log(array);
    }

    for (let i = 0; i < dungeons.length; i++) {
      if (!visited[i]) {
        array[count] = dungeons[i];
        visited[i] = true;
        back(count + 1);
        visited[i] = false;
      }
    }
  }
  //   console.log(answer);
  return answer;
}
