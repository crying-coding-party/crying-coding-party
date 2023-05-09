const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const [n, ...input] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(/[ \n]+/);

reversed = input.map((element) => Number(element.split('').reverse().join('')));

reversed.sort(function(a, b){
    return a - b;
});

reversed.map((element) => console.log(element));
