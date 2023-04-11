const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input2.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, w, L] = input.shift().split(' ').map(Number);
const truck = input[0].split(' ').map(Number);

const queue = Array(w).fill(0);
let time = 0;
let sum = 0;

while (queue.length > 0) {
  sum = queue.reduce((acc, cur) => acc + cur, 0) - queue.shift();

  if (truck.length > 0) {
    if (sum + truck[0] <= L) {
      const firstTruck = truck.shift();
      sum = sum + firstTruck;
      queue.push(firstTruck);
    } else {
      queue.push(0);
    }
  }
  time++;
  
}

console.log(time);
