import React from "react";
import { MenuBarStyle } from "../styles/canvasStyle";

const ColorSelector = () => {
  return (
    <div className="colorOptions">
      <div
        className="colorOption"
        style={{ backgroundColor: "#1abc9c" }}
        onClick={(e) => console.log(e.target.style.backgroundColor)}
      ></div>
      <div
        className="colorOption"
        style={{ backgroundColor: "#3498db" }}
        onClick={(e) => console.log(e.target.style.backgroundColor)}
      ></div>
      <div
        className="colorOption"
        style={{ backgroundColor: "#34495e" }}
        onClick={(e) => console.log(e.target.style.backgroundColor)}
      ></div>
      <div
        className="colorOption"
        style={{ backgroundColor: "#27ae60" }}
        onClick={(e) => console.log(e.target.style.backgroundColor)}
      ></div>
      <div
        className="colorOption"
        style={{ backgroundColor: "#8e44ad" }}
        onClick={(e) => console.log(e.target.style.backgroundColor)}
      ></div>
      <div
        className="colorOption"
        style={{ backgroundColor: "#f1c40f" }}
        onClick={(e) => console.log(e.target.style.backgroundColor)}
      ></div>
      <div
        className="colorOption"
        style={{ backgroundColor: "#e74c3c" }}
        onClick={(e) => console.log(e.target.style.backgroundColor)}
      ></div>
      <div
        className="colorOption"
        style={{ backgroundColor: "#95a5a6" }}
        onClick={(e) => console.log(e.target.style.backgroundColor)}
      ></div>
      <div
        className="colorOption"
        style={{ backgroundColor: "#d35400" }}
        onClick={(e) => console.log(e.target.style.backgroundColor)}
      ></div>
      <div
        className="colorOption"
        style={{ backgroundColor: "#2ecc71" }}
        onClick={(e) => console.log(e.target.style.backgroundColor)}
      ></div>
      <div
        className="colorOption"
        style={{ backgroundColor: "#e67e22" }}
        onClick={(e) => console.log(e.target.style.backgroundColor)}
      ></div>
    </div>
  );
};

function MenuBar({ getCtx, getCanvas }) {
  // 리셋 기능 구현
  const onReset = () => {
    // 리셋 기능은 clearRect() 메서드 사용
    getCtx.clearRect(0, 0, getCanvas.width, getCanvas.height);
  };
  // 삭제 기능 구현
  const onErase = () => {
    getCtx.strokeStyle = "white";
  };
  // 저장 기능 구현
  const onSave = () => {
    const imageURL = getCanvas.toDataURL();
    const downloadImage = document.createElement("a");
    downloadImage.href = imageURL;
    downloadImage.download = "paint_image";
    downloadImage.click();
  };
  return (
    <MenuBarStyle className="menuBar">
      <li className="iconWrap">
        <div className="icons">
          <FormatPaintIcon className="icon" />
        </div>
      </li>
      <li className="iconWrap">
        <div className="icons">
          <BorderColorIcon className="icon" />
        </div>
      </li>
      <li className="iconWrap">
        <div className="icons">
          <PaletteIcon className="icon" />
        </div>
        <ColorSelector />
      </li>
      {/* RESET BUTTON */}
      <li onClick={onReset} className="iconWrap">
        <div className="icons">
          <RestartAltIcon className="icon" />
        </div>
      </li>
      {/* SAVE BUTTON */}
      <li onClick={onSave} className="iconWrap">
        <div className="icons">
          <SaveIcon className="icon" />
        </div>
      </li>
    </MenuBarStyle>
  );
}

export default MenuBar;
