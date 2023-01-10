import React, { useState, useEffect, useRef } from "react";
import { CanvasStyle } from "../styles/canvasStyle";
import MenuBar from "./MenuBar";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

// 그림을 그릴 수 있는 기능 구현
const Canvas = () => {
  // React에서는 useRef를 통해서 canvas에 접근해야한다.
  const canvasRef = useRef(null); // useRef 사용
  const [getCtx, setGetCtx] = useState(null); // 캔버스의 드로잉컨텍스트
  const [getCanvas, setGetCanvas] = useState(null); // canvas
  const [isDrawing, setIsDrawing] = useState(false); // painting state

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const ctx = canvas.getContext("2d");
    // Default 스타일 값 지정
    ctx.lineWidth = 2.5; // 선의 굵기
    ctx.lineCap = "round"; // 선의 모양
    ctx.strokeStyle = "black"; // 선의 색

    setGetCtx(ctx);
    setGetCanvas(canvas);
  }, []);

  /* JS코드와 비슷하지만 다른 점은 마우스를 움직일 때 전달받는 파라미터의 값이 JS에선 event지만 react에선 nativeEvent이다. */
  const Drawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    // drawing
    if (!isDrawing) {
      getCtx.beginPath(); // 경로 초기화
      getCtx.moveTo(offsetX, offsetY);
    } else {
      getCtx.lineTo(offsetX, offsetY);
      getCtx.stroke();
    }
  };

  /* setDrawing의 또 다른 방법 ! 
    const drawFn = (event) => {
    const mouseX = event.nativeEvent.offsetX;
    const mouseY = event.nativeEvent.offsetY;
    if (!painting) {
      getCtx.beginPath();
      getCtx.moveTo(mouseX, mouseY);
    } else {
      getCtx.lineTo(mouseX, mouseY);
      getCtx.stroke();
    }
  };
   */

  const startDrawing = () => {
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <CanvasStyle>
      <div className="view">
        <div className="canvasWrap">
          <canvas
            className="canvas"
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={Drawing}
            onMouseLeave={finishDrawing}
          ></canvas>
        </div>
        <div>
          <MenuBar getCtx={getCtx} getCanvas={getCanvas} />
        </div>
        <div>
          <Button></Button>
        </div>
      </div>
    </CanvasStyle>
  );
};

export default Canvas;
