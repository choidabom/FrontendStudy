# Noom

Zoom Clone using NodeJS, WebRTC and Websockets.

### Node.js는 실시간 기능 구현에 좋다?

- Node.js가 탄생한 이유는 HTML의 낮은 생산성과 수정의 용이함을 위해 탄생. 그 결과 JS를 가지고 수정한 것을 서버를 통해 실시간으로 코드화 시켜주는 Node.js가 만들어졌다. 이러한 "실시간 으로 코드화"로 수정하는 기능 때문에 실시간으로 기능 구현에 좋다고 말하는 것으로 추정.
  출처: https://www.youtube.com/watch?v=vT51SuzozLc&list=PLuHgQVnccGMA9QQX5wqj6ThK7t2tsGxjm&index=2

- Non-Blocking I/O를 지원하기 때문에 비동기식 프로그래밍이 가능하다. 이 때문에 I/O부하가 심한 대규모 서비스를 개발하는데 적합하다.
  출처: https://koras02.tistory.com/49

### ExpressJS

- Node.js의 핵심 모듈 http와 Connect 컴포넌트를 기반으로 하는 웹 프레임워크.
- 웹 애플리케이션 및 API 개발을 위해 설계된 프레임워크이다.
- Node.js의 사실상의 표준 서버 프레임워크.

### app.get()

### Pug

- JS의 템플릿 엔진
  - 템플릿 엔진이란?
  - 웹페이지 구성 시 가장 기본적으로 쓰이는 마크업 언어인 HTML은 정적인 언어이다.
- 템플릿 엔진은 자바스크립트를 사용하여 HTML을 렌더링할 수 있게 해준다.
- **pug는 HTML을 pug 문법으로 작성하면 HTML로 바꿔주는 기능을 한다.**
- pug는 express의 패키지 view engine이다.
- 참고) https://inpa.tistory.com/entry/PUG-%F0%9F%93%9A-%ED%85%9C%ED%94%8C%EB%A6%BF-%EC%97%94%EC%A7%84-html

### package.json

- Node.js에서 사용하는 패키지를 공유하기 위해 필요한 문서
- "name", "version" 이 두 필드는 반드시 넣어줘야하는 필수 항목

### babel

- JS의 컴파일러
- 다양한 웹과의 호환성을 위해 필요한 툴

### nodemon

- Node.js 개발 시 자바스크립트 파일들을 수정할 때마다 매번 ctrl+c를 통해 node를 종료 후 다시 실행해줘야 하는 번거로움을 덜기 위해 **파일들을 모니터링하고 있다가 수정될 경우 자동으로 서버를 재실행시켜주는 스크립트 모니터링 유틸리티**이다.
- 코드를 변경하면 자동으로 새로고침이 되길 원하기 때문에 nodemone을 설치해준다.
