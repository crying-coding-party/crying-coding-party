function solution(n, k, cmd) {
  let array = Array.from({ length: n }, (_, index) => Number(index)); // 원본 배열 저장
  let changedArray = Array.from({ length: n }, (_, index) => Number(index)); // 명령어에 따라 바뀐 배열
  let currentIndex = Number(k); // 명령어에 따라 움직이는 인덱스
  let deletedItem = [];
  let answer = [];

  //console.log(array);
  cmd.forEach((item) => {
    const [i, _, num] = item.split('');
    //console.log(i, num);
    if (i === 'D') {
      currentIndex = currentIndex + Number(num);
      //console.log(currentIndex);
    } else if (i === 'U') {
      currentIndex = currentIndex - Number(num);
    } else if (i === 'C') {
      deletedItem.push([currentIndex, changedArray[currentIndex]]);
      //console.log(deletedItem);
      changedArray.splice(currentIndex, 1);
      // console.log(changedArray);
      // console.log(currentIndex, '마지막');
      if (currentIndex === changedArray.length) {
        currentIndex = currentIndex - 1;
      }
    } else if (i === 'Z') {
      const beforeItem = changedArray[currentIndex];
      //console.log('z', beforeItem, currentIndex, changedArray);
      const lastDeleteItem = deletedItem[deletedItem.length - 1];
      deletedItem.pop();
      changedArray.splice(lastDeleteItem[0], 0, lastDeleteItem[1]); //삭제한 아이템을 원래 인덱스로 도로 넣어준다.
      currentIndex = changedArray.indexOf(beforeItem);
      //console.log('2z', lastDeleteItem, currentIndex, changedArray);
    }
  });

  array.forEach((item) =>
    changedArray.includes(item) ? answer.push('O') : answer.push('X')
  );
  // console.log(changedArray, array, answer);
  return answer.join('');
}
