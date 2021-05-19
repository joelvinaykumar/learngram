import React, { useState } from "react";
import styled from "styled-components";

import { Button } from "../components/Button";
import { theme } from "../utils/theme";
import { Login } from "../actions/Auth";

export const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { success } = await Login({ email, password });
    console.log(success)
    if(success) {
      window.location.href = "/";
    }
  }

  return (
    <Container>
      <>
        <InputTitle>Email</InputTitle>
        <StyledInput
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </>
      <>
        <InputTitle>Password</InputTitle>
        <StyledInput
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </>
      <Center><Button text="Login" action={handleLogin} /></Center>
    </Container>
  );
}

const Container = styled.div`
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InputTitle = styled.p`
  font-size: 30px;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  width: 90%;
  height: 60px;
  border: 1px solid ${theme.background};
  border-radius: 10px;

  &:focus {
    border-width:0px;
    border:none;
  }
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;