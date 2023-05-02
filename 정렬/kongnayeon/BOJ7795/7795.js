const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const T = Number(input.shift());

const solution = (A, B) => {
    let count = 0;
    A.map((a) => {
        B.map((b) => {
            if(a > b) count++;
        })
    })
    return count;
}

for(let i = 0; i < T * 3; i += 3){
    let [N, M] = input[i].split(' ').map(Number);
    let A = input[i + 1].split(' ').map(Number);
    let B = input[i + 2].split(' ').map(Number);
    console.log(solution(A, B));
}