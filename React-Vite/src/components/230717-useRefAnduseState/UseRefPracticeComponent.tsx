import { useRef, useState } from 'react';

const UseRefPracticeComponent = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previewText, setPreviewText] = useState<string>('');

    const handleInputChange = () => {
        // useRef로 생성된 inputRef.current를 통해 실제 DOM에 접근하여 사용자가 입력한 값을 가져옴
        const userInput = inputRef.current?.value || '';
        setPreviewText(userInput);
    };

    return (
        <div>
            {/* useRef로 생성된 ref를 input 요소에 연결 */}
            <input ref={inputRef} type="text" onChange={handleInputChange} />
            <div>
                {/* 사용자가 입력한 내용을 미리보기로 표시 */}
                Preview: {previewText}
            </div>
        </div>
    );
};

export default UseRefPracticeComponent;