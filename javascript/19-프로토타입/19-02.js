const circle = {
  // 반지름: 원의 상태를 나타내는 데이터 즉, 프로퍼티(property)
  radius: 5,

  // 상태 데이터를 조작할 수 있는 동작 즉, 메서드(method)
  // 원의 지름: 2r
  getDiameter() {
    return 2 * this.radius;
  },

  // 원의 둘레: 2ㅠr
  getPerimeter() {
    return 2 * Math.PI * this.radius;
  },

  // 원의 넓이: ㅠrr
  getDiameter() {
    return Math.PI * this.radius ** 2;
  },
};

console.log(circle);
