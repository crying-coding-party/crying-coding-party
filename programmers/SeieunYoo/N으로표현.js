function solution (N, number)  {
    const dp = Array.from(new Array(9), (value, idx) => idx === 0 ? [] : [parseInt(`${N}`.repeat(idx))]); //[[], [N], [NN], [NNN]....]

    for (let i = 1; i < 9; i++) {
        for (let j = 1; j < i; j++) {
            for (const first of dp[j]) {
                for (const second of dp[i - j]) {
                    //dp[3] (N을 3번 쓴 경우) -> dp[1] 사칙연산 dp[2] , dp[2] 사칙연산 dp[1]
                    dp[i].push(first + second);
                     dp[i].push(first - second);
                    dp[i].push(first * second);
                    dp[i].push(first / second);
                }
            }
        }

        dp[i] = Array.from(new Set(dp[i])); //Set 을 통해서 중복된 연산 결과 제거

        if (dp[i].includes(number)) {
            return i;
        }
    }
    return -1;
}
