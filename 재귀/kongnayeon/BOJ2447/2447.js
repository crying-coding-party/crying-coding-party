const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0].split(' '));

let pattern = Array.from(Array(N), () => Array(N).fill('*'));

const punch = (i, j, N) => {
    if(Math.floor(i % 3) === 1 && Math.floor(j % 3) === 1){
        pattern[i][j] = ' ';
    }else{
        if(N === 1)return;
        else if((Math.floor(i / N) % 3 == 1) && (Math.floor(j / N ) % 3 == 1)) pattern[i][j] = ' ';
        else punch(i, j, N / 3);
    }
}
// Math.floor...


for(let i = 0; i < N; i++){
    for(let j = 0; j < N; j++){
        punch(i, j, N)
    }
}


pattern.forEach(row => console.log(row.join("")));