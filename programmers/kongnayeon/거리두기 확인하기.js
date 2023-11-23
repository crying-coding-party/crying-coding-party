// 1. 빈 테이블의 상하좌우로 사람이 2명 이상 있는지
// 2. 사람의 상하좌우로 사람이 1명 이상 있는지

function check(place) {
  const dx = [-1, 0, 1, 0]; // 상 우 하 좌
  const dy = [0, 1, 0, -1];

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (place[i][j] === 'O') {
        // 테이블인 경우
        let table = 0; // 빈 테이블 주변에 있는 사람의 수

        for (let dir = 0; dir < 4; dir++) {
          let nx = i + dx[dir];
          let ny = j + dy[dir];

          if (nx < 0 || nx >= 5 || ny < 0 || ny >= 5) continue;

          if (place[nx][ny] === 'P') table++;
        }
        if (table > 1) return 0;
      } else if (place[i][j] === 'P') {
        // 사람인 경우
        let person = 0; // 사람 주변에 있는 사람의 수

        for (let dir = 0; dir < 4; dir++) {
          let nx = i + dx[dir];
          let ny = j + dy[dir];

          if (nx < 0 || nx >= 5 || ny < 0 || ny >= 5) continue;

          if (place[nx][ny] === 'P') person++;
        }
        if (person > 0) return 0;
      } else {
        continue;
      }
    }
  }
  return 1;
}

function solution(places) {
  let [p1, p2, p3, p4, p5] = places;
  let answer = [];

  // console.log(check(p2));

  places.map((place) => answer.push(check(place)));

  //console.log(answer)

  return answer;
}
