function getMin(time) {
  let hour = Number(time[0] + time[1]) * 60;
  let min = Number(time[3] + time[4]);
  return hour + min;
}

function solution(n, t, m, timetable) {
  let time = getMin('09:00');

  let crew = timetable.map((el) => getMin(el)).sort((a, b) => a - b);

  for (let i = 0; i < n; i++) {
    let ride = crew.filter((c) => c <= time).length;
    if (i === n - 1) {
      if (ride >= m) time = crew[m - 1] - 1;
    } else {
      crew.splice(0, ride > m ? m : ride);
      time += t;
    }
  }

  return (
    String(Math.floor(time / 60)).padStart(2, '0') +
    ':' +
    String(Math.floor(time % 60)).padStart(2, '0')
  );
}
