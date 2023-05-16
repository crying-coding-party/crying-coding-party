const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const T = Number(input.shift());

const solution = (N, coin, amount) => {
    for(let i = amount / coin[N - 1]; i !== 0; i--){
        let nowAmount = amount - i;
        
    }
}

for(let i = 0; i < T; i ++){
    let N = Number(input.shift());
    let coin = input[0].shift().split(' ').map(Number);
    let amount = Number(input.shift());
    console.log(solution(N, coin, amount));
}