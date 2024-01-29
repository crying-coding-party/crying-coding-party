function solution(n, t, m, p) {
    
    //
    //1,3,5,7,9... (1, 1+2, 1+2+2) -> p+m(t-1) (0,...t-1)
    //1,2,3,4,5,6,7 // 1 + 2 (4-1)
    var answer = [];
    let tube = '';
    //console.log(p+m*(t-1))
        for (let i = 0; i < p+m*(t); i++) {
            answer.push(...(i.toString(n)).split(''));
        }
     for (let j = 0; j < t; j++) {
           tube = tube + answer[p+ m * j - 1]
        }
    return tube.toUpperCase();
    
}
