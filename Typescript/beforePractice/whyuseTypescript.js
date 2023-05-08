// Javascript
// Javascript는 함수 실행 과정에서 전달해야할 각 인자의 타입을 안내받지 못할 경우 의도치 않은 문제 발생 소지가 있다. 
function ellipsisText(text, limit, symbol = "...") {
    return `${String(text).slice(0, limit - 1)}${symbol}`;
};

console.log(ellipsisText(100304040202, 30, 101)); // "결과값": 100304040202101

// Javascript + 유효성검사 
function ellipsisText(text, limit, symbol = '...') {
    if (typeof text !== 'string') throw new Error('1번째 전달인자 유형은 문자여야 함');
    if (typeof limit !== 'number') throw new Error('2번째 전달인자 유형은 숫자여야 함');
    if (typeof symbol !== 'string') throw new Error('3번째 전달인자 유형은 문자여야 함');
    return `${text.slice(0, limit - 1)}${symbol}`;
}

console.log(ellipsisText(100304040202, 30, 101)); // "결과값"
// Uncaught Error: 1번째 전달인자 유형은 문자여야 함 (유효성 검사를 함으로써 오류 발생 !)