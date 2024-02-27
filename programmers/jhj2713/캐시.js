function solution(cacheSize, cities) {
  let answer = 0;
  let cache = [];

  cities
    .map((city) => city.toLowerCase())
    .forEach((city) => {
      if (cache.includes(city)) {
        // cache hit
        cache = cache.filter((c) => c !== city);
        cache.push(city);

        answer += 1;
      } else {
        // cache miss
        if (cache.length === cacheSize) {
          cache.shift();
        }
        if (cache.length + 1 <= cacheSize) {
          // cacheSize가 0인 경우 처리
          cache.push(city);
        }

        answer += 5;
      }
    });

  return answer;
}
