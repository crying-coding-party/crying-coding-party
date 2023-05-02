const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, L] = input.shift().split(" ").map(Number);
const graph = input.map((v) => v.split(" ").map(Number));
let ans = 0;

const checkRoad = (road) => {
  let count = 1;
  let now = road[0];
  let flag = true;

  road.forEach((v, i) => {
    if (i > 0) {
      console.log(i, now, v, count);
      if (now === v) {
        //평지
        count += 1;
      } else if (now + 1 === v) {
        //오르막길
        if (count < L && exist[i] === 1) {
          flag = false;
        } else {
          //경사놓기
          for (let j = now; j > now - L; j--) {
            exist[j] = 1;
          }
        }

        count = 1;
      } else if (now + 1 < v) {
        count = 1;
        flag = false;
      }
      now = v;
    }
  });
  return flag;
};

/* graph.forEach((v) => {
  console.log(checkRoad(v), checkRoad([...v].reverse()));
}); */

console.log(checkRoad([...graph[2]]));
