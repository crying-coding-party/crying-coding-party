function solution(p) {
  if (p === "") return ""; // w가 빈 문자열이면 빈 문자열을 반환한다.
  let u, v;
  let cnt = 0;
    let open = 0;
    let close = 0;

  for (let i = 0; i < p.length; i++) {
    p[i] === "(" ? open++ : close++;
    if (open === close) {
      u = p.slice(0, i + 1);
      v = p.slice(i + 1);
      break;
    }
  } // w에서 균형잡힌 문자열까지 문자열 u로 선언하고, 나머지를 v로 선언한다.

  for (let i = 0; i < u.length; i++) {
    u[i] === "(" ? open++ : close++;
    if (open < close) { // 올바른 문자열이 아니므로 4번 과정 수행
      let str = "";
      str =  '(' + solution(v) + ')'; // 4-1 4-2 4-3
      for (let j = 1; j < u.length - 1; j++) { // 4-4
        u[j] === "(" ? (str = str + ")") : (str = str + "(");
      }
      return str;
    }
  }

  return u + solution(v); // 올바른 문자열인 경우 3-1
}
