function solution(fees, records) {
  const car = {};
  const timeSum = {};
  const [defaultTime, defaultFee, overTime, overFee] = fees;

  records.forEach((record) => {
    const [time, id, type] = record.split(" ");
    if (type === "IN") {
      car[id] = time;
    } else {
      // 요금 계산
      const inTime = car[id];
      const minuteInterval = getMinuteInterval(inTime, time);
      if (timeSum[id]) {
        timeSum[id] += minuteInterval;
      } else {
        timeSum[id] = minuteInterval;
      }

      delete car[id];
    }
  });

  Object.entries(car).forEach(([key, value]) => {
    // 출차 시간을 23:59로 간주하고 계산
    const minuteInterval = getMinuteInterval(value, "23:59");

    if (timeSum[key]) {
      timeSum[key] += minuteInterval;
    } else {
      timeSum[key] = minuteInterval;
    }
  });

  const result = {};

  Object.entries(timeSum).forEach(([car, timeSum]) => {
    const currentOverTime = timeSum - defaultTime;
    if (currentOverTime <= 0) {
      result[car] = defaultFee;
      return;
    }
    result[car] = defaultFee + Math.ceil(currentOverTime / Number(overTime)) * overFee;
  });

  return Object.keys(result)
    .sort((a, b) => Number(a) - Number(b))
    .map((id) => result[id]);
}

function getMinuteInterval(inTime, outTime) {
  const [inHour, inMinute] = inTime.split(":").map(Number);
  const [outHour, outMinute] = outTime.split(":").map(Number);

  const inMinuteInterval = inHour * 60 + inMinute;
  const outMinuteInterval = outHour * 60 + outMinute;

  return outMinuteInterval - inMinuteInterval;
}
