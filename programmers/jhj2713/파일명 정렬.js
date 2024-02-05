function solution(files) {
  function getHead(str) {
    const [head] = str.split(/\d/);
    return head.toLowerCase();
  }
  function getNumber(num) {
    return Number(num.match(/\d+/)[0]);
  }

  files.sort((a, b) => {
    const aHead = getHead(a);
    const aNumber = getNumber(a);

    const bHead = getHead(b);
    const bNumber = getNumber(b);

    if (aHead === bHead) {
      return aNumber - bNumber;
    }
    return aHead > bHead ? 1 : -1;
  });

  return files;
}
