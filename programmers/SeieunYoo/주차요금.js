function solution(fees, records) {
  // 두 번째 인자인 차번호를 기준으로 작은 것부터 정렬되도록 sort
  const parseRecords = records.map((item) => item.split(' ')).sort((a, b) => parseInt(a[1]) - parseInt(b[1]));

  var answer = [];

    let time = 0;
    for(let i= parseRecords.length-1; i>=0;i--) {

        if(parseRecords[i][2] === 'IN') {
            // 가장 끝 배열이 IN 으로 끝나기 때문에 나간 기록이 없음 -> 23:59 기준으로 계산
            time += timeStringToMinutes('23:59') - timeStringToMinutes(parseRecords[i][0])

        } else {
            time += timeStringToMinutes(parseRecords[i][0]) - timeStringToMinutes(parseRecords[i-1][0]);
            i--;
        }

        // 차량 종류가 바뀌면 total 주차 요금 계산
        if(i === 0 || (parseRecords[i][1] !== parseRecords[i-1][1])) {
            if(time > fees[0]){
              //추가 요금 계산
                answer.unshift(Math.ceil((time-fees[0])/fees[2]) * fees[3] + fees[1])
            }
            else{
                answer.unshift(fees[1]);
            }

            time = 0;
        }


    }

    return answer
}

function timeStringToMinutes(timeString) {
  const [hours, minutes] = timeString.split(':');
  return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
}
