import React, { useState, useEffect } from "react";

// 카운터에 사용할 count state, input에 사용될 text state
const LifeCycle = () => {
    const [count, setCount] = useState(0);
    const [text, setText] = useState("");

    // 1번 Mount 탄생 시점
    useEffect(() => {
        console.log("Mount 탄생!");
    }, []);

    // 2번 Update 시점 (댑스 입력 X)

    return (
        <div>
            <div>

            </div>
            <div>

            </div>
        </div>
    );
};
