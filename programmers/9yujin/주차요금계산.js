function solution(fees, records) {
  const [defaultTime, defaultFee, unitTime, unitFee] = fees;

  const timeMap = new Map();
  const enterMap = new Map();

  //enter에 있으면 출차처리, 없으면 입차처리
  records.forEach((v) => {
    const [time, car, type] = v.split(" ");
    const [hh, mm] = time.split(":");
    const timeValue = Number(hh) * 60 + Number(mm);

    if (!enterMap.get(car)) {
      enterMap.set(car, timeValue);
    } else {
      timeMap.set(car, timeMap.get(car) ?? 0 + timeValue - enterMap.get(car));
      enterMap.delete(car);
    }
  });

  //아직 출차 안한 차 처리
  Array.from(enterMap, ([car, time]) => {
    const existTime = timeMap.get(car) ?? 0;
    const autoOutTime = 23 * 60 + 59 - time;

    timeMap.set(car, existTime + autoOutTime);
  });

  const times = Array.from(timeMap)
    .map((v) => [Number(v[0]), v[1]])
    .sort((a, b) => a[0] - b[0])
    .map((v) => v[1]);
  console.log(times);
  return times.map((v) =>
    v - defaultTime >= 0
      ? Math.ceil((v - defaultTime) / unitTime) * unitFee + defaultFee
      : defaultFee
  );
}
