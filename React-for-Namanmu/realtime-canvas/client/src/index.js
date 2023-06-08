import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

/* 새로 나온 리액트 18에서는 ReactDOM.render가 아니라, createRoot를 사용해야한다. */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
