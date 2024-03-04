function solution(m, musicinfos) {
  let results = []; // 결과를 저장할 배열
  // '#'를 기준으로 문자열 분할 후 음표로 구분
  const mArray = m.split(/([A-G]#?)/).filter((str) => str !== '');
  musicinfos.forEach((entry) => {
    let result = [];

    const [timeStart, timeEnd, title, string] = entry.split(',');

    const notes = string.split(/([A-G]#?)/).filter((note) => note !== '');

    // 시작 시간과 종료 시간 차이 계산
    const [startHour, startMinute] = timeStart.split(':').map(Number);
    const [endHour, endMinute] = timeEnd.split(':').map(Number);

    const totalStartMinutes = startHour * 60 + startMinute;
    const totalEndMinutes = endHour * 60 + endMinute;
    const timeDiff = totalEndMinutes - totalStartMinutes;

    // 시간 차이를 이용하여 문자열 연장
    const repetitions = Math.floor(timeDiff / notes.length);
    const remainder = timeDiff % notes.length;

    // 각 음표에 대해 연장
    for (let i = 0; i < repetitions; i++) {
      notes.forEach((note) => {
        result.push(note);
      });
    }

    // 나머지 음표 연장
    notes.slice(0, remainder).forEach((note) => {
      result.push(note);
    });

    const hasMArray = result.some((_, index) =>
      mArray.every((value, subIndex) => value === result[index + subIndex])
    );

    //console.log(result,mArray,r)
    if (hasMArray) {
      results.push([timeDiff, title]);
    }
  });
  results.sort((a, b) => b[0] - a[0]);
  return results.length ? results[0][1] : '(None)';
}
