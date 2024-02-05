function solution(files) {

    let answer = files;
    answer.sort(function(a, b) {
        // 정규 표현식을 사용하여 헤더와 숫자 추출
        let regex = /([^\d]+)(\d+)/;
        let matchA = a.match(regex);
        let matchB = b.match(regex);

        // 헤더를 비교하여 정렬
        let headerComparison = matchA[1].toLowerCase().localeCompare(matchB[1].toLowerCase());
        if (headerComparison !== 0) {
            return headerComparison;
        }

        // 헤더가 같을 경우 숫자 부분을 비교하여 정렬
        return Number(matchA[2]) - Number(matchB[2]);
    });
    return answer;
}

console.log(solution([["img12.png", "img10.png", "img02.png", "img1.png", "IMG01.GIF", "img2.JPG"]));
