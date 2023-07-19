import React, { useRef, useEffect } from 'react';

function ExampleComponent() {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        // 컴포넌트가 마운트되면, input 요소에 포커스를 줍니다.
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div>
            <input ref={inputRef} type="text" />
            <button>Submit</button>
        </div>
    );
}
