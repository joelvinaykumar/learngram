import React from "react";
import styled from "styled-components";

import { theme } from "../utils/theme";

export const Button = ({ text, action, color, bgColor, disabled }) => {
  return (
    <StyledButton
      onClick={action}
      color={color}
      bgColor={bgColor}
      disabled={disabled}
    >
      {text}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  padding: 30px 80px;
  text-transform: uppercase;
  background-color: ${({ disabled }) => disabled ? "gray" : theme.background};
  color: ${({ color }) => color ? color : "white"};
  font-size: 25px;
  border-radius: 10px;
  margin-top: 30px;
  cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};
`;