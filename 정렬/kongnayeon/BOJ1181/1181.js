const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input.shift());

const arr = [];

for (let i = 0; i < N; i++) {
    arr.push(input[i]);
}

// 중복 제거
let newArr = [...new Set(arr)];

// 사전순 정렬
newArr.sort(function(a, b){
    return a > b ? 1 : (a < b ? -1 : 0);
});

// 길이순 정렬
newArr.sort(function(a, b){
    return a.length - b.length;
});

newArr.map((element) => console.log(element));