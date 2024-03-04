function solution(cap, n, deliveries, pickups) {
  let distance = 0;

  //배달해야하는 화물, 수거해야할 화물 모두 0이되면 종료
  while (deliveries.length || pickups.length) {
    //시간초과가 나서 뒤에서부터 0인 요소들은 제거......
    while (deliveries.length && !deliveries[deliveries.length - 1]) {
      deliveries.pop();
    }
    while (pickups.length && !pickups[pickups.length - 1]) {
      pickups.pop();
    }

    //배달할 수 있는 가장 먼 거리의 집을 먼저 간다.
    let len = Math.max(deliveries.length, pickups.length);
    distance += len * 2;

    let deliverNum = cap;
    for (let i = deliveries.length - 1; i >= 0; i--) {
      if (deliveries[i] >= deliverNum) {
        deliveries[i] = deliveries[i] - deliverNum;
        break;
      } else {
        deliverNum = deliverNum - deliveries[i];
        deliveries[i] = 0;
      }
    }
    //console.log(deliveries);

    let pickupsNum = cap;
    for (let i = pickups.length - 1; i >= 0; i--) {
      if (pickups[i] >= pickupsNum) {
        pickups[i] = pickups[i] - pickupsNum;
        break;
      } else {
        pickupsNum = pickupsNum - pickups[i];
        pickups[i] = 0;
      }
    }
  }
  console.log(distance);
  return distance;
}

solution(4, 5, [1, 0, 3, 1, 2], [0, 3, 0, 4, 0]);
