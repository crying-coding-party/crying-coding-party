const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input3.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m, x, y] = input[0].split(' ').map(Number);
const map = input.slice(1, 1 + n).map((row) => row.split(' ').map(Number));
const directions = input[input.length - 1].split(" ").map(Number);

const dice = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  front: 0,
  back: 0,
};

/**
 * 1동족 -> right 가 bottom으로 left 가 top으로 이동됨 front back 그대로 top 은 right 로 bottom은 left
 * 2서쪽 -> left 가 bottom으로 right 가 top으로 이동됨 front back 그대로 top은 left 로 bottom은 right
 * 3북쪽 -> front 가 bottom으로 back 이 top 으로 이동됨 left right 그대로 top은 front로 bottom은 back
 * 4남쪽 -> back이 bottom으로 front 가 top으로 이동됨 left right 그대로 top은 back으로 bottom은 front 
 */

function diceMove(num) {
    const { top, bottom, left, right,front,back } = dice;
    if (num === 1) {
        dice.top = left;
        dice.bottom = right;
        dice.left = bottom;
        dice.right = top;
        dice.front = front;
        dice.back = back;
      } else if (num === 2) {
        dice.top = right;
        dice.bottom = left;
        dice.left = top;
        dice.right = bottom;
        dice.front = front;
        dice.back = back;
      } else if (num === 3) {
        dice.top = back;
        dice.bottom = front;
        dice.left = left;
        dice.right = right;
        dice.front = top;
        dice.back = bottom;
      } else if (num === 4) {
        dice.top = front;
        dice.bottom = back;
        dice.left = left;
        dice.right = right;
        dice.front = bottom;
        dice.back = top;
      }
    
}

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

function solution(x,y){
  for (let i=0; i< directions.length; i++) {
    const nx = x + dx[directions[i] - 1];
    const ny = y + dy[directions[i] - 1];
    if (nx < 0 || ny < 0 || nx >= n || ny >= m) {
      continue;
    }
    diceMove(directions[i]);
    if (map[nx][ny] === 0) {
      map[nx][ny] = dice.bottom;
    } else {
      dice.bottom = map[nx][ny];
      map[nx][ny] = 0;
    }
    console.log(dice.top);
    x = nx;
    y = ny;
  }
}

solution(x,y);