// 사이즈 n개의 배열을 위의 점수가지고 만드는거랑 같음. 근데 중복 가능하게..
solution(9, [0, 0, 1, 2, 0, 1, 1, 1, 1, 1, 1]);

function solution(n, info) {
  let answer = [];
  const lionArr = new Array(11).fill(0);
  const apeachArr = info;
  let max = 0;

  back(lionArr, 0, 0);

  function back(lion, num, start) {
    if (num === n) {
      //   console.log(lion, 'lion', n, max);
      let apeachScore = 0;
      let lionScore = 0;

      for (let i = 0; i < 11; i++) {
        if (lion[i] > apeachArr[i]) {
          lionScore = lionScore + (10 - i);
        } else if (lion[i] < apeachArr[i]) {
          apeachScore = apeachScore + (10 - i);
        } else if (lion[i] !== 0 && apeachArr[i] !== 0 && lion[i] <= apeachArr[i]) {
          apeachScore = apeachScore + (10 - i);
        }
      }
      //   console.log(lionScore, apeachScore);

      if (max < lionScore - apeachScore) {
        max = lionScore - apeachScore;

        answer = [lion.slice()];
      } else if (max === lionScore - apeachScore) {
        answer.push(lion);
      }
      //   console.log(lionScore, apeachScore);

      return;
    }

    for (let i = start; i < 11; i++) {
      const temp = lion.slice();
      temp[i] += 1;
      back(temp, num + 1, i);
    }
  }

  if (answer.length === 0 || max === 0) {
    return [-1];
  } else {
    answer.sort((a, b) => {
      for (let i = a.length - 1; i >= 0; i--) {
        if (a[i] !== b[i]) {
          return b[i] - a[i];
        }
      }
    });
    return answer[0];
  }
}
