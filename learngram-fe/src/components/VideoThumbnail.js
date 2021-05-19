import React from "react";
import styled from "styled-components";

// icons
import Play from "../assets/icons/play.svg";
import { theme } from "../utils/theme";

export const VideoThumbnail = ({ title, deleteAction, onClick }) => {

  return (
    <Container>
      <Thumb onClick={onClick}>
        <p>{title}</p>
        <img src={Play} width={30} alt="play" />
      </Thumb>
      <Tray>
        <a href="#" onClick={deleteAction}>Delete</a>
      </Tray>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  cursor: pointer;
`;

const Thumb = styled.div`
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  border-radius: 15px;
  margin-bottom: 10px;
  font-size: 25px;
  color: ${theme.background};
`;

const Tray = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  color: red;
`;