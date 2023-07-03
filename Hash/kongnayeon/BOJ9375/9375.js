const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const T = Number(input.shift());

for (let i = 0; i < T; i++) {
    let dict = {};
    let N = Number(input.shift());

    for (let j = 0; j < N; j++) {
        let arr = input.shift().split(' ');
        if (arr[1] in dict) dict[arr[1]] += 1;
        else dict[arr[1]] = 1;
    }

    let result = 1;

    for (let key in dict) {
        if (dict.hasOwnProperty(key)) {
            result *= dict[key] + 1; // 안 입는 경우 + 1
        }
    }

    result--; // 전부 다 안 입는 경우

    console.log(result);
}
