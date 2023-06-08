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