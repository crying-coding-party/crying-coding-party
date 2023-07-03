const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, P, Q] = input.shift().split(' ');

const dict = {};
dict[0] = 1;

const find = (num) => {
    if (num in dict) return dict[num];

    return (dict[num] = find(Math.floor(num / P)) + find(Math.floor(num / Q)));
};

console.log(find(N));
