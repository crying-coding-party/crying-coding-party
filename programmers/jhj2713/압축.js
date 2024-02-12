function solution(msg) {
  const answer = [];
  const charArr = new Array(26).fill().map((_, i) => String.fromCharCode(65 + i));

  /**
   * { A: 1, B: 2, ..., Z: 26 }
   */
  const dictionary = Object.fromEntries(
    charArr.map((char, idx) => {
      return [char, idx + 1];
    })
  );
  let dictionaryCount = 27;

  for (let i = 0; i < msg.length; i++) {
    let acc = 1;
    while (i + acc <= msg.length) {
      if (dictionary[msg.slice(i, i + acc)]) {
        acc += 1;
      } else {
        break;
      }
    }

    // 현재 사전에 있는 글자까지 answer에 push
    answer.push(dictionary[msg.slice(i, i + acc - 1)]);
    // 현재 사전에 없는 acc 부분까지 answer에 push
    dictionary[msg.slice(i, i + acc)] = dictionaryCount++;
    i += acc - 2 < 0 ? 0 : acc - 2;
  }

  return answer;
}
