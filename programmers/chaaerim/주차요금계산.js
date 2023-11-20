solution(
  [180, 5000, 10, 600],
  [
    '05:34 5961 IN',
    '06:00 0000 IN',
    '06:34 0000 OUT',
    '07:59 5961 OUT',
    '07:59 0148 IN',
    '18:59 0000 IN',
    '19:09 0148 OUT',
    '22:59 5961 IN',
    '23:00 5961 OUT',
  ]
);

function solution(fees, records) {
  let result = [];
  const carMap = new Map();
  const timeMap = new Map();
  const [defaultTime, defaultFee, min, minFee] = fees;

  for (let i = 0; i < records.length; i++) {
    const [time, carNumber, inout] = records[i].split(' ');
    if (carMap.has(carNumber)) {
      const temp = carMap.get(carNumber).split(':');
      const nowTime = time.split(':');

      const tempMin = Number(temp[0]) * 60 + Number(temp[1]);
      const nowTimeMin = Number(nowTime[0]) * 60 + Number(nowTime[1]);

      if (timeMap.has(carNumber)) {
        const minTemp = timeMap.get(carNumber);
        timeMap.set(carNumber, minTemp + (nowTimeMin - tempMin));
      } else {
        timeMap.set(carNumber, nowTimeMin - tempMin);
      }
      carMap.delete(carNumber);
    } else {
      carMap.set(carNumber, time);
    }
  }
  if (carMap.size !== 0) {
    for (let car of carMap) {
      const temp = car[1].split(':');
      const tempMin = Number(temp[0]) * 60 + Number(temp[1]);
      const nowTimeMin = 23 * 60 + 59;

      if (timeMap.has(car[0])) {
        const minTemp = timeMap.get(car[0]);
        timeMap.set(car[0], minTemp + (nowTimeMin - tempMin));
      } else {
        timeMap.set(car[0], nowTimeMin - tempMin);
      }
    }
  }
  const timeArr = Array.from(timeMap);
  timeArr.sort((a, b) => Number(a[0]) - Number(b[0]));

  for (let i = 0; i < timeArr.length; i++) {
    let totalFee = 0;
    if (timeArr[i][1] <= defaultTime) {
      totalFee += defaultFee;
      result.push(totalFee);
    } else if (timeArr[i][1] > defaultTime) {
      totalFee += defaultFee;
      const res = Math.ceil((timeArr[i][1] - defaultTime) / min) * minFee;
      totalFee += res;
      result.push(totalFee);
    }
  }
  //   console.log(carMap, timeArr, result);

  return result;
}
