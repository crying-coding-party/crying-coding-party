function solution(cap, n, deliveries, pickups) {
  let answer = 0;
  // 배달할 집 중 가장 먼 집, 수거할 집 중 가장 먼 집의 index 저장
  let deliveryLastIndex = n - 1,
    pickupLastIndex = n - 1;

  while (true) {
    let lastIndex = 0; // 배달/수거할 집 중 가장 먼 집의 index
    // 배달
    let currentDeliverCapacity = cap;
    for (let i = deliveryLastIndex; i >= 0; i--) {
      if (deliveries[i] > 0) {
        // 배달할 물건이 있는 경우
        lastIndex = Math.max(lastIndex, i + 1);
        const curDelivery = deliveries[i];
        if (deliveries[i] > currentDeliverCapacity) {
          // 현재 배달할 집의 택배 수가 capacity보다 큰 경우
          deliveries[i] -= currentDeliverCapacity;
          currentDeliverCapacity = 0;
        } else {
          // 현재 배달할 집의 택배 수가 capacity보다 작거나 같은 경우
          currentDeliverCapacity -= curDelivery;
          deliveries[i] = 0;
          deliveryLastIndex = i - 1;
        }
      } else {
        deliveryLastIndex = i - 1;
      }

      if (currentDeliverCapacity === 0) {
        // 더 이상 배달할 수 없는 경우
        break;
      }
    }

    // 수거
    let currentPickupCapacity = cap;
    for (let i = pickupLastIndex; i >= 0; i--) {
      if (pickups[i] > 0) {
        // 수거할 물건이 있는 경우
        lastIndex = Math.max(lastIndex, i + 1);
        const curPickup = pickups[i];
        if (pickups[i] > currentPickupCapacity) {
          // 현재 수거할 집의 택배 수가 capacity보다 큰 경우
          pickups[i] -= currentPickupCapacity;
          currentPickupCapacity = 0;
        } else {
          // 현재 수거할 집의 택배 수가 capacity보다 작거나 같은 경우
          currentPickupCapacity -= curPickup;
          pickups[i] = 0;
          pickupLastIndex = i - 1;
        }
      } else {
        pickupLastIndex = i - 1;
      }

      if (currentPickupCapacity === 0) {
        // 더 이상 수거할 수 없는 경우
        break;
      }
    }

    answer += lastIndex * 2;

    if (deliveryLastIndex < 0 && pickupLastIndex < 0) {
      break;
    }
  }

  return answer;
}
