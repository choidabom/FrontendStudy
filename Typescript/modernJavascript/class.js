// 클래스 선언문
class Person {
    // 생성자
    constructor(name) {
        // 인스턴스 생성 및 초기화
        this.name = name; // name 프로퍼티는 public하다.
    }

    // 프로토타입 메서드
    sayHi() {
        console.log(`Hi, My name is ${this.name}`);
    }

    // 정적 메서드
    static sayHello() {
        console.log('Hello!');
    }
}

const me = new Person('Kim');   // 인스턴스 생성
me.sayHi(); // 프로토타입 메서드 호출
Person.sayHello(); // 정적 메서드 호출