const input = `9
0 0 0 1 1 1 -1 -1 -1
0 0 0 1 1 1 -1 -1 -1
0 0 0 1 1 1 -1 -1 -1
1 1 1 0 0 0 0 0 0
1 1 1 0 0 0 0 0 0
1 1 1 0 0 0 0 0 0
0 1 -1 0 1 -1 0 1 -1
0 -1 1 0 1 -1 0 1 -1
0 1 -1 1 0 -1 0 1 -1`.split("\n");

const n = parseInt(input[0]);
const integers = input.slice(1).map((inp) => inp.split(" ").map(Number));
const answer = [0, 0, 0];

function recur(count) {
  for (let i = 0; i < n / count; i++) {
    for (let j = 0; j < n / count; j++) {
      const tmp = integers[i * (n / count)][j * (n / count)];
    }
  }
}
