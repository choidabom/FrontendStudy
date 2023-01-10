const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const eraserBtn = document.getElementById("eraser-btn");
const destroyBtn = document.getElementById("destroy-btn");
const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting() {
  isPainting = true;
}
function cancelPainting() {
  isPainting = false;
  // ctx.fill();
  ctx.beginPath();
}
function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "68px sans-serif";
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
///*
// Q. What is vanilla Javascript?
// A. 프레임워크 또는 라이브러리가 적용되지 않은 순수한 자바스크립트를 뜻한다.
// React.js / Vue.js / Angular.js / Jquery 등의 프레임워크와 라이브러리가 제공되지 않는 본질적인 javascript !

// */
// // input 값이 바뀔 때마다 함수를 실행시키도록 이벤트 리스너를 추가해줬다.
// const saveBtn = document.getElementById("save");
// const textInput = documnet.getElementById("text");
// const fileInput = document.getElementById("file");
// const eraserBtn = document.getElementById("eraser-btn");
// const destroyBtn = document.getElementById("destroy-btn");
// const modeBtn = document.getElementById("mode-btn");
// /* getElementsByClassName => HTMLCollection 요소들을 리턴, but 배열이 아님 */
// const colorOptions = Array.from(
//     document.getElementsByClassName("color-option")
// );
// const color = document.getElementById("color");
// const lineWidth = document.getElementById("line-width");
// const canvas = document.querySelector("canvas");
// const ctx = canvas.getContext("2d"); /* 붓 역할을 할 getContext */

// const CANVAS_WIDTH = 800;
// const CANVAS_HEIGHT = 800;

// canvas.width = CANVAS_WIDTH;     /* 가로 */
// canvas.height = CANVAS_HEIGHT;    /* 세로 */
// /* 자바스크립트가 실행될 때, ctx.lineWidth를 input의 기본값(value = 5)으로 초기화해줘야 한다. */
// ctx.lineWidth = lineWidth.value; /* input의 value를 5로 잡았기 때문에 초기값을 5로 준다는 의미 */
// ctx.lineCap = "round";
// let isPainting = false;
// let isFilling = false;

// function onMove(event){
//     if (isPainting){
//         /* 모든 line들은 같은 path로 그려지기 때문에 이전에 그려진 선과 새로운 선의 연결을 끊어줘야 한다.  */
//         ctx.lineTo(event.offsetX, event.offsetY);
//         ctx.stroke();
//         return;
//     }
//     ctx.moveTo(event.offsetX, event.offsetY);
// }

// function startPainting(){
//     isPainting = true;
// }

// function cancelPainting(){
//     isPainting = false;
//     ctx.beginPath();
// }

// /* 항상 event에 접근할 수 있다는 사실이 아주 중요 ! */
// /* event는 우리에게 input의 새로운 value(값)을 알려주기 때문 */
// function onLineWidthChange(event){
//     ctx.lineWidth = event.target.value;
// }

// function onColorChange(event){
//     ctx.strokeStyle = event.target.value;
//     ctx.fillStyle = event.target.value;
// }

// /* 어떤 color가 클릭되었는지 */
// /* data-color을 활용해서 어떤 색상이 클릭되었는지를 알아낼 것 */
// function onColorClick(event){
//     // 사용자가 색깔을 클릭하면
//     const colorValue = event.target.dataset.color;
//     // 라인의 색깔을 바꾸고
//     ctx.strokeStyle = colorValue;
//     // 채우기 색깔도 바꾸고
//     ctx.fillStyle = colorValue;
//     // color input의 값도 바꿀 것 => 사용자에게 클릭한 색깔로 바뀌었다는걸 알려주고 싶기에
//     color.value = colorValue;
// }

// /* 모드를 바꾸는 함수: 캔버스 전체 채우기 모드 or 선 그리기 모드 */
// function onModeClick(){
//     /* 만약 사용자가 채우기 모드일 때 이 버튼을 클릭한다면, */
//     if (isFilling){
//         /* 채우기 모드를 멈추고 */
//         isFilling = false;
//         /* modeBtn의 텍스트를 Fill로 바꿔줘서 사용자에게 모드가 바뀌었다는걸 알려줌 */
//         modeBtn.innerText = "Fill";
//     /* 만약 사용자가 채우기 모드가 아닐 때 이 버튼을 클릭한다면, */
//     } else {
//         /* 채우기 모드로 바꾸고 싶다는거니까 */
//         isFilling = true;
//         modeBtn.innerText = "Draw";
//     }
// }

// function onCanvasClick(){
//     if (isFilling){
//         ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//     }
// }

// /* 전체 화면을 기본 백지로 초기화 시키지만 알고 보면 흰색으로 칠하는 것 */
// function onDestroyClick(){
//     ctx.fillStyle = "white";
//     ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
// }

// function onEraserClick(){
//     ctx.strokeStyle = "white";
//     isFilling = false;
//     modeBtn.innerText = "Fill";
// }

// function onFileChange(event){
//     const file = event.target.files[0];
//     /* 브라우저의 메모리에서 그 파일의 URL을 얻어올 것임 */
//     const url = URL.createObjectURL(file);
//     /*
//     blob:http://127.0.0.1:5500/7c7d8a8b-7784-4fb9-a8db-a4b6e3f18b14
//     => 브라우저가 자신의 메모리에 있는 파일을 드러내는 방식
//     */
//     const image = new Image();
//     image.src = url;
//     image.onload = function(){
//         ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//         fileInput.value = null;
//     }
// }

// function onDoubleClick(event){
//     const text = textInput.value;
//     // ctx의 이전 상태를 저장하고, 몇 가지 변경 후에 다시 되돌리기
//     if (text !== ""){
//         ctx.save(); // ctx의 현재 상태, 색상, 스타일 등 모든 것을 저장
//         ctx.lineWidth = 1;
//         ctx.font = "48px serif";
//         ctx.strokeText(text, event.offsetX, event.offsetY);     // offsetX와 offsetY는 마우스가 클릭한 canvas 내부 좌표
//         ctx.restore();  // 이전에 저장된 상태로 돌아감
//     }
// }

// /* toDataURL => 그린 이미지를 URL로 인코딩 */
// /* 캔버스에 그린 그림을 url로 변환한 다음에 a 태그를 생성해 가짜 링크를 만든 다음
// 링크의 href는 그림 URL로 설정해주고 */
// function onSaveClick(){
//     const url = canvas.toDataURL();
//     // 웹사이트로 링크하는 대신 이 이미지 URL로 링크할 것
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "myDrawing.png";
//     a.click();
// }

// canvas.addEventListener("dblclick", onDoubleClick);
// canvas.addEventListener("mousemove", onMove);
// canvas.addEventListener("mousedown", startPainting);
// canvas.addEventListener("mouseup", cancelPainting);
// canvas.addEventListener("mouseleave", cancelPainting); /* 마우스가 떠났을 때를 감지 */
// canvas.addEventListener("change", onCanvasClick);
// lineWidth.addEventListener("change", onLineWidthChange);
// color.addEventListener("change", onColorChange);
// colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
// modeBtn.addEventListener("click", onModeClick);
// destroyBtn.addEventListener("click", onDestroyClick);
// eraserBtn.addEventListener("click", onEraserClick);
// fileInput.addEventListener("change", onFileChange);
// saveBtn.addEventListener("click", onSaveClick);

// 2.0 Painting Lines
/* 목표: 보드를 클릭할 때마다 선 그리기 */
// ctx.lineWidth = 2;

// const colors = [
//     "#16a085",
//     "#f1c40f",
//     "#f1c40f",
//     "#f1c40f",
//     "#f39c12"
// ];

// function onclick(event){
//     ctx.beginPath();
//     ctx.moveTo(400, 400);
//     const color = colors[Math.floor(Math.random() * colors.length)];
//     ctx.strokeStyle = color;
//     ctx.lineTo(event.offsetX, event.offsetY);
//     ctx.stroke();
// }
// canvas.addEventListener("mousemove", onclick);

// 1.6 Drawing Project Two
// ctx.fillRect(210, 200, 15, 100);
// ctx.fillRect(350, 200, 15, 100);
// ctx.fillRect(260, 200, 60, 200);

// /* 4번째 인자 = starting angle, 5번째 인자 = ending angle */
// ctx.arc(290, 130, 50, 0, 2 * Math.PI);
// ctx.fill();

// ctx.beginPath();
// /* 무언가 색깔을 바꿔주려고 할 때 우선 새로운 path가 필요한지 아닌지 생각해야한다. */
// ctx.fillStyle = "white";
// ctx.arc(260, 120, 5, Math.PI, 2 * Math.PI);
// ctx.arc(300, 120, 5, Math.PI, 2 * Math.PI);
// ctx.fill();

// 1.5 Drawing Project One
// ctx.fillRect(200, 200, 50, 200);
// ctx.fillRect(400, 200, 50, 200);
// ctx.lineWidth = 2;
// ctx.strokeRect(300, 300, 50, 100);
// ctx.fillRect(200, 200, 200, 20);
// ctx.moveTo(200, 200);
// ctx.lineTo(325, 100);
// ctx.lineTo(450, 200);
// ctx.fill();

// 1.4 moveTo and lineTo
// 브러쉬는 항상 (0, 0) 좌표에서 시작, 브러쉬의 시작점을 옮겨주는 함수 moveTo, 시작점부터 길이를 정하는 함수 lineTo
// ctx.moveTo(50, 50);
// ctx.lineTo(150, 50);
// ctx.lineTo(150, 150);
// ctx.lineTo(50, 150);
// ctx.lineTo(50, 50);
// ctx.fill();

// 1.3 Paths
// ctx.rect(50, 50, 100, 100); /* 만들기만 하고 색은 안 줬기에 아무것도 안 보임 */
// ctx.rect(150, 150, 100, 100);
// ctx.rect(250, 250, 100, 100);
// ctx.fill();

// ctx.beginPath(); /* 이전 경로와 단절 */
// ctx.rect(350, 350, 100, 100);
// ctx.rect(450, 450, 100, 100);
// ctx.fillStyle = "red";
// ctx.fill();
