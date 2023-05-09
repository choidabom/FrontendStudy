import React from "react";
import ChildComponent from "./ChildComponent";

const ParentComponent = () => {
    const name: string = "Jade";
    const age = 25;

    return <ChildComponent name={name} age={age} />;
};
export default ParentComponent;