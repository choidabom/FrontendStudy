/* io: 자동적으로 back-end socket.io와 연결해주는 function */
/* io function은 알아서 socket.io를 실행하고 있는 서버를 찾을 것이다. */
const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true; // 처음에는 방안에서 할 수 있는 것들 안 보이게 !

let roomName = "";

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function handelMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  }); // 백엔드로 new_message 이벤트를 날림, (input.value이랑 방이름도 같이 보냄), 마지막 요소는 백엔드에서 시작시킬 수 있는 함수
  input.value = "";
}

function showRoom() {
  // 방에 들어가면 방 내용이 보이게
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const msgForm = room.querySelector("#msg");
  msgForm.addEventListener("submit", handelMessageSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  // 이전) 메시지만 전송하면 되었고, object도 보낼 수 없었다. (object를 string으로 바꿔줘야했음)
  // 1. 특정한 event를 emit해줄 수 있다. (어떤 이름이든 상관없이)
  // 2. Javascript object 전송 가능 (Socket io가 처리해줄거니까)

  // socket.emit 파라미터
  // 1. event 이름
  // 2. 페이로드
  // 3. 서버에서 호출하는 function - 서버단에서 호출되지만 실행은 클라이언트단에서
  // 마지막 function은 back-end에 보냄.
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}

// 서버는 back-end에서 function을 호출하지만 function은 front-end에서 실행됨!

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${user} joined!`);
});

socket.on("bye", (left, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${left} left`);
});

socket.on("new_massage", addMessage); // addMessage만 써도 알아서 msg를 매개변수로 넣는다.

socket.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("ul");
  if (rooms.length === 0) {
    roomList.innerHTML = "";
    return;
  }
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
});

// socket.on("room_change", (msg) => console.log(msg));
