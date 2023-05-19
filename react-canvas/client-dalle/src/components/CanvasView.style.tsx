import styled from "styled-components";

const CanvasContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const CanvasButton = styled.button`
  width: 100px;
  height: 40px;
  padding: 10px 10px;
  margin: 5px;
`;

export { CanvasContainer, ButtonContainer, CanvasButton };