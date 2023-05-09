const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input3.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, C] = input.shift();
const array = input[0].split(' ').map(Number);

let newArray = [];
let answerArray = [];

for (let i = 0; i < array.length; i++) {
  const keyArray = newArray.map((item) => item[0]);

  if (keyArray.includes(array[i])) {
    const index = newArray.findIndex((element) => element[0] == array[i]);
    const [key, value] = newArray[index];
    newArray[index] = [key, value + 1];
  } else {
    newArray.push([array[i], 1]);
  }
}

newArray.sort(function (a, b) {
  return b[1] - a[1];
});

for (let i = 0; i < newArray.length; i++) {
  for (let j = 0; j < newArray[i][1]; j++) {
    answerArray.push(newArray[i][0]);
  }
}

console.log(answerArray.join(' '));
