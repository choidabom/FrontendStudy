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

---

# 1. Chat with WebSockets

## HTTP vs WebSockets

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

## WebSockets in NodeJS

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

## WebSockets Events

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

## Chat Completed

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

## Nicknames part One-Two

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

--

# 2. Socket.IO

## Socket.IO vs WebSockets

- socket.IO은 프론트와 백엔드 간 실시간, 양방향, event 기반의 통신을 가능하게 해주는 프레임워크
- **socket.IO is Not a websocket implementation.**
  - websocket은 socket IO가 실시간, 양방향, event 기반 통신을 제공하는 방법 중 하나 !
  - websocket을 지원하지 않는 경우, HTTP long polling와 같은 것 사용
- websocket 기능이 지원되지 않는 상황에서 socket io는 다른 수단을 찾아서 실시간 통신 기술을 지원한다는 점에서 탄력적이다.

- websocket API는 브라우저에 설치되어있어서 따로 설치 필요없었지만 socket.IO는 frontend와 backend에 socket.IO를 설치해줘야한다.

## socket.emit

- socket.emit 함수를 사용함으로써 “message” 이벤트에만 국한되지 않고, 전달하는 데이터의 자료형이 string일 필요도 없어져 자유로워진다.
- 해당 메소드의 마지막 파라미터는 서버가 마지막으로 호출하는 함수
- 호출은 서버단에서 하지만, 실행은 클라이언트단에서 한다.
- `app.js`의 socket.emit과 `server.js`의 socket.on에는 같은 이름 사용해야함.
- 끝날 때 실행되는 function을 보내고 싶으면 마지막에 넣어야 함.

`socket.emit("eventName", argument1, argument2, argument3, .... , function)`

1. eventName

- emit의 첫 번째 인자는 이벤트 이름 !

2. argument

- 여러개 보낼 수 있다.
- 다양한 type으로 보낼 수 있다.

3. function

- backend에서 응답을 받아 실행되는 함수
- argument의 가장 마지막에 써야한다.
  -backend에서 argument를 전달 받을 수 있다.

**=> 핵심: 함수호출을 백엔드에서 했는데 코드는 프론트엔드에서 실행된다 !**

## Rooms & Room Notifications

- join: 방에 들어가는 기능을 하는 메서드
- onAny: 소켓 내에서 발생한 이벤트를 캐치하는 역할을 하는 메서드
- on: 특정 위치에 이벤트를 전달하기 위해 사용하는 메서드
- rooms: 현재 소켓이 들어가있는 방을 표시하는 메서드
- id: 현재 소켓의 id를 나타내는 메서드

- disconnect: 연결이 완전히 끊어졌을 때 발생하는 이벤트 (room 정보가 비어있음)
- disconnecting: 브라우저는 이미 닫았지만 아직 연결이 끊어지지 않은 그 찰나에 발생하는 이벤트 (그래서 room 정보가 살아있음) / socket이 방을 떠나기 바로 직전에 발생

- Set(2) { "asdfasdfasdf" , "room" }에서 Set은 자바스크립트 자료구조 중 하나이다.
- 중복되는 data를 포함할 수 없고, Index가 적용이 안되고, forEach 사용이 가능합니다.

## Nicknames

### 닉네임을 설정하고 메시지를 보냈을 때 누가 보냈는지 확인할 수 있도록

`app.js`

```js
function handelMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  }); // 백엔드로 new_message 이벤트를 날림
  input.value = "";
}
```

- handleMessageSubmit에서 value를 굳이 따로 만든 이유는 value를 만들지 않았다면 생기는 문제점에 대해 알아보면 쉽게 이해 가능하다.
- 만약 input.value를 따로 저장해두지 않으면, socket.emit 함수가 동작하고 메시지를 보내기 전에 input.value를 초기화 하는 작업이 **비동기로 먼저 작동**하여서 addMessage가 돌아갈 때는 이미 우리가 보내고 싶었던 input.value가 초기화 되어버린다.

## Room Count

### 방 이름과 유저 수를 띄워보자 !

- 문제점 발생: 특정 소켓은 A 서버에서, 다른 소켓은 B 서버에서 돌리는 경우가 생길 수 있는데, 이렇게 되면 A 서버에 연결된 클라이언트는 B 서버에 연결된 클라이언트와 소통할 수 없다.
- 문제점 대처: **adapter** => 두 서버를 연결해서 데이터를 전송하는 기능
- **Adapter**: 다른 서버들 사이에 실시간 어플리케이션을 동기화하는 것.
- adapter는 누가 연결되었는지, 현재 어플리케이션에 room이 얼마나 있는지 알려준다.

- 현재 이 adapter는 메모리에 존재한다. 하지만 실제 서버에서는 MongoDB와 같은 곳에 연결되게 된다.
- 지금은 단순한 하나의 서버기 때문에 메모리에 adapter를 연결시켜서 사용한다.
- adapter가 어떻게 사용되고 있는지 확인하기 위해 server.js에서 console.log를 이용해서 adapter를 출력해본다.

### rooms

- **private room**: 서버와 브라우저간의 연결 / personal ID로 구성되어있음
- **public room**: 내가 생성한 이름이 앞에 들어가있게 된다. / Set 안에는 personal ID가 들어가게 됨

---

# 3. Video call

## User Video

### 사용자로부터 영상받아 띄우기

- playsinline: 모바일 브라우저가 필요로 하는 property / 비디오가 전체화면이 되지 않게 함.
- stream: 비디오와 오디오가 결합된 것.

### 영상/음성 조작 버튼 만들기

- 버튼 생성

  - `home.pug`
  - myStreamd이라는 id를 가진 div에 video 부분과 button을 넣어준다.
  - `app.js`
  - 버튼을 클릭했을 때 상태변화를 감지하기 위한 이벤트를 만들어주고, 상태를 담고 있는 변수도 만들어준다.

- 버튼 기능 구현
  - stream은 track를 제공하며 우리는 해당 track에 접근가능하다.
  - myStream의 getAudioTracks 함수를 통해 오디오 부분 가져올 수 있다.
  - 우리가 다뤄야할 부분은 enabled를 false로 만들고, 다시 true로 만드는 부분이다 !
  - `myStream.getAudioTracks().forEach(trach => track.enabled = !track.enabled);`
  - `myStream.getVideoTracks().forEach(trach => track.enabled = !track.enabled);`

### 사용자 장치 받아오기

- getCameras 함수를 만들어서 유저의 카메라 목록을 불러오려고 한다.
- `enumerateDevices()`: 모든 장치와 미디어 장치(ex. 컴퓨터에 연결되거나 모바일이 가지고 있는 장치)를 알려준다.
- getCamers 역시 비동기로 동작하기 때문에 try catch문을 사용한다.
- navigator.mediaDevices.enumerateDevices()를 통해 장치 리스트를 가져올 수 있다.
- getCameras를 실행시키기 위해 getMedia 함수 내에서 getCameras를 실행해준다. => await로 실행해서 비동기로 동작하게 해야한다는 점 !

  - `home.pug`
    - select div 하나 만들어주고, option 넣어준다.
  - `app.js`
    - value에는 카메라의 고유 값을 지정해주고, 사용자에게 보이는 선택화면에는 label을 달아서 보기 편하게 만든다.
    - label이 보기 좋지만 카메라의 고유한 정보를 담진 않기 때문에 **반드시 카메라의 deviceID가 value로 들어가야 한다.**

  ```js
  async function getCameras() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices(); // 장치 리스트 가져오기
      const cameras = devices.filter((device) => devices.kind === "videoinput"); // 비디오인풋만 가져오기
      cameras.forEach((camera) => {
        const option = document.createElement("option"); // 새로운 옵션 생성
        option.value = camera.deviceId; // 카메라의 고유 값을 value에 넣기
        option.innerText = camera.label; // 사용자가 선택할 때는 label을 보고 선택할 수 있게 만들기
        camerasSelect.appendChild(option); // 카메라의 정보들을 option 항목에 넣어주기
      });
    } catch (e) {
      console.log(e);
    }
  }
  ```

### 영상 장치 변경하기

- 유저가 select를 변경할 때 이를 감지하면 된다 !@
- 방법 => 강제적으로 stream을 다시 실행해준다.

## webRTC를 사용해서 peer-to-peer 환경 구축

webRTC란? web Real Time Communication

- 영상, 오디오, 메세지는 서버를 통해서가 아니라, 직접 전달된다.
- **핵심 -> signaling이 끝나면 peer-to-peer 연결이 된다.**
- webRTC를 사용하는 가장 큰 이유는 webSocket이나 Socket.io에서 실현하지 못한 peer-to-peer 통신을 실현할 수 있기 때문이다.

### [과정 - webRTC를 사용해서 peer-to-peer 환경 구축]

1. 크롬 브라우저가 서버에게 자신의 IP와 port 번호를 준다. => 브라우저는 서버에게 configuration + 본인의 위치만 전달한다.
2. 파이어폭스가 서버에게 자신의 IP와 port 번호를 준다. => 브라우저는 서버에게 configuration + 본인의 위치만 전달한다.
   (cf. 브라우저는 서버에게 인터넷에서의 그들의 위치와 settings, configuration, 방화벽이나 라우터 유무 여부 등의 정보를 서버에게 전달)
3. 서버가 크롬 브라우저에게 파이어폭스 브라우저가 어디에 있는지 알려준다.
4. 서버가 파이어폭스 브라우저에게 크롬 브라우저가 어디에 있는지 알려준다.
5. peer-to-peer 연결 시작
   a. 서버가 영상, 텍스트를 전송하는 것이 아니라
   b. **서버는 다른 브라우저가 어디에 있는지만을 알려준다.**
   c. 브라우저 간의 연결(peer-to-peer)이 되면 앞전에 만든 stream 전송

## Rooms - 방만들기

1. 채팅에서 만들었던 방처럼, video call을 처리하기 위한 room이 다시 필요하다.
2. welcome과 call을 나누어 room에 들어가게 되면 call이 보이도록 한다.

## 양쪽 브라우저에 webRTC 연결 만들기

- 우리 카메라에서 오는 이 stream을 가져다가 이 stream의 데이터를 가져다가 연결을 만들 것!

1. peerConnection을 brave 브라우저와 chrome 브라우저에 만들어야한다.
   `const myPeerConnection = new RTCPeerConnection();`
2. 양쪽 브라우저에서 카메라와 마이크의 데이터 stream을 받아서 그것들을 연결 안에 집어 넣는다.

   - peer-to-peer 연결 안에다가 영상과 오디오를 집어넣어야한다.
   - 영상과 오디오 데이터를 주고 받고 할 때, 그 영상의 오디오와 영상 데이터를 peer connection에 집어넣어야한다.

   ```js
   myStream.getTracks().forEach((track) => {
     myPeerConnection.addTrack(track, myStream);
   });
   ```

3. myPeerConnection이 존재하지 않는 에러
   a. Peer B가 offer 이벤트를 감지한 순간에 아직 myPeerConnection이 존재하지 않을 수 있다.
   b. startMedia 함수는 join_room 이벤트의 마지막에 실행되는데
   c. socketIO가 너무 빨라서 myPeerConnection이 만들어지기도 전에 offer 이벤트가 감지되는 경우가 발생한 것이다.
   d. makeConnection 함수는 Peer A와 B 모두가 실행해야한다. 그런데 위와 같은 상황이 발생했다면 Peer B가 makeConnection의 결과로 myPeerConnection이 만들어지지 않는 경우가 발생한 것이다.

   - setRemoteDescription(): 멀리 떨어진 peer의 description을 세팅함을 뜻한다. (내가 아닌 다른 누군가와)

4. iceCandidate

- iceCandidate란? Internet Connectivity Establishment (인터넷 연결 생성)
