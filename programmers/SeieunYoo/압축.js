function solution(msg) {
    let answer = [];
    let map = new Map();
    for (let i = 0; i < 26; i++) {
        map.set(String.fromCharCode(65 + i), i + 1);
    }
    
    let w = "";
    let c = "";
    let temp = 0;
    
  for(let i = 0; i < msg.length; i++){
        w = msg[i];
        c = msg[i+1];
      
      //맵에 W+C 가 없으면 추가해준다.
       if(!map.get(w+c)){
           map.set(w+c,map.size + 1);
           answer.push(map.get(w));
       }else{
           //2글자 이상이 맵에 있는지 체크
           while(map.get(w+c)){
               temp = w+c;
               w = w+c;
               c = msg[i+2];
               i++;
           }
           map.set(w+c,map.size + 1);
           answer.push(map.get(temp));
       }
    }
    return answer;
}
