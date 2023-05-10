import React, { useState, useEffect } from "react";

const useEffectExample1 = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(count);
    }, [count]);

    return (
        <>
            <h1>Count: {count}</h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </>
    );
};

export default useEffectExample1;