function solution(cacheSize, cities) {
  let answer = 0;
  let cache = [];
  // 캐시 사이즈가 0이면 캐시를 할 수 없으니 크기 * 5 값이 된다.
  if (cacheSize === 0) return 5 * cities.length;

  cities.forEach((city) => {
    const city2 = city.toLowerCase();

    //city 가 캐시가 존재하지 않다면
    if (!cache.includes(city2)) {
      //만약 캐시 배열의 길이를 초과할 경우에는 가장 오래된 앞에 거를 빼주고 넣어준다.
      if (cache.length === cacheSize) {
        cache.shift();
      }
      cache.push(city2);
      answer = answer + 5;
    } else {
      cache.splice(cache.indexOf(city2), 1);
      cache.push(city2);
      answer = answer + 1;
    }
  });
  return answer;
}
