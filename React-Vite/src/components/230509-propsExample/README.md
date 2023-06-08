### React 컴포넌트 인자 전달
React에서 컴포넌트끼리 인자 전달은 `props`를 통해 이루어집니다.

예를 들어, 부모 컴포넌트에서 `ChildComponent`라는 자식 컴포넌트를 렌더링하면서 `props`를 전달하는 코드는 아래와 같이 작성할 수 있습니다.

```tsx
import React from "react";
import ChildComponent from "./ChildComponent";

const ParentComponent = () => {
  const name = "John";
  const age = 30;

  return <ChildComponent name={name} age={age} />;
};

export default ParentComponent;
```

이때, `ChildComponent`는 `name`과 `age`라는 이름의 `props`를 받아 사용할 수 있습니다.

```tsx
import React from "react";

const ChildComponent = (props: { name: string; age: number; }) => {
    return (
        <div>
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
        </div>
    );
};

export default ChildComponent;
```

이렇게 `props`를 통해 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달할 수 있습니다.