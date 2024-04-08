function solution(s) {
  //중괄호 제거해서 배열 형태로 만듬
  const arrays = s
    .slice(1, -1)
    .match(/\{([^}]+)\}/g)
    .map((subStr) => {
      return subStr.slice(1, -1).split(',').map(Number);
    });

  //console.log(arrays);

  //배열 길이가 1이면 얼리 리턴
  if (arrays.length === 1) return arrays[0];

  const mergedArrays = [];

  arrays.sort((a, b) => a.length - b.length);

  for (let i = 0; i < arrays.length - 1; i++) {
    const tmp = i === 0 ? arrays[i] : mergedArrays[i - 1];
    const mergedArray = mergeUnique(tmp, arrays[i + 1]);
    mergedArrays.push(mergedArray);
  }

  return mergedArrays[mergedArrays.length - 1];
}

function mergeUnique(array1, array2) {
  // 배열 합친 후에 중복된 부분만 제거해서 리턴
  const combinedArray = [...array1, ...array2];

  const uniqueElements = Array.from(new Set(combinedArray));
  //console.log(array1, array2, uniqueElements);
  return uniqueElements;
}
