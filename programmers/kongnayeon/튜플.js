function solution(s) {
    const strArr = s.replace("{{", "").replace("}}", "").split("},{");
    // console.log({strArr: strArr})
    
    const splitedArr = strArr.map((str) => str.split(','))
    // console.log({splitedArr: splitedArr});
    
    const sortedArr = splitedArr.sort((a, b) => a.length - b.length);
    // console.log({sortedArr: sortedArr});
    
    const set = new Set();
    const answer = [];
    
    sortedArr.forEach((arr) => 
        arr.forEach((el) => {
        if(!set.has(el)){
             set.add(el);
            answer.push(Number(el));
        }
    }))
    
    // console.log({sortedArr: sortedArr})
    
    return answer;
}
