const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input2.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');

const a = Number(input.shift());

function solution(array) {
    let max = array[array.length - 1];
    let result = 0;
  
    for (let i = array.length - 2; i >= 0; i--) {
      if (array[i] > max) { //array[i] 가 더 크다면 max 값 갱신
        max = array[i];
      } else {
    
        result += max - array[i]; //array[i] 가 더 작다면 이익 계산
      }
    }
  
    console.log(result);
  }

for(let i =0; i< a;i ++){
    const num = Number(input.shift());
    const array = input.shift().split(" ").map(Number);
    solution(num,array);
}