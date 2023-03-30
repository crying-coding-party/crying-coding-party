const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0].split(' ')); 

console.log('어느 한 컴퓨터공학과 학생이 유명한 교수님을 찾아가 물었다.');

const indent= (depth, str) => {
    let indentation = '';
    for(i = 0; i < depth; i++){
        indentation += '____';
    }
    console.log(`${indentation}${str}`)
    
}

const recursiveChat= (N, depth) => {

    if (depth === N) {
        indent(depth, '\"재귀함수가 뭔가요?\"');
        indent(depth, '\"재귀함수는 자기 자신을 호출하는 함수라네\"');
        indent(depth, '라고 답변하였지.');
        return;
    };

    indent(depth, '\"재귀함수가 뭔가요?\"');

    indent(depth, '\"잘 들어보게. 옛날옛날 한 산 꼭대기에 이세상 모든 지식을 통달한 선인이 있었어.');
    indent(depth, '마을 사람들은 모두 그 선인에게 수많은 질문을 했고, 모두 지혜롭게 대답해 주었지.');
    indent(depth, '그의 답은 대부분 옳았다고 하네. 그런데 어느 날, 그 선인에게 한 선비가 찾아와서 물었어.\"');
    recursiveChat(N, depth + 1);
    indent(depth, '라고 답변하였지.');
}

recursiveChat(N, 0);