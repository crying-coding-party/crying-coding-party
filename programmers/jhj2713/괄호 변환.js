function solution(p) {
  if (p.length === 0) return "";

  const [u, v] = splitBracketString(p);

  if (isRightBracket(u)) {
    // 문자열 u가 "올바른 괄호 문자열" 이라면 문자열 v에 대해 1단계부터 다시 수행하고 u에 붙인 후 반환
    return u + solution(v);
  } else {
    const s = reverseBracket(u);
    return "(" + solution(v) + ")" + s;
  }
}

/**
 * @description 균형잡힌 괄호 문자열 u, v로 분리하는 함수
 */
function splitBracketString(str) {
  let left = 0,
    right = 0,
    idx = 0;
  const arr = str.split("");
  // u는 "균형잡힌 괄호 문자열"로 더 이상 분리할 수 없어야 하므로 가장 처음 만나는 균형잡힌 괄호 문자열을 u로 반환하는 것
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "(") left++;
    else right++;
    if (left === right) {
      idx = i;
      break;
    }
  }
  return [str.slice(0, idx + 1), str.slice(idx + 1, str.length)];
}

/**
 * @description 문자열 u가 "올바른 괄호 문자열"이 아닌 경우 u의 첫 번째와 마지막 문자를 제거하고 나머지 문자열의 괄호 방향을 뒤집어서 뒤에 붙이는 함수
 */
function reverseBracket(str) {
  const splitString = str.split("").slice(1, str.length - 1);
  // u의 첫 번째와 마지막 문자를 제거하고, 나머지 문자열의 괄호 방향을 뒤집음
  return splitString.reduce((acc, val) => {
    if (val === "(") return acc + ")";
    return acc + "(";
  }, "");
}

/**
 * @description 올바른 괄호 문자열인지 확인하는 함수
 */
function isRightBracket(str) {
  const stack = [];
  str.split("").forEach((s) => {
    if (s === "(") stack.push(s);
    else if (s === ")" && stack.length === 0) return false;
    else stack.pop();
  });

  if (stack.length === 0) return true;
  return false;
}
