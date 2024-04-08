// 처음에는 로그의 시작 시간을 공익광고의 시작 시간으로 가정하면서 최적의 공익광고 시간을 탐색하려고 했는데
// 시간초과날거같음
function solution(play_time, adv_time, logs) {
  const playTimeSecond = getSecond(play_time);
  const advTimeSecond = getSecond(adv_time);
  const startLogSecond = logs.map((log) => {
    const [startTime] = log.split("-");
    return getSecond(startTime);
  });
  const endLogSecond = logs.map((log) => {
    const [, endTime] = log.split("-");
    return getSecond(endTime);
  });

  const totalTime = new Array(playTimeSecond + 1).fill(0);
  // x 시각에 시작된 재생 구간의 개수 – x 시각에 종료된 재생구간의 개수
  for (let i = 0; i < logs.length; i++) {
    totalTime[startLogSecond[i]] += 1;
    totalTime[endLogSecond[i]] -= 1;
  }

  // x ~ x+1 구간에 재생중인 구간의 개수
  for (let i = 1; i < playTimeSecond; i++) {
    totalTime[i] += totalTime[i - 1];
  }

  // 누적 재생구간
  for (let i = 1; i < playTimeSecond; i++) {
    totalTime[i] += totalTime[i - 1];
  }

  let maxSecond = 0,
    maxStartSecond = 0;
  // 최대 누적 재생구간 구하기
  for (let i = advTimeSecond - 1; i < playTimeSecond; i++) {
    if (i >= advTimeSecond) {
      if (maxSecond < totalTime[i] - totalTime[i - advTimeSecond]) {
        maxSecond = totalTime[i] - totalTime[i - advTimeSecond];
        maxStartSecond = i - advTimeSecond + 1;
      }
    } else {
      if (maxSecond < totalTime[i]) {
        maxSecond = totalTime[i];
        maxStartSecond = i - advTimeSecond + 1;
      }
    }
  }

  const startHour = String(Math.floor(maxStartSecond / 3600)).padStart(2, "0");
  const startMinute = String(Math.floor((maxStartSecond - startHour * 3600) / 60)).padStart(2, "0");
  const startSecond = String(maxStartSecond - startHour * 3600 - startMinute * 60).padStart(2, "0");

  return `${startHour}:${startMinute}:${startSecond}`;
}

function getSecond(time) {
  const [hour, minute, second] = time.split(":").map(Number);
  return hour * 3600 + minute * 60 + second;
}
