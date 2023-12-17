solution(4, 5, [1, 0, 3, 1, 2], [0, 3, 0, 4, 0]);

function solution(cap, n, deliveries, pickups) {
  const deliveryMap = new Map();
  const pickupMap = new Map();
  let totalDeliveryCount = 0;

  for (let i = 0; i < deliveries.length; i++) {
    deliveryMap.set(i, deliveries[i]);
    pickupMap.set(i, pickups[i]);
    totalDeliveryCount += deliveries[i];
  }

  //   내릴 수 있는 짐의 개수
  let boxCount = 0;

  //   태울 수 있는 짐의 개수 셀 때 사용하는 짐의 개수 ..
  let count = 0;
  let distance = 0;
  let j = 0;
  while (deliveryMap.size !== 0 && pickupMap.size !== 0 && totalDeliveryCount !== 0) {
    cap < totalDeliveryCount ? (boxCount = cap) : (boxCount = totalDeliveryCount);
    count = boxCount;
    distance += Math.max(deliveryMap.size, pickupMap.size);

    if (pickupMap.get(pickupMap.size - 1) === 0) {
      pickupMap.delete(pickupMap.size - 1);
    }
    if (deliveryMap.get(deliveryMap.size - 1) === 0) {
      deliveryMap.delete(deliveryMap.size - 1);
    }

    for (let i = deliveryMap.size; i >= 0; i--) {
      if (deliveryMap.has(i) && deliveryMap.get(i) !== 0) {
        let delivery = deliveryMap.get(i);

        // 해당 집에 배달해야 하는 양이 더 많을 때
        if (delivery > boxCount) {
          delivery -= boxCount;
          totalDeliveryCount -= boxCount;

          count -= boxCount;
          boxCount = 0;

          deliveryMap.set(i, delivery);
        } else {
          // 해당 집에 줘야하는 택배를 다 배달할 수 있을 때
          totalDeliveryCount -= delivery;
          boxCount -= delivery;
          count -= delivery;
          delivery = 0;
          deliveryMap.set(i, delivery);
          // deliveryMap.delete(i);
        }
      }
      if (deliveryMap.get(deliveryMap.size - 1) === 0) {
        deliveryMap.delete(deliveryMap.size - 1);
      }
    }

    for (let i = pickupMap.size; i >= 0; i--) {
      if (pickupMap.has(i) && pickupMap.get(i) !== 0) {
        let pickup = pickupMap.get(i);
        // 현재 트럭에 담을 공간이 남아 있는 경우
        if (count < cap) {
          let canPickupCount = cap - count;
          //   차에 가져갈 수 있는 것보다 가져가야하는 택배 박스가 많은 경우
          if (pickup > canPickupCount) {
            pickup -= canPickupCount;
            count = cap;
            pickupMap.set(i, pickup);
            // 널널해서 차에 택배박스 다 채울 수 있는 경우
          } else {
            count += pickup;
            pickup = 0;
            pickupMap.set(i, pickup);

            // pickupMap.delete(i);
          }
        }

        if (pickupMap.get(pickupMap.size - 1) === 0) {
          pickupMap.delete(pickupMap.size - 1);
        }
      }

      //   console.log(deliveryMap, pickupMap, boxCount, count, totalDeliveryCount);
    }

    // console.log(deliveryMap, pickupMap, count, totalDeliveryCount);

    // console.log(distance);
  }
  console.log(cap, n, deliveryMap, pickupMap, distance);
  return distance * 2;
}
