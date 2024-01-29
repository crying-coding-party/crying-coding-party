function solution(gems) {
  let answer = [0, gems.length];
  const gemCount = new Set(gems).size;

  let left = -1,
    right = -1; // 투포인터
  const selectedGem = {};
  let selectedGemCount = 0;

  while (true) {
    if (selectedGemCount < gemCount) {
      // 현재 선택된 gem 종류가 총 gem 종류보다 적으면 right++ 해서 모든 종류를 선택할 수 있도록 한다
      right += 1;

      if (right === gems.length) {
        break;
      }

      if (!selectedGem[gems[right]]) {
        selectedGem[gems[right]] = 1;
        selectedGemCount += 1;
      } else {
        selectedGem[gems[right]] += 1;
      }
    } else {
      // 현재 선택된 gem 종류가 총 gem 종류와 같으면 left++ 해서 가장 짧은 구간을 찾을 수 있게 한다
      left += 1;

      if (left === gems.length) {
        break;
      }

      selectedGem[gems[left]] -= 1;
      if (selectedGem[gems[left]] === 0) {
        selectedGemCount -= 1;
      }
    }

    if (selectedGemCount === gemCount) {
      // 현재 선택된 gem 종류가 총 gem 종류와 같으면 현재 선택 구간이 가장 짧은 구간인지 확인한다
      const leftIdx = left + 2,
        rightIdx = right + 1;
      // left + 2, right + 1

      if (answer[1] - answer[0] > rightIdx - leftIdx) {
        answer = [leftIdx, rightIdx];
      }
    }
  }

  return answer;
}
