function solution(gems) {
    const uniqueGems = Array.from(new Set(gems));
    const gemIndexMap = new Map();
    const result = [];
    
    uniqueGems.forEach((gem, i) => {
        gemIndexMap.set(gem, 0);  
    });
    
    //console.log(gemIndexMap);
    for (let i = 0; i < gems.length; i++) {
        const gem = gems[i];
        
        //진열대를 순회하면서 보석의 index 를 업데이트 시켜줌
        gemIndexMap.set(gem, i+1);
        console.log(gemIndexMap);
        const gemIndexArray = Array.from(gemIndexMap.values());
        //console.log(gem,gemIndexMap.get(gem));
        if (!gemIndexArray.includes(0)) {
            const min = Math.min(...gemIndexArray);
            const max = Math.max(...gemIndexArray);
            result.push([min, max]);
        }
    }
    
    result.sort((a, b) => {
        if ((a[1] - a[0]) === (b[1] - b[0])) {
            return a[1] - b[1];
        }
        return (a[1] - a[0]) - (b[1] - b[0])
    })
    
    return result[0];
}
