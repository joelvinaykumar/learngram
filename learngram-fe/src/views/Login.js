import React, { useState } from "react";
import styled from "styled-components";

import HomeBG from "../assets/images/background.jpg";
import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";

import { theme } from "../utils/theme";

export const Login = () => {

  const [tab, setTab] = useState(0);

  return (
    <Container>
      <InsideContainer>
        <Box>
          <Header>LearnGram</Header>
          <FormContainer>
            <TabContainer>
              <TabHeader active={tab === 0} onClick={() => setTab(0)}>
                Log In
              </TabHeader>
              <TabHeader active={tab === 1} onClick={() => setTab(1)}>
                Sign Up
              </TabHeader>
            </TabContainer>
            {tab === 0
              ? <LoginForm />
              : <SignupForm />
            }
          </FormContainer>
        </Box>
      </InsideContainer>
    </Container>
  );
}

const Container = styled.div`
  background-image: url(${HomeBG});
  background-repeat: repeat-y;
  background-size: cover;
  height: 100vh;
`;

const InsideContainer = styled.div`
  background-color: ${theme.overlay};
  background-opacity: 0.1;
  padding: 100px 0 55px 150px;
`;

const FormContainer = styled.div`
  padding-bottom: 10px;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.p`
  color: ${theme.background};
  font-size: 60px;
  margin: 0;
  padding-bottom: 20px;
  text-align: center;
`;

const TabContainer = styled.div`
  display: flex;
`;

const TabHeader = styled.div`
  width: 50%;
  height: 100px;
  background-color: ${({ active }) => active ? "white" : "#ddd"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 45px;
  color: ${({ active }) => active ? theme.background : "black"};
  font-weight: ${({ active }) => active ? "bold" : "normal"};
  cursor: pointer;
`;