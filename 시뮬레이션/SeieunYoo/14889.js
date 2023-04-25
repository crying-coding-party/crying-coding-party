const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input2.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = Number(input[0]);
const board = input.slice(1, 1 + n).map((row) => row.split(' ').map(Number));

let ans = Infinity;

const isSelected = Array(n).fill(false);

function getAbilityDifference() {
  let teamStart = 0;
  let teamLink = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      if (isSelected[i] && isSelected[j]) {
        teamStart += board[i][j] + board[j][i];
      } else if (!isSelected[i] && !isSelected[j]) {
        teamLink += board[i][j] + board[j][i];
      }
    }
  }

  return Math.abs(teamStart - teamLink);
}

function backtrack(index, count) {
  if (count === n / 2) {
    const abilityDifference = getAbilityDifference();
    ans = Math.min(ans, abilityDifference);
    return;
  }

  for (let i = index; i < n; i++) {
    if (!isSelected[i]) {
      isSelected[i] = true;
      backtrack(i + 1, count + 1);
      isSelected[i] = false;
    }
  }
}

backtrack(0, 0);

console.log(ans);
