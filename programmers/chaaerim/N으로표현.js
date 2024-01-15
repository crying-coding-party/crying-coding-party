function solution(N, number) {
  if (N === number) {
    return 1;
  }
  //     d[i]: n을 i번 사용했을 때의 값들
  const d = new Array(8 + 1).fill(0);
  d[1] = [N];
  let link = String(N);
  for (let i = 2; i <= d.length; i++) {
    let temp = [];
    link += String(N);
    temp.push(Number(link));
    let num = 1;
    while (num !== i) {
      for (let j = 0; j < d[i - num].length; j++) {
        for (let k = 0; k < d[num].length; k++) {
          const mult = d[i - num][j] * d[num][k];
          const div = Math.floor(d[i - num][j] / d[num][k]);
          const minus = d[i - num][j] - d[num][k];
          const plus = d[i - num][j] + d[num][k];
          temp.push(mult, div, minus, plus);
        }
      }
      num++;
    }
    let tempSet = new Set(temp);
    temp = [...tempSet];

    if (temp.includes(number)) {
      // console.log(i)
      return i;
    }
    if (i === d.length) {
      return -1;
    }
    d[i] = temp;
  }
}
