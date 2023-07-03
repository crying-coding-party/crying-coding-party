const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const answer = [];
const testCase = [];

for (let i = 1, idx = 0; i < input.length; i++, idx++) {
  const n = Number(input[i++]);
  testCase.push([]);
  for (let j = 0; j < n; j++) {
    testCase[idx].push(input[i++].split(" "));
  }

  i -= 1;
}

testCase.forEach((clothes) => {
  const clothMap = new Map();

  clothes.forEach((cloth) => {
    const [_, category] = cloth;
    clothMap.set(category, clothMap.has(category) ? clothMap.get(category) + 1 : 1);
  });

  let count = 1;
  for (const clothCount of clothMap.values()) {
    count *= clothCount + 1;
  }
  answer.push(count - 1);
});

console.log(answer.join("\n"));
