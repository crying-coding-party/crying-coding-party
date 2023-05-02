const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const T = Number(input.shift());

const solution = (A, B) => {
    A.sort((a, b) => a - b);
    B.sort((a, b) => a - b);

    let count = 0;

    A.forEach((a) => {
        B.forEach((b) => {
            if(a > b) count++;
            else return;
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