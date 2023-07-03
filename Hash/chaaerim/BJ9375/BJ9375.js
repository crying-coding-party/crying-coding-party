const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

solution(input);

function solution([n, ...list]) {
  const num = Number(n);

  while (list.length > 0) {
    const m = Number(list.shift());
    const arr = [];
    for (let i = 0; i < m; i++) {
      arr.push(list.shift());
    }
    hash(arr);
  }
}

function hash(arr) {
  const list = arr.map(i => i.split(' '));
  const map = new Map();
  const cateArr = [];

  for (let i = 0; i < list.length; i++) {
    const [item, category] = list[i];
    if (map.has(category)) {
      let temp = map.get(category) + 1;
      map.set(category, temp);
    } else {
      map.set(category, 1);
    }
    cateArr.push(category);
  }
  const cateSet = new Set(cateArr);
  if (map.size === 1) {
    for (const i of cateSet) {
      const ans = map.get(i);
      console.log(ans);
    }
  } else {
    let ans = 1;
    for (const i of cateSet) {
      ans = ans * (map.get(i) + 1);
    }
    console.log(ans - 1);
  }
}
