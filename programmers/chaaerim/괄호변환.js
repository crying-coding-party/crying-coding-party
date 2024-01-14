solution('()))((()');

function solution(p) {
  const stack = [];

  for (let i = 0; i < p.length; i++) {
    if (p[i] === '(') {
      stack.push(p[i]);
    }
    if (p[i] === ')' && stack.length !== 0) {
      stack.pop();
    }
  }
  if (stack.length === 0) {
    return p;
  }
  const result = recursive(p);
  return result;

  function recursive(string) {
    if (string.length === 0) {
      return '';
    }
    const stack = [];
    const uStack = [];
    stack.push(string[0]);
    let u = '';
    let v = '';
    for (let i = 1; i < string.length; i++) {
      //   console.log(stack, 'stack');

      if (string[i] === '(' && stack[stack.length - 1] === ')') {
        stack.pop();
      } else if (string[i] === ')' && stack[stack.length - 1] === '(') {
        stack.pop();
      } else {
        stack.push(string[i]);
      }

      if (stack.length === 0) {
        u = string.substr(0, i + 1);
        v = string.substr(i + 1);
        break;
      }
    }

    for (let i = 0; i < u.length; i++) {
      if (u[i] === '(') {
        uStack.push(u[i]);
      }
      if (u[i] === ')' && uStack.length !== 0) {
        uStack.pop();
      }
    }

    if (uStack.length === 0) {
      const temp = recursive(v);
      return u + temp;
    } else {
      let str = '(' + recursive(v) + ')';
      let temp = u.substring(1, u.length - 1);
      temp = temp.split('').map(el => {
        if (el === '(') {
          return ')';
        } else {
          return '(';
        }
      });
      //   console.log(temp, 'temp');
      str += temp.join('');

      return str;
    }
  }
}
