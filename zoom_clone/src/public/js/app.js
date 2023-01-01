/* io: 자동적으로 back-end socket.io와 연결해주는 function */
/* io function은 알아서 socket.io를 실행하고 있는 서버를 찾을 것이다. */
const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function backendDone(msg) {
  console.log(`The backend says: `, msg);
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
  socket.emit("enter_room", input.value, backendDone);
  input.value = "";
}
form.addEventListener("submit", handleRoomSubmit);
