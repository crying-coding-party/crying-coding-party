function solution(n, t, m, timetable) {

  //분으로 모든 시간을 포맷팅 한다.
    let startTime = getTime('09:00');
    let formatTimeTable = timetable.map(getTime).sort((a, b) => a - b);

    //console.log(formatTimeTable)
    for (let i = 0; i < n; i++) {
        //이번 시간에 탈 수 있는 인원을 구함
        let current = formatTimeTable.filter((time) => time <= startTime).length;

        if (i < n - 1) {
          //탑승한 승객은 배열에서 뺀다 m보다 클 때는 m 만큼만 뺀다
            formatTimeTable.splice(0, current > m ? m : current);
            startTime = startTime + t;
        } else {
          //막차이고 탈 수 있는 인원이 꽉 차 버린 경우 마지막 크루보다 1분은 먼저 나와야함
            if (current >= m) startTime = formatTimeTable[m - 1] - 1;
        }
    }

    return (((Math.floor(startTime / 60)) < 10 ? "0" + (Math.floor(startTime / 60)) : (Math.floor(startTime / 60))) + ":" + (startTime % 60 < 10 ? "0" + startTime % 60 : startTime % 60));
}

function getTime(time) {
  const [h, m] = time.split(':');
  return h * 60 + Number(m);
}
