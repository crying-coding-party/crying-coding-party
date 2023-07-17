class Queue {
    constructor() {
      this.queue = [];
      this.front = 0;
      this.rear = 0;
    }
    enqueue(value) {
      this.queue[this.rear++] = value;
    }
    dequeue() {
      const value = this.queue[this.front];
      delete this.queue[this.front];
      this.front += 1;
      return value;
    }
    isEmpty() {
      return this.rear === this.front;
    }
  }
  
  const DR = [1, -1, 0, 0];
  const DC = [0, 0, 1, -1];
  
  function solution(n, computers) {
    let answer = 0;
    const visited = Array.from(Array(n), () => new Array(n).fill(false));
    const mapList = Array.from(Array(n), () => new Array(0));
  
    //   네트워크 리스트 만들기
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (computers[i][j] === 1) mapList[i].push(j);
      }
    }
  
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (computers[i][j] === 1 && visited[i][j] !== true) {
          answer += bfs(i, j, visited, n, mapList);
          visited[i][j] = true;
        }
      }
    }
    return answer;
  }
  
  function bfs(c, r, visited, n, mapList) {
    if (visited[c][r] === true) {
      return 0;
    }
    const queue = new Queue();
    for (let i = 0; i < mapList[c].length; i++) {
      queue.enqueue([c, mapList[c][i]]);
      visited[c][mapList[c][i]] = true;
    }
  
    while (!queue.isEmpty()) {
      const [nowc, nowr] = queue.dequeue();
  
      if (mapList[nowr].length !== 0) {
        for (let i = 0; i < mapList[nowr].length; i++) {
          if (visited[nowr][mapList[nowr][i]] !== true) {
            queue.enqueue([nowr, mapList[nowr][i]]);
            visited[nowr][mapList[nowr][i]] = true;
          }
        }
      }
    }
  
    return 1;
  }