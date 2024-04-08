//누적합,,그게몽데
//[1,0,0,0]
function solution(play_time, adv_time, logs) {
  const playTime = timeToSecond(play_time);
  const advTime = timeToSecond(adv_time);
  const times = Array(playTime).fill(0);

  //[1,0,0,-1]
  logs.forEach((log) => {
    const [start, end] = log.split('-');
    const startSeconds = timeToSecond(start); // 초단위로 변환
    const endSeconds = timeToSecond(end); // 초단위로 변환
    times[startSeconds]++;
    times[endSeconds]--;
  });

  // 각 시간대별로 시청자수
  for (let i = 1; i <= playTime; i++) {
    times[i] = times[i - 1] + times[i];
  }

  // 누적 재생 시간
  for (let i = 1; i <= playTime; i++) {
    times[i] = times[i - 1] + times[i];
  }

  //advTime 이 5초라면
  //1초-6초
  //2초-7초

  let total = times[advTime - 1];
  let maxStart = 0;

  for (let i = advTime - 1; i < playTime; i++) {
    // 6초-1초 , 7초-2초 사이의 누적 재생횟수 계산
    if (total < times[i] - times[i - advTime]) {
      //최대값 찾으면
      total = times[i] - times[i - advTime];
      //시작 시각을 return 해애되니까 index 에 저장
      maxStart = i - advTime + 1; // 해당 값을 저장
    }
  }

  return changeSecondsToTime(maxStart); // 시간단위로 변환
}

function timeToSecond(time) {
  const time2 = time.split(':');
  return time2[0] * 3600 + time2[1] * 60 + time2[2] * 1;
}

function changeSecondsToTime(time) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time - hours * 3600) / 60);
  let seconds = (time - hours * 3600) % 60;

  return `${hours > 9 ? hours : '0' + hours}:${
    minutes > 9 ? minutes : '0' + minutes
  }:${seconds > 9 ? seconds : '0' + seconds}`;
}
