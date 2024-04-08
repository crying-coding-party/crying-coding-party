// 전부 초 단위로 바꾸기
function calculateTime(str) {
  let time = str.split(':').map(Number);
  return time[0] * 3600 + time[1] * 60 + time[2] * 1;
}

function formatTime(time){
    let hour = time / 3600 >> 0;
    let minute = (time / 60 >> 0) % 60;
    let second = time % 60;
    
    hour = hour > 9 ? hour : '0' + hour;
    minute = minute > 9 ? minute : '0' + minute;
    second = second > 9 ? second : '0' + second;

    return `${hour}:${minute}:${second}`
}


function solution(play_time, adv_time, logs) {
    var answer = '';
   
    const playTime = calculateTime(play_time);
    const advTime = calculateTime(adv_time);
   
    
     const times = new Array(playTime).fill(0);
    
    
    logs.forEach(log => {
        const [start, end] = log.split('-');
        
        const calcStart = calculateTime(start);
        const calcEnd = calculateTime(end);
        
        times[calcStart]++;
        times[calcEnd]--;
    })
    
    // 시청자 수, 재생횟수 각각 구간합으로 구하기
    for(let i = 1; i <= playTime; i++)
      times[i] += times[i-1];
    
     for(let i = 1; i <= playTime; i++)
      times[i] += times[i-1];
    
    let sum = times[advTime - 1];
    let index = 0;
    
    for(let i = advTime - 1; i < playTime; i++){
        if(sum < times[i] - times[i - advTime]){
            sum = times[i] - times[i - advTime];
            index = i - advTime + 1;
        }
    }
   
    return formatTime(index);
}
