import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { theme } from "../utils/theme";

import { Logout } from "../actions/Auth";

export const Navbar = () => {
  return (
    <Container>
      <StyledLink href="/">Home</StyledLink>
      <StyledLink onClick={() => Logout()}>Logout</StyledLink>
    </Container>
  );
}

const Container = styled.div`
  padding: 25px 30px;
  font-size: 35px;
  color: ${theme.background};
  border-bottom: 1px solid ${theme.background};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;