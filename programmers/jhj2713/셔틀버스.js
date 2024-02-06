function solution(n, t, m, timetable) {
  var answer = "";
  const shuttleTimeTable = [];

  // 도착 시간에 따라 timetable 정렬
  timetable.sort((a, b) => {
    const [aHour, aMinute] = a.split(":").map(Number);
    const [bHour, bMinute] = b.split(":").map(Number);

    if (aHour === bHour) {
      return aMinute - bMinute;
    }
    return aHour - bHour;
  });

  // 셔틀 시간표 계산
  for (let i = 0; i < n; i++) {
    const minute = (i * t) % 60;
    const hour = 9 + Math.floor((i * t) / 60);
    shuttleTimeTable.push([hour, minute]);
  }

  // 현재 셔틀 대기중인 크루의 시작 index
  let startIdx = 0;
  shuttleTimeTable.forEach((shuttle, idx) => {
    let count = 0;
    const [shuttleHour, shuttleMinute] = shuttle;
    // 현재 셔틀이 도착했을때 대기 중인 인원 수 구하기
    for (let i = startIdx; i < timetable.length; i++) {
      const [crewHour, crewMinute] = timetable[i].split(":").map(Number);

      if (shuttleHour > crewHour || (shuttleHour === crewHour && shuttleMinute >= crewMinute)) {
        count += 1;
      } else {
        break;
      }
    }

    // 마지막 셔틀
    if (idx === shuttleTimeTable.length - 1) {
      if (count < m) {
        // count보다 수용 가능한 인원 수가 많으면 도착 시간이 셔틀 출발 시간이 되는게 가장 늦은 도착시간
        answer = `${String(shuttleHour).padStart(2, "0")}:${String(shuttleMinute).padStart(2, "0")}`;
      } else {
        // count보다 수용 가능한 인원 수가 적거나 같으면 수용 가능한 인원 수에 해당하는 가장 마지막 크루보다 도착 시간이 빨라야함
        const [crewHour, crewMinute] = timetable[startIdx + m - 1].split(":").map(Number);
        const arrivalMinute = crewMinute === 0 ? 59 : crewMinute - 1;
        const arrivalHour = crewMinute === 0 ? crewHour - 1 : crewHour;

        answer = `${String(arrivalHour).padStart(2, "0")}:${String(arrivalMinute).padStart(2, "0")}`;
      }
    }

    // 가능한 인원 수만큼 셔틀을 태워 보냄
    startIdx += count > m ? m : count;
  });

  return answer;
}

// 버스 운행 시간표 -> 막차를 탈 수 있도록
