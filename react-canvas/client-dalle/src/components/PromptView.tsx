import React, { useState } from "react";
import { Input } from "@mui/material";
import { fetchGeneration } from "../fetchGeneration";

const PromptView = () => {
    const [inputPrompt, setInputPrompt] = useState<string>("");

    const handleInputPrompt = (event: React.ChangeEvent<HTMLInputElement>) => {
        const prompt = event.target.value;
        setInputPrompt(prompt);
    };

    const handleGenerate = async (inputPrompt: string) => {
        if (inputPrompt === "" || inputPrompt === null) {
            alert("prompt를 입력해주세요.");
            return;
        } else {
            fetchGeneration(inputPrompt);
        }
    };

    const insertPrompt = () => {
        return <Input
            value={inputPrompt}
            onChange={handleInputPrompt}
        />;
    };

    const generateButton = () => {
        return <button
            style={{
                width: "100px",
                height: "40px",
                padding: "10px 10px",
                margin: "5px"
            }} onClick={() => handleGenerate(inputPrompt)}
            type="submit">Generate
        </button>;
    };

    return (
        <>
            <div>
                {insertPrompt()}
                {generateButton()}
            </div>
        </>
    );

};
export default PromptView;