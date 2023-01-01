/* io: 자동적으로 back-end socket.io와 연결해주는 function */
/* io function은 알아서 socket.io를 실행하고 있는 서버를 찾을 것이다. */
const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");

/* stream 받기: stream은 비디오와 오디오가 결합된 것 */
let myStream;
let muted = false;
let cameraOff = false;

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
 */
async function getMedia(deviceId) {
  const initialConstraints = {
    audio: true,
    video: { facingMdoe: "user" },
  };
  const cameraConstraints = {
    audio: true,
    video: { deviceId: { exact: myPreferredCameraDeviceID } },
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

getMedia();

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
// 카메라 변경 확인
camerasSelect.addEventListener("input", handleCameraChange);
