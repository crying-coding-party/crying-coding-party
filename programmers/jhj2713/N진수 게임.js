function solution(n, t, m, p) {
  const round = t * m;
  let str = "";

  for (let i = 0; i < round; i++) {
    str += i.toString(n).toUpperCase();
  }

  const tube = str.split("").filter((_, idx) => idx % m === p - 1);

  return tube.slice(0, t).join("");
}

// 게임에 참가하는 인원 (m) * 미리 구할 숫자의 개수 (t) 만큼 진행됨 -> 최대 m * t 길이까지 구해야함
