import React, { useState } from "react";

const useEffectExample2 = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            <h1>Count: {count}</h1>
            {(() => {
                console.log(count);
            })()}
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </>
    );
};

export default useEffectExample2;