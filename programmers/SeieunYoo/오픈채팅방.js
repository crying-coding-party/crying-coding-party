function solution(record) {
  var answer = [];
  let user = {};
  let chatAnswer = [];
  record.forEach((rec) => {
    const [order, id, nickname] = rec.split(' ');
    //console.log(order, id, nickname);
    if (order === 'Enter') {
      user[id] = nickname;
      answer.push(['Enter', id]);
      //console.log(answer,user[id]);
    } else if (order === 'Leave') {
      answer.push(['Leave', id]);
      //console.log(answer);
    } else if (order === 'Change') {
      user[id] = nickname;
      //console.log(answer);
    }
  });

  answer.forEach((ans) => {
    if (ans[0] === 'Enter') {
      chatAnswer.push(`${user[ans[1]]}님이 들어왔습니다.`);
    } else if (ans[0] === 'Leave') {
      chatAnswer.push(`${user[ans[1]]}님이 나갔습니다.`);
    }
  });
  return chatAnswer;
}
