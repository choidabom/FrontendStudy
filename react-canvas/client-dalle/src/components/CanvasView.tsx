import React, { useRef, useEffect, useState, useCallback } from "react";
import { Input } from "@mui/material";
import { fetchEdits } from "../fetchEdits";
import { fetchGeneration } from "../fetchGeneration";
import { fetchVariation } from "../fetchVariation";
import { CanvasButton, CanvasContainer } from "./CanvasView.style";

interface Coordinate {
    x: number;
    y: number;
};

interface CanvasProps {
    width?: number; // 캔버스의 너비를 나타내는 속성
    height?: number; // 캔버스의 높이를 나타내는 속성
}

const Canvas: React.FC<CanvasProps> = ({ width = 550, height = 550, }) => {
    // React에서는 useRef를 통해서 canvas에 접근해야한다.
    const canvasRef = useRef<HTMLCanvasElement>(null); // canvas element에 대한 참조를 저장하기 위한 useRef Hook 사용
    const fileInputRef = useRef(null);

    const [inputPrompt, setInputPrompt] = useState<string>("");

    const [originImageData, setOriginImageData] = useState<ImageData | null>(null);
    const [imageData, setImageData] = useState<ImageData | null>(null);

    const [isPainting, setIsPainting] = useState<boolean>(false); // 그리기 상태를 나타내기 위한 상태 값
    const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined); // 마우스 위치를 저장하기 위한 상태 값

    // prompt 입력값 input
    const handleInputPrompt = (event: React.ChangeEvent<HTMLInputElement>) => {
        const prompt = event.target.value;
        setInputPrompt(prompt);
    };

    // 입력값에 따른 여러 요청 (Generation/Edits/Variation)
    const handleRequest = async () => {
        if (inputPrompt === "" && !originImageData) {
            alert("prompt를 입력해주세요.");
            return;
        } else {
            if (inputPrompt || !originImageData) {
                fetchGeneration(inputPrompt);
            } else if (!inputPrompt || originImageData) {
                fetchVariation(originImageData);
            } else if (inputPrompt || originImageData) {
                // fetchEdits(inputPrompt, originImageData, imageData);
            }
        }
    };

    const getCoordinates = useCallback((event: MouseEvent): Coordinate | undefined => {
        if (!canvasRef.current) return; // canvas element가 없으면 반환
        const canvas: HTMLCanvasElement = canvasRef.current;
        return {
            x: event.pageX - canvas.offsetLeft, // 마우스의 페이지 X 좌표에서 캔버스의 offsetLeft 값을 빼서 상대적인 X 좌표 계산
            y: event.pageY - canvas.offsetTop   // 마우스의 페이지 Y 좌표에서 캔버스의 offsetTop 값을 빼서 상대적인 Y 좌표 계산
        };
    }, []);


    const startPaint = useCallback((event: MouseEvent) => {
        const coordinates = getCoordinates(event);  // 마우스 이벤트에서 좌표를 가져옴
        if (coordinates) {
            setMousePosition(coordinates); // 마우스 위치 설정
            setIsPainting(true);    // 그리기 상태를 true로 설정
        }
    }, [getCoordinates]);


    const paint = useCallback((event: MouseEvent) => {
        if (!isPainting || !mousePosition) return; // 그리기 상태가 아니거나 마우스 위치가 없으면 종료

        const newMousePosition = getCoordinates(event); // 새로운 마우스 위치를 가져옴
        if (newMousePosition) {
            eraseLine(mousePosition, newMousePosition); // 마우스 위치를 업데이트
            setMousePosition(newMousePosition);
        }
    }, [isPainting, mousePosition, getCoordinates]);


    const exitPaint = useCallback(() => {
        setIsPainting(false); // 그리기 상태를 false로 설정
        setMousePosition(undefined); // 마우스 위치를 초기화
    }, []);


    const eraseLine = useCallback((originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
        if (!canvasRef.current || !imageData) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d'); // 2D 그래픽 컨텍스트 가져오기
        if (!context) return;   // 컨텍스트가 없으면 종료

        // 두 점 사이의 거리 계산
        const dx = newMousePosition.x - originalMousePosition.x;
        const dy = newMousePosition.y - originalMousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 한 단계 크기와 단계 수 계산
        const stepSize = 1;
        const numSteps = Math.ceil(distance / stepSize);

        // 각 단계별 증가량 계산
        const xIncrement = dx / numSteps;
        const yIncrement = dy / numSteps;

        // "destination-out" 합성 모드로 지우개로 그림을 지움
        context.globalCompositeOperation = "destination-out";
        for (let i = 0; i <= numSteps; i++) {
            const x = originalMousePosition.x + xIncrement * i;
            const y = originalMousePosition.y + yIncrement * i;
            context.beginPath();
            context.arc(x, y, 5, 0, 2 * Math.PI);
            context.fill();
        }
        // 현재 캔버스 이미지 데이터를 업데이트하고, 캔버스에 이미지를 그립니다.
        setImageData(context.getImageData(0, 0, canvas.width, canvas.height));
    }, [imageData]);


    const handleUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // 업로드된 파일 가져오기
        if (file) {
            const reader = new FileReader(); // 가져온 파일이 있을 경우, FileReader 객체 생성
            reader.onload = () => { // 파일을 성공적으로 읽었을 때 실행
                const image = new Image();
                image.onload = () => { // 이미지가 성공적으로 로드되었을 떄 실행
                    const canvas = canvasRef.current; // canvas element 가져오기
                    if (canvas) {
                        canvas.width = image.width; // canvas의 너비를 이미지의 너비로 설정
                        canvas.height = image.height; // canvas의 높이를 이미지의 높이로 설정
                        const context = canvas.getContext('2d'); // canvas 컨텍스트 가져오기
                        if (context) {
                            context.drawImage(image, 0, 0); // 이미지를 canvas에 그리기
                            setOriginImageData(context.getImageData(0, 0, image.width, image.height)); // 이미지 데이터 저장
                            setImageData(context.getImageData(0, 0, image.width, image.height)); // 이미지 데이터 저장
                        }
                    }
                };
                image.src = reader.result as string; // 이미지 데이터 설정
            };
            reader.readAsDataURL(file); // 파일을 데이터 URL로 읽기
        }
    }, []);


    // canvas 위의 image clear
    const handleClear = useCallback(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                setImageData(null);
            }
        }
    }, []);


    // canvas 위의 image 다운로드
    const handelDownload = useCallback(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const dataURL = canvas.toDataURL("image/png"); // 캔버스 이미지를 데이터 URL로 변환
            const link = document.createElement("a"); // 새로운 <a> 요소 생성하여 데이터 URL
            link.href = dataURL;
            link.download = "result.png";
            link.click();
        }
    }, []);


    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mousedown', startPaint);
        return () => {
            canvas.removeEventListener('mousedown', startPaint);
        };
    }, []);


    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        canvas.addEventListener('mousedown', startPaint); // 마우스 다운 이벤트에 startPaint 이벤트 리스너 추가

        return () => {
            canvas.removeEventListener('mousedown', startPaint); // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        };
    }, [startPaint]);


    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        canvas.addEventListener('mousemove', paint); // 마우스 이동 이벤트에 paint 이벤트 리스너 추가

        return () => {
            canvas.removeEventListener('mousemove', paint); // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        };
    }, [paint]);


    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        canvas.addEventListener('mouseup', exitPaint); // 마우스 업 이벤트에 exitPaint 이벤트 리스너 추가
        canvas.addEventListener('mouseleave', exitPaint); // 마우스가 캔버스 영역을 벗어날 때에도 exitPaint 이벤트 리스너 추가

        return () => {
            canvas.removeEventListener('mouseup', exitPaint); // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
            canvas.removeEventListener('mouseleave', exitPaint); // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        };
    }, [exitPaint]);


    // Prompt 작성 input
    const insertPrompt = () => {
        return <Input
            value={inputPrompt}
            onChange={handleInputPrompt}
        />;
    };

    // Generation, Edits, Variation 버튼
    const generateButton = () => {
        return <CanvasButton
            onClick={() => handleRequest()} type="submit">
            {!imageData ? "Generate" : !inputPrompt ? "Variation" : "Edits"}
        </CanvasButton>;
    };

    return (
        <CanvasContainer>
            <div>
                {insertPrompt()}
                {generateButton()}
            </div>
            <div>
                <div>
                    <canvas ref={canvasRef} width={width} height={height} style={{ border: "1px solid gray" }} />
                </div>
                <input type="file" accept="image/png" onChange={handleUpload} ref={fileInputRef} />
                <CanvasButton onClick={handleClear}>Clear</CanvasButton>
                {/* <CanvasButton onClick={handleErase}>Erase</CanvasButton> */}
                <CanvasButton onClick={handelDownload}>Download</CanvasButton>
            </div >
        </CanvasContainer>
    );
};

export default Canvas;

