import React, { useRef, useEffect, useState, useCallback } from 'react';

interface Coordinate {
    x: number;
    y: number;
}

interface CanvasProps {
    width?: number; // 캔버스의 너비를 나타내는 속성
    height?: number; // 캔버스의 높이를 나타내는 속성
    imageData: ImageData | null; // 이미지 데이터
    canvasRef: React.RefObject<HTMLCanvasElement>; // 캔버스 요소를 참조하기 위한 ref
}

const Canvas: React.FC<CanvasProps> = ({ width = 500, height = 500, imageData, canvasRef }) => {
    const [isPainting, setIsPainting] = useState<boolean>(false);
    const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        if (canvas && context && imageData) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            // context.putImageData(imageData, 0, 0);
        }
    }, [imageData, canvasRef]);


    const getCoordinates = useCallback((event: MouseEvent): Coordinate | undefined => {
        if (!canvasRef.current) return;
        const canvas: HTMLCanvasElement = canvasRef.current;
        return {
            x: event.pageX - canvas.offsetLeft,
            y: event.pageY - canvas.offsetTop,
        };
    }, []);

    const startPaint = useCallback((event: MouseEvent) => {
        const coordinates = getCoordinates(event);
        if (coordinates) {
            setMousePosition(coordinates);
            setIsPainting(true);
        }
    }, [getCoordinates]);

    const paint = useCallback((event: MouseEvent) => {
        if (!isPainting || !mousePosition) return;

        const newMousePosition = getCoordinates(event);
        if (newMousePosition) {
            eraseLine(mousePosition, newMousePosition);
            setMousePosition(newMousePosition);
        }
    }, [isPainting, mousePosition, getCoordinates]);

    const exitPaint = useCallback(() => {
        setIsPainting(false);
        setMousePosition(undefined);
    }, []);

    const eraseLine = useCallback((originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (context) {
            context.strokeStyle = 'white';
            context.lineJoin = 'round';
            context.lineWidth = 10;

            context.beginPath();
            context.moveTo(originalMousePosition.x, originalMousePosition.y);
            context.lineTo(newMousePosition.x, newMousePosition.y);
            context.closePath();
            context.stroke();
        }
    }, []);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        canvas.addEventListener('mousedown', startPaint);
        canvas.addEventListener('mousemove', paint);
        canvas.addEventListener('mouseup', exitPaint);
        canvas.addEventListener('mouseleave', exitPaint);

        return () => {
            canvas.removeEventListener('mousedown', startPaint);
            canvas.removeEventListener('mousemove', paint);
            canvas.removeEventListener('mouseup', exitPaint);
            canvas.removeEventListener('mouseleave', exitPaint);
        };
    }, [startPaint, paint, exitPaint]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            style={{ backgroundColor: 'white' }}
        />
    );
};

export default Canvas;
