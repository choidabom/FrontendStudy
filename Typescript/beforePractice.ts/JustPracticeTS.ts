// 1. 변수 만들 때, 타입(type) 지정 가능 
// boolean, string, number, bigint, null, undefined, [], {}
let 이름: string = 'kim';

// 타입이 지정된 경우, 타입이 의도치 않게 변경될 경우 에러메시지를 띄워줌
이름 = 123;

// array 혹은 object 자료 타입 지정
let 성함: string[] = ['kim', 'park'];
let list: Array<number> = [1, 2, 3];
let 나이: { age: number; } = { age: 25 };

// 여러가지 타입의 데이터가 들어올 수 있다면 | 기호, or 연산자 이용하여 표현 가능
let 존함: string | number = 'kim';

// 2. 변수 생성 시 타입 지정 가능
type nameType = string | number;
let NAME: nameType = "kim";

// 3. 나만의 타입 만들기 가능
// 원하는 글자나 숫자를 입력하면 NAME2이라는 변수엔 앞으로 'kim' 또는 'park'만 들어올 수 있음
// literal type
type nameType2 = 'kim' | 'park';
let NAME2: nameType2 = 'kim';

// 4. 함수의 파라미터와 리턴 값 타입 정의
function test(x: number): number {
    return x * 2;
}

// 에러 발생 
function test1(x: number | string) {
    return x * 2;
}

// 가능: 항상 타입이 무엇인지 미리 체크하는 narrowing 또는 assertion 문법을 사용해야 허락해줌 !
function test2(x: number | string) {
    if (typeof x === 'number') {
        return x * 2;
    }
}

// 튜플(Tuple): 요소의 타입과 개수가 고정된 배열
// array 자료 안에 순서를 포함해서 어떤 자료가 들어올지 정확히 지정하고 싶으면 사용
type Member = [number, boolean];
let john: Member = [100, false];


// object
type MyObject = {
    name: string,
    age: 50;
};
let 철수: MyObject = {
    name: 'kim',
    age: 50
};



// 클래스
class Person {
    name;
    constructor(name: string) {
        this.name = name;
    }
}
