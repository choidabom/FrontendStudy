const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

/* 닉네임이나 메시지를 보내면 서버에 보낼 json으로 변환하는 함수 */
function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}
function handleOpen() {
  console.log("Connected to Server ✅");
}
socket.addEventListener("open", handleOpen);

/* 서버에서 받은 메시지를 li tag에 담아 브라우저에서 출력 */
socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

/* 각 폼들의 저장 버튼을 누르면 각 폼의 input 값을 sever에 보내준다. */
function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));

  const li = document.createElement("li");
  li.innerText = `You: ${input.value}`;
  messageList.append(li);

  input.value = "";
}

/* 각 폼들의 저장 버튼을 누르면 각 폼의 input 값을 sever에 보내준다. */
function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
