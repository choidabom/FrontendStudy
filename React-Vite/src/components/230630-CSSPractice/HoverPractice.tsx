import { useState } from "react";
import styled from "styled-components";

const HoverPractice = () => {
    const TestObj = styled.div`
        display: block;
        margin: 100px;
        width: 200px;
        height: 200px;
        transition: all 0.2s ease-out;
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        
        &:hover {
            // ㅛ transform: translateY(-10px);
            transform: scale(1.03);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
    `;
    return (
        <>
            <TestObj />
        </>
    );
};

export default HoverPractice;

