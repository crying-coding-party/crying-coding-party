function solution(msg) {
  const dictionary = {};
  for (let i = 1; i <= 26; i++) {
    dictionary[String.fromCharCode(i + 64)] = i;
  }
  const answer = [];
  let word = '';
  let idx = 27;

  let i = 0;
  while (i < msg.length) {
    word += msg[i];
    if (!(word in dictionary)) {
      dictionary[word] = idx;
      idx++;
      word = word.slice(0, -1);
      answer.push(dictionary[word]);
      word = '';
      continue;
    }
    i++;
  }

  if (word) {
    answer.push(dictionary[word]);
  }

  return answer;
}
