solution(4, 5, [1, 0, 3, 1, 2], [0, 3, 0, 4, 0]);

function solution(cap, n, deliveries, pickups) {
  const deliveryArr = [...deliveries];
  const pickupArr = [...pickups];

  let distance = 0;
  while (deliveryArr.length || pickupArr.length) {
    // 택배 배달할 때 사용하는 짐의 개수
    let boxCount = 0;
    //   태울 수 있는 짐의 개수 셀 때 사용하는 짐의 개수 ..
    let pickupBoxCount = 0;
    while (deliveryArr.length && !deliveryArr[deliveryArr.length - 1]) {
      deliveryArr.pop();
    }
    while (pickupArr.length && !pickupArr[pickupArr.length - 1]) {
      pickupArr.pop();
    }
    distance += Math.max(deliveryArr.length, pickupArr.length);

    while (deliveryArr.length) {
      const delivery = deliveryArr.pop();
      //   const deliveryCount = boxCount + delivery;
      if (boxCount + delivery <= cap) {
        boxCount += delivery;
      } else {
        deliveryArr.push(boxCount + delivery - cap);
        break;
      }
    }

    while (pickupArr.length) {
      const pickup = pickupArr.pop();
      //   const pickupCount = pickupBoxCount + pickup;

      if (pickupBoxCount + pickup <= cap) {
        pickupBoxCount += pickup;
      } else {
        pickupArr.push(pickupBoxCount + pickup - cap);
        break;
      }
    }
  }

  return distance * 2;
}
