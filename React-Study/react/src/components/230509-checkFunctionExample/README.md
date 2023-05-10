### React 컴포넌트 시작하자마자 확인하려면 ! - useEffect 사용
React에서 return 구문에서 클릭 이벤트 없이 단순히 확인하는 함수를 구현하는 방법은 다양합니다. 일반적으로 다음과 같은 방법을 사용합니다.

1. useEffect 훅 사용
useEffect 훅을 사용하여 상태(state)가 변경될 때마다 특정 작업을 수행할 수 있습니다. return 구문에서 useEffect를 사용하여 특정 조건을 만족하면 작업을 수행하도록 할 수 있습니다.

예를 들어, 다음과 같이 useState 훅을 사용하여 상태를 저장하고, useEffect 훅을 사용하여 상태가 변경될 때마다 해당 상태를 콘솔에 출력하는 함수를 작성할 수 있습니다.

```tsx
import React, { useState, useEffect } from "react";

const App = () => {
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

export default App;
```

위의 예시에서, count 상태가 변경될 때마다 useEffect 훅이 실행되고, 해당 상태를 콘솔에 출력합니다.

2. 즉시 실행 함수 사용
return 구문에서 함수를 즉시 실행할 수 있습니다. 이를 이용하여 상태(state)를 확인하는 함수를 즉시 실행할 수 있습니다.

예를 들어, 다음과 같이 useState 훅을 사용하여 상태를 저장하고, 함수를 즉시 실행하여 해당 상태를 콘솔에 출력할 수 있습니다.

```tsx
import React, { useState } from "react";

const App = () => {
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

export default App;
```

위의 예시에서, 함수를 즉시 실행하여 count 상태를 콘솔에 출력합니다. 단순히 확인 용도로 사용하기에 적합합니다.