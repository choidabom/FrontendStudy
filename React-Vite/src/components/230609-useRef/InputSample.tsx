import React, { useState, useRef, ChangeEvent } from 'react';

interface Inputs {
    name: string;
    nickname: string;
}

const InputSample = () => {
    const [inputs, setInputs] = useState<Inputs>({
        name: '',
        nickname: ''
    });
    const nameInput = useRef<HTMLInputElement>(null);

    const { name, nickname } = inputs; // 비구조 할당을 통해 값 추출

    const onChange = (e: ChangeEvent<HTMLInputElement>) => { // 우선 e.target에서 name과 value를 추출
        const { value, name } = e.target;
        console.log(`value: ${value}, name: ${name}`);
        console.log(`inputs: ${inputs}`);
        setInputs({
            ...inputs, // 기존의 input 객체를 복사한 뒤
            [name]: value // name 키를 가진 값을 value로 설정
        });
    };

    const onReset = () => {
        setInputs({
            name: '',
            nickname: ''
        });
        if (nameInput.current) {
            nameInput.current.focus();
        }
    };

    return (
        <div>
            <input
                name="name"
                placeholder="이름"
                onChange={onChange}
                value={name}
                ref={nameInput}
            />
            <input
                name="nickname"
                placeholder="닉네임"
                onChange={onChange}
                value={nickname}
            />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ({nickname})
            </div>
        </div>
    );
};

export default InputSample;