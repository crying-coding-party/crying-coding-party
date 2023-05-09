const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, C] = input[0].split(' ').map(Number);

let arr = input[1].split(' ').map(Number);

let map = new Map();

arr.map((element, index) => {
    if(map.has(element)){
        let [count, location] = map.get(element);
        count++;
        map.set(element, [count, location]);
    }else{
       map.set(element, [1, index]);
    }
})

arr = [];

for (let [key, value] of map) {   
        arr.push([key, value]);
}

arr.sort(function(a, b){
    return b[1][0] - a[1][0];
})

let newArr = [];

arr.map((element) => {
    for(let i = 0; i < element[1][0]; i++){
        newArr.push(element[0]);
    }
})

console.log(newArr.join(' '));

