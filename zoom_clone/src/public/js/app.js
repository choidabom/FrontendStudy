/* io: 자동적으로 back-end socket.io와 연결해주는 function */
/* io function은 알아서 socket.io를 실행하고 있는 서버를 찾을 것이다. */
const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");
const call = document.getElementById("call");

call.hidden = true;

/* stream 받기: stream은 비디오와 오디오가 결합된 것 */
let myStream;
let muted = false;
let cameraOff = false;
let roomName;
let myPeerConnection;

async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices(); // 장치 리스트 가져오기
    const cameras = devices.filter((device) => devices.kind === "videoinput"); // 비디오인풋만 가져오기
    const currentCamera = myStream.getAudioTracks()[0];
    cameras.forEach((camera) => {
      const option = document.createElement("option"); // 새로운 옵션 생성
      option.value = camera.deviceId; // 카메라의 고유 값을 value에 넣기
      option.innerText = camera.label; // 사용자가 선택할 때는 label을 보고 선택할 수 있게 만들기
      if (currentCamera.label == camera.label) {
        option.selected = true;
      }
      camerasSelect.appendChild(option); // 카메라의 정보들을 option 항목에 넣어주기
    });
  } catch (e) {
    console.log(e);
  }
}
/* getMedia 함수를 만들어서 유저의 유저미디어 string을 받아온다.
 * async를 이용해서 비동기로 받기 때문에, try catch문을 사용
 * getMedia => 영상이랑 카메라 받아옴
 */
async function getMedia(deviceId) {
  const initialConstraints = {
    audio: true,
    video: { facingMdoe: "user" },
  };
  const cameraConstraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };
  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstraints : initialConstraints
    );
    myFace.srcObject = myStream;
    /* getCameras를 실행시키기 위해 getMedia 함수 내에서 getCameras를 실행해준다. => await로 실행해서 비동기로 동작하게 해야한다는 점 !*/
    await getCameras();
  } catch (e) {
    console.log(e);
  }
}

function handleMuteBtn() {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
}

function handleCameraBtn() {
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (cameraOff) {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  } else {
    cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
  }
}

async function handleCameraChange() {
  await getMedia(camerasSelect.value);
}

muteBtn.addEventListener("click", handleMuteBtn);
cameraBtn.addEventListener("click", handleCameraBtn);
camerasSelect.addEventListener("input", handleCameraChange); // 카메라 변경 확인

/// Welcom Form (join a room)

const welcome = document.getElementById("welcome");
const welcomeForm = welcome.querySelector("form");

/* 양쪽 브라우저에서 연결통로를 먼저 만듬  */
async function initCall() {
  welcome.hidden = true;
  call.hidden = false;
  await getMedia(); // 카메라, 마이크, 다른 카메라들도 다 불러옴
  makeConnection();
}

async function handleWelcomeSubmit(event) {
  event.preventDefault();
  const input = welcomeForm.querySelector("input");
  await initCall();
  socket.emit("join_room", input.value);
  roomName = input.value; // 방에 참가했을 때 나중에 쓸 수 있도록 방 이름을 변수에 저장
  input.value = "";
}
welcomeForm.addEventListener("submit", handleWelcomeSubmit);

// Socket Code

// Peer a에서 돌아가는 코드
socket.on("welcome", async () => {
  // 브라우저 a의 방에 브라우저 b가 들어오면 console에서 확인 가능
  const offer = await myPeerConnection.createOffer();
  myPeerConnection.setLocalDescription(offer); //브라우저 a에서만 실행된다
  console.log("send the offer");
  socket.emit("offer", offer, roomName);
});

// Peer b에서 돌아가는 코드
socket.on("offer", async (offer) => {
  myPeerConnection.setRemoteDescription(offer);
  const answer = await myPeerConnection.createAnswer();
  myPeerConnection.setLocalDescription(answer);
  socket.emit("answer", answer, roomName);
});

socket.on("ansewr", (answer) => {
  myPeerConnection.setRemoteDescription(answer);
});
// RTC Code

// 영상과 오디오 데이터를 주고 받고 할 때, 그 영상의 오디오와 영상 데이터를 peer connection에 집어넣어야한다.
function makeConnection() {
  myPeerConnection = new RTCPeerConnection();
  myStream
    .getTracks()
    .forEach((track) => myPeerConnection.addTrack(track, myStream));
}
