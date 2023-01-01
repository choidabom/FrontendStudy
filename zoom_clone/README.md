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

### HTTP vs WebSockets

**HTTP (http://, https://)**

**stateless**

- HTTP 서버는 유저에게 먼저 말을 걸 수 없다. client가 요청하면 response 과정 이후 유저가 누구인지 잊어버린다.
- 백엔드와 유저 사이에 아무런 연결이 없다.
- 그저 요청을 기다리고 응답하고 응답이 끝나면 다시 요청을 기다린다. (실시간 X)

**WebSockets (ws://, wssL//)**

**real-time**

- **webSocket은 어떤 프로그래밍 언어에도 국한되어 있지 x. Protocol 그 자체**
- 웹소켓(ws)에서는 한 번 연결이 성립되면, 두 방향(양방향)연결 생성됨. request-response 필요 x.
- 브라우저와 서버 사이에 **bi-directional한 연결**이 있어서 서로에게 바로 갈 수 있는 길이 있다.
- 백엔드와 유저 사이(브라우저), 백엔드와 백엔드 사이 등의 연결이 전화통화처럼 연결되어 있다.
- 서버와 유저(브라우저)가 연결되어 있으면 양방향 통신으로 아무때나 메세지 등을 주고받을수 있다.

### WebSockets in NodeJS

`server.js`

```js
/* express는 http 프로토콜을 다루지만 우리는 https와 websocket 둘 다 다뤄본다. */
/* http 서버를 만든다. */
const server = http.createSever(app);
/* 웹소켓 서버를 만들고 http 서버와 함께 둘 다 작동시킨다. 웹소켓 서버만 구동시키고 싶으면 {server} 인자를 안 넘겨주면 된다.*/
const wss = new WebSocketServer({ server });
```

- **같은 퐅트에서 http, ws 통신 같이 하기**
- server에 접근할 수 있도록 createServer를 해준다.

### WebSockets Events

`server.js`

```js
function handleConnection(socket) {
  console.log(socket);
}
wss.on("connection", handleConnection);
```

- on: JS의 addEventListener와 같은 역할을 한다. connection이라는 행동을 하면 해당 함수를 실행한다.
- socket에 이벤트에 대한 정보를 담아준다.

`app.js`

```js
const socket = new WebSocket(`ws://${window.location.host}`);
```

### WebSockets Messages

`server.js`

```js
wss.on("connection", (socket) => {
  console.log("Connection to Browser");
  socket.on("close", () => console.log("Disconnectd from the Browser")); // 브라우저에서 연결이 끊기면 실행한다.
  socket.on("message", (message) => {
    console.log(message);
  });
  socket.send("hello"); // send로 데이터를 보낸다.
});
```

- connection listener를 정의하면 브라우저와 연결되었을 때 실행한다.
- close listener를 정의하면 브라우저와 연결이 끊겼을 때 실행한다.
- message listener를 정의하면 브라우저에서 메시지가 왔을 때 실행한다.
- socket.send를 이용해 브라우저로 데이터를 보낸다.

`app.js`

```js
socket.addEventListener("open", () => {
  console.log("Connected to Server");
});

socket.addEventListener("message", (message) => {
  console.log("New message: ", message.data);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server");
});

setTimeout(() => {
  socket.send("hello from the browser! ");
}, 10000);
```

- open listener를 정의하면 서버와 연결되었을 때 실행한다.
- close listener를 정의하면 서버와 연결이 끊겼을 때 실행한다.
- message listener를 정의하면 서버에서 메시지가 왔을 때 실행한다.
- socket.send를 이용해 서버로 데이터를 보낸다.

### Chat Completed

`home.pug`

```pug
main
    ul
    form
        input(type="text", placeholder="write a msg", required)
        button Send
```

`server.js`

```js
const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  /* send: 서버의 메서드가 아니라 socket의 메서드 ! */
  /* connection이 생기면 socket을 받을 수 있다는 것을 알 수 있음 */
  console.log("Connected to Browser");
  socket.on("close", onSocketClose);
  /* user가 보낸 메시지를 다시 user에게 보내줄 것. */
  socket.on("message", (message) => {
    console.log(message.toString("utf8"));
    sockets.forEach((aSocket) => aSocket.send(message.toString("utf8")));
  });
});
```

- 브라우저에서 받은 메시지를 다시 돌려보낸다.
- 연결된 모든 소켓에 접근하기 위해 forEach를 사용한다. 크롬에게 받으면 크롬에게만 보내고 파이어 폭스에게 받으면 파이어폭스에게만 돌려보내는 현상을 방지하기 위함이다.

`app.js`

```js
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

...

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
```

- form의 제출버튼을 누르면 handleSubmit 함수를 실행한다. input의 value를 server로 보낸다.

### Nicknames part One-Two

**왜 object을 string으로 바꿔줘야하는가?**

- 이렇게 해야하는 이유: websocket이 브라우저에 있는 API이기 때문이다.
- 백엔드에서는 다양한 프로그래밍 언어를 사용할 수 있기 때문에 API는 어떠한 판단도 하면 안 된다.

`JSON.stringify`: JavaScript object => string
`JSON.parse()`: string => JavaScript object

`home.pug`

```js
main
    form#nick
        input(type="text", placeholder="choose a nickname", required)
        button Save
    ul
    form#message
        input(type="text", placeholder="write a msg", required)
        button Send
```

- 닉네임을 저장할 form과 메시지를 보낼 form을 만든다.

`app.js`

- nickForm, messageForm을 변수로 지정하고 소켓에 접속한다.
- 닉네임이나 메시지를 보내면 서버에 보낼 jsond으로 변환하는 함수를 만든다.
- 서버에서 받은 메시지를 li tag에 담아 브라우저에서 출력해준다.
- 각 폼들의 저장 버튼을 누르면 각 폼의 input 값을 server에 보내준다.

`server.js`

- 메시지를 받으면 먼저 **json 형태로 파싱**해준다.
- **소켓에 정보를 저장할 수 있다.**

### socket IO

- socket IO은 프레임워크로 실시간, 양방향, event 기반의 통신 제공
- websocket은 socket IO가 실시간, 양방향, event 기반 통신을 제공하는 방법 중 하나 !
