function calculateTime(enter, exit) {
  let enterTime = enter.split(':').map(Number);
  let exitTime = exit.split(':').map(Number);
  let time =
    exitTime[0] * 60 + exitTime[1] - (enterTime[0] * 60 + enterTime[1]);
  return time;
}

function updateTime(answer, car, time) {
  if (answer.hasOwnProperty(car)) {
    // 키가 존재하면 값에 더하기
    answer[car] += time;
  } else {
    // 키가 존재하지 않으면 새로운 키와 값을 추가
    answer[car] = time;
  }
}

function checkTime(answer, record) {
  let car = record[0][1];
  let isExit = false;
  let enter = '';
  let exit = '';

  for (let i = 0; i < record.length; i++) {
    // 출차 내역이 없는 경우 23:59에 출차된 것으로 간주
    if (!isExit && record[i][1] !== car && record[i][2] === 'IN') {
      updateTime(answer, car, calculateTime(enter, '23:59'));
      car = record[i][1];
      enter = record[i][0];
      continue;
    }
    car = record[i][1];

    if (record[i][2] === 'IN') {
      enter = record[i][0];
      isExit = false;
    } else {
      exit = record[i][0];
      updateTime(answer, car, calculateTime(enter, exit));
      isExit = true;
    }
  }

  // record의 마지막이 IN으로 끝나는 경우
  if (!isExit) updateTime(answer, car, calculateTime(enter, '23:59'));
}

function calculateFee(fees, time) {
  let [defaultTime, defaultFee, unitTime, unitFee] = [...fees];

  if (time >= defaultTime) {
    let fee = defaultFee + Math.ceil((time - defaultTime) / unitTime) * unitFee;
    return fee;
  } else {
    return defaultFee;
  }
}

function solution(fees, records) {
  let answer = {};
  let record = records.map((el) => el.split(' '));

  // 차량 번호 작은 순으로 정렬
  record.sort((a, b) => {
    return a[1] - b[1];
  });

  checkTime(answer, record);

  // 객체 -> 배열 -> 정렬 + 요금
  let entries = Object.entries(answer);
  entries.sort((a, b) => Number(a[0]) - Number(b[0]));
  let answerArr = entries.map((item) => calculateFee(fees, item[1]));

  return answerArr;
}
