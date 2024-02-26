function solution(m, musicinfos) {
  let answer = "(None)",
    time = 0;
  const replacedM = m.replace(/[A-Z]#/g, (m) => m[0].toLowerCase());

  for (const info of musicinfos) {
    const [start, end, title, code] = info.split(",");
    // 시작 시간, 끝 시간을 분으로 변환
    const startMinute = getMinute(start);
    const endMinute = getMinute(end);

    const minuteInterval = endMinute - startMinute;
    const codeLength = code.length;
    const replacedCode = code.replace(/[A-Z]#/g, (c) => c[0].toLowerCase());

    // 재생된 시간 만큼의 코드
    const mCode = new Array(minuteInterval)
      .fill()
      .map((_, idx) => replacedCode[idx % codeLength])
      .join("");
    const isRightCode = replacedM.length < minuteInterval ? mCode.includes(replacedM) : replacedM.includes(mCode);

    if (isRightCode && time < minuteInterval) {
      answer = title;
      time = minuteInterval;
    }
  }

  function getMinute(time) {
    const [hour, minute] = time.split(":").map(Number);
    return hour * 60 + minute;
  }

  return answer;
}
