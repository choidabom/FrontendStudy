import React, { useEffect } from "react";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

const Canvas = () => {
  // React에서는 useRef를 통해서 canvas에 접근해야한다.
  const canvasRef = useRef(null); // useRef 사용
  const contextRef = useRef(null); // 캔버스의 드로잉 컨텍스트를 참조

  const [ctx, setCtx] = useState(); // 캔버스의 드로잉 컨텍스트
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const context = canvas.getContext("2d");
    context.strokeStyle = "black"; // 선의 색
    context.lineWidth = 2.5; // 선의 굵기
    context.lineCap = "round"; // 선의 모양
    context.current = context;

    setCtx(context);
  }, []);

  const startDrawing = () => {
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  };

  /* JS코드와 비슷하지만 다른 점은 마우스를 움직일 때 전달받는 파라미터의 값이 JS에선 event지만 react에선 nativeEvent이다. */
  const drawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    // canvas.getContext('2d')의 값이 있을 때
    if (ctx) {
      if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      } else {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
  };
  return (
    <div className="canvas_wrap">
      {/* useRef 사용 */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={drawing}
        onMouseLeave={finishDrawing}
      ></canvas>
    </div>
  );
};

export default Canvas;
