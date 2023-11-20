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

// 입차 -> 출차
// 입출차 시간이 00:00 -> 23:59 로 주어지기 때문에 in out이 사실 필요가 없음.
// 처음 들어오면 in이고 이미 map에 존재하면 out.
function solution(fees, records) {
  let result = [];
  // 입출차를 따지기 위한 map
  const carMap = new Map();

  // 차량번호를 작은 순서대로 정렬해야 하므로 차량번호와 시간을 같이 가지고 있어야함.
  // 따라서 시간 계산용 map을 하나 더 생성.
  const timeMap = new Map();
  const [defaultTime, defaultFee, min, minFee] = fees;

  for (let i = 0; i < records.length; i++) {
    const [time, carNumber, inout] = records[i].split(' ');
    // 이미 map에 해당 차 번호가 있는 경우
    if (carMap.has(carNumber)) {
      const temp = carMap.get(carNumber).split(':');
      const nowTime = time.split(':');

      // 시간 계산.
      const tempMin = Number(temp[0]) * 60 + Number(temp[1]);
      const nowTimeMin = Number(nowTime[0]) * 60 + Number(nowTime[1]);

      // 이미 time이 있는 경우
      if (timeMap.has(carNumber)) {
        // 계산 후 map에 setting
        const minTemp = timeMap.get(carNumber);
        timeMap.set(carNumber, minTemp + (nowTimeMin - tempMin));
      } else {
        // time이 없으면 현재 입출차 시간만 계산해서 넣어주면 됨.
        timeMap.set(carNumber, nowTimeMin - tempMin);
      }

      // 차 시간 계산 다 했으면 map에서 지워주어야함.
      // in, out 비교를 안하고 map의 존재 여부로 입출차를 따지기 때문.
      carMap.delete(carNumber);
    } else {
      carMap.set(carNumber, time);
    }
  }
  // 만약 입차만 하고 출차하지 못한 차가 있다면
  if (carMap.size !== 0) {
    for (let car of carMap) {
      // 23:59분에 나간만큼 시간 계산 필요
      const temp = car[1].split(':');
      const tempMin = Number(temp[0]) * 60 + Number(temp[1]);
      const nowTimeMin = 23 * 60 + 59;

      // 시간 계산을 다 한다음에 이미 계산 해놓은 time에 해당 차 번호가 있으면 더해주고
      // 아니면 시간만 세팅
      // in, out, in을 한 차가 있을수도 있기 때문.
      if (timeMap.has(car[0])) {
        const minTemp = timeMap.get(car[0]);
        timeMap.set(car[0], minTemp + (nowTimeMin - tempMin));
      } else {
        timeMap.set(car[0], nowTimeMin - tempMin);
      }
    }
  }

  // 차번호 작은 순서대로 sorting
  const timeArr = Array.from(timeMap);
  timeArr.sort((a, b) => Number(a[0]) - Number(b[0]));

  // 요금 계산~
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
