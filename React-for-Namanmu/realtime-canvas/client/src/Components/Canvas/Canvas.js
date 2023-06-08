import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import "./Canvas.css";

const Canvas = () => {
  const { current: canvasDetails } = useRef({
    color: "#DD8890",
    lineWidth: 5,
    socketUrl: "/",
  });
  const [brushColor, setBrushColor] = useState("white");
  const [brushRadius, setBrushRadius] = useState(5);
  const [storeImgData, setStoreImgData] = useState([""]);
  const [storeImgData1, setStoreImgData1] = useState([""]);

  /* 색깔 변경 기능 */
  const changeColor = (newColor) => {
    setBrushColor(newColor);
    canvasDetails.color = brushColor;
  };

  /* 굵기 변경 기능 */
  const changeBrushSize = (newBrushSize) => {
    canvasDetails.socket.emit("setBrush");
    changeBrushRadius(newBrushSize);
  };

  /* 굵기 변경 함수 */
  function changeBrushRadius(newBrushSize) {
    setBrushRadius(newBrushSize);
    canvasDetails.lineWidth = brushRadius;
  }

  /* 지우기 기능 */
  const onErase = () => {
    canvasDetails.lineWidth = 10;
    canvasDetails.color = "white";
  };

  /* 펜으로 바꾸는 함수 */
  const onPen = () => {
    canvasDetails.color = brushColor;
    canvasDetails.lineWidth = brushRadius;
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.globalCompositeOperation = "source-over";
  };

  const onClear = () => {
    canvasDetails.socket.emit("clear");
    clearCanvas();
  };

  function clearCanvas() {
    canvasDetails.socket.emit("undoCanvas");
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  /* undo 기능 */
  const onUndo = () => {
    undoCanvas();
  };

  function undoCanvas() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    storeImgData.pop();
    canvasDetails.socket.emit("undo-photo", { photoData: storeImgData });
    const image = new Image();
    image.src = storeImgData[storeImgData.length - 1];
    context.drawImage(image, 0, 0);
  }

  useEffect(() => {
    canvasDetails.socketUrl = "http://localhost:5000";
    canvasDetails.socket = io.connect(canvasDetails.socketUrl, () => {
      console.log("connecting to server");
    });
    canvasDetails.socket.on("image-data", (data) => {
      const image = new Image();
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d");
      image.src = data;
      image.addEventListener("load", () => {
        context.drawImage(image, 0, 0);
      });
    });
    canvasDetails.socket.on("undo-data", ({ undoData }) => {
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d");
      const image = new Image();
      image.src = undoData[undoData.length - 1];
      console.log(storeImgData[storeImgData.length - 1]);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
    });
    canvasDetails.socket.on("clear", clearCanvas);

    canvasDetails.socket.on("undoCanvas", undoCanvas);
  });

  const canvas = useRef();
  useEffect(() => {
    const mouseMoveHandler = (e, type) => {
      const event = type === "touch" ? e.touches[0] : e;
      findxy("move", event);
    };
    const mouseDownHandler = (e, type) => {
      const event = type === "touch" ? e.touches[0] : e;
      findxy("down", event);
    };
    const mouseUpHandler = (e, type) => {
      const event = type === "touch" ? e.touches[0] : e;
      findxy("up", event);
    };

    let prevX = 0,
      currX = 0,
      prevY = 0,
      currY = 0,
      flag = false;

    const context = canvas.current.getContext("2d");

    const onSave = () => {
      if (!canvasDetails.waiting) {
        const base64EncodedUrl = canvas.toDataURL("image/png");
        // storeImgData.push(base64EncodedUrl);
        // storeImgData1.push(base64EncodedUrl);
        canvasDetails.socket.emit("image-data", base64EncodedUrl);
        canvasDetails.waiting = true;
        setTimeout(() => {
          canvasDetails.waiting = false;
        }, 100);
      }
    };

    const draw = (e) => {
      // START- DRAW
      context.beginPath();
      context.moveTo(prevX, prevY);
      context.lineTo(currX, currY);
      context.strokeStyle = canvasDetails.color;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineWidth = canvasDetails.lineWidth;
      context.stroke();
      context.closePath();
      // END- DRAW

      onSave();
    };

    const findxy = (res, e) => {
      if (res === "down") {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.current.offsetLeft;
        currY = e.clientY - canvas.current.offsetTop;
        flag = true;
      }
      if (res === "up" || res === "out") {
        flag = false;
      }
      if (res === "move") {
        if (flag) {
          prevX = currX;
          prevY = currY;
          currX = e.clientX - canvas.current.offsetLeft;
          currY = e.clientY - canvas.current.offsetTop;
          draw(e);
        }
      }
    };

    canvas.current.addEventListener("mousemove", mouseMoveHandler);
    canvas.current.addEventListener("mousedown", mouseDownHandler);
    canvas.current.addEventListener("mouseup", mouseUpHandler);
    canvas.current.addEventListener(
      "touchmove",
      (e) => mouseMoveHandler(e, "touch"),
      {
        passive: true,
      }
    );
    canvas.current.addEventListener(
      "touchstart",
      (e) => mouseDownHandler(e, "touch"),
      {
        passive: true,
      }
    );
    canvas.current.addEventListener("touchend", (e) =>
      mouseUpHandler(e, "touch")
    );
    canvas.current.addEventListener("dblclick", onSave);

    return () => {
      canvas.current.removeEventListener("mousemove", mouseMoveHandler);
      canvas.current.removeEventListener("mousedown", mouseDownHandler);
      canvas.current.removeEventListener("mouseup", mouseUpHandler);
      canvas.current.removeEventListener("dblclick", onSave);
    };
  }, []);

  return (
    <div>
      <input
        className="color-picker"
        type="color"
        defaultValue="#DD8890"
        onChange={(event) => changeColor(event.target.value)}
      />
      <input
        className="range-input"
        min="1"
        max="25"
        type="range"
        value={brushRadius}
        step="0.1"
        onChange={(event) => changeBrushSize(parseInt(event.target.value))}
      />
      <span>{brushRadius}</span>
      <canvas ref={canvas} className="canvas"></canvas>
      <div className="button-wrapper">
        <button className="btn" onClick={(event) => onPen()}>
          ✏️ pen
        </button>
        <button className="btn" onClick={(event) => onErase()}>
          ❌ Erase
        </button>
        <button className="btn" onClick={(event) => onUndo()}>
          🔙 Undo
        </button>
        <button className="btn" onClick={(event) => onClear()}>
          💣 Clear
        </button>
      </div>
    </div>
  );
};

export default Canvas;
