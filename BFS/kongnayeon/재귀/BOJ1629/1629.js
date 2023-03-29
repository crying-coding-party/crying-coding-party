const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [A, B, C] = input[0].split(' ').map(BigInt); 

//지수 법칙, 모듈러 연산
// BigInt!!!!!!!

const power = (base, exponent) => {
    if(B === 0) return 1 % C;
    if(B === 1) return base % C;

    let _C = power(base, BigInt(exponent / BigInt(2)));  
    _C = (_C * _C) % C;

    if(exponent % 2){
        _C = (_C * base) % C;
    }

   return _C;
}

console.log(power(A, B))