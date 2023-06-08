import React, { useState, useEffect } from "react";
import "./App.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import html2canvas from "html2canvas";

ReactQuill.modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: [] }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ color: [] }],
  ],
};

ReactQuill.formats = ["font", "size", "color", "indent"];

let timeout = null;
function App() {
  const [textValue, setTextValue] = useState("");
  const handleChange = (value) => {
    setTextValue(value);
  };

  useEffect(() => {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(() => {
      const textarea = document.createElement("div");
      textarea.className = "ql-editor canvas-wrapper";
      textarea.innerHTML = textValue;
      document.body.appendChild(textarea);
      html2canvas(textarea).then((canvas) => {
        document.getElementById("capture").replaceChildren(canvas);
      });
      document.body.removeChild(textarea);
    }, 200);
  }, [textValue]);

  return (
    <div className="App">
      <div className="editor-wrapper">
        <div className="editor">
          <ReactQuill
            className="editor-quill"
            modules={ReactQuill.modules}
            formats={ReactQuill.formats}
            value={textValue}
            onChange={handleChange}
          />
        </div>
        <div
          id="capture"
          className="ql-editor canvas-wrapper"
          style={{
            height: 200,
            width: 300,
            display: "flex",
            border: "1px solid",
          }}
        />
      </div>
    </div>
  );
}

export default App;
