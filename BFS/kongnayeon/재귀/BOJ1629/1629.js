const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [A, B, C] = input[0].split(' ').map(BigInt); 

//지수 법칙, 모듈러 연산
// BigInt!!!!!!!
// n을 붙이면 BigInt로 인식됨

const power = (base, exponent) => {
    if(exponent === 0n) return 1n % C;
    if(exponent === 1n) return base % C;

    let _C = power(base, exponent / 2n);  
    _C = (_C * _C) % C;

    if(exponent % 2n){
        _C = (_C * base) % C;
    }

   return _C;
}

console.log(Number(power(A, B)));