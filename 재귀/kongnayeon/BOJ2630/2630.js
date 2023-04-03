const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0].split(' '));

let paper = Array.from(Array(N), () => Array(N).fill(0));

for(let i = 1; i <= N; i++){
  paper[i - 1] = input[i].split(' ').map(Number);
}

let white = 0, blue = 0;

const count = (paper) => {
   
    if(check(paper)){
      paper[0][0] === 0 ? white++ : blue++;
    }else{
      const subPapers = cut(paper);
      subPapers.map((subPaper) => count(subPaper));
    }
}

// 종이가 색으로
const check = (paper) => {
  return (paper.every(((value) => value.every((element) => element === paper[0][0]))));
}

// 4등분
const cut = (paper) => {
  const subPapers = [];
  const length = paper.length;

  for (let i = 0; i < length; i += (length / 2)) {
    for (let j = 0; j < length; j += (length / 2)) {
      const subPaper = paper.slice(i, i + (length / 2)).map(row => row.slice(j, j + (length / 2)));
      subPapers.push(subPaper);
    }
  }

  return subPapers;
}

count(paper);

console.log(white);
console.log(blue);