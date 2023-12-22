function solution(cap, n, deliveries, pickups) {
  let answer = 0;
  let give = 0;
  let get = 0;
  let cnt = 0;

  // 먼 곳부터
  for (let i = n - 1; i >= 0; i--) {
    // 배달해야 하거나 회수해야 할 박스가 있다면
    if (deliveries[i] != 0 || pickups[i] != 0) {
      cnt = 0;
      while (give < deliveries[i] || get < pickups[i]) {
        // i까지 몇 번 가야 하는지
        cnt++;
        // 한 번 움직이고 나면 cap만큼 배달, 수거 가능
        give += cap;
        get += cap;
      }

      // 실제 배달, 수거된 박스의 수
      give -= deliveries[i];
      get -= pickups[i];

      // 누적 이동 거리
      answer = answer + (i + 1) * cnt * 2;
    }
  }
  return answer;
}
