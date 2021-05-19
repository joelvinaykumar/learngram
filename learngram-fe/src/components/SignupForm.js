import React, { useState } from "react";
import styled from "styled-components";

import { Button } from "../components/Button";
import { theme } from "../utils/theme";
import { passwordValidator } from "../utils/validations";
import { Signup } from "../actions/Auth";

import Tick from "../assets/icons/tick.svg";
import Close from "../assets/icons/close.svg";

export const SignupForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ctaDisabled, setCtaDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handlePasswordChange = e => {
    const value = e.target.value;
    const errs = passwordValidator(value);
    setErrors(errs);
    setCtaDisabled(errors.every(err => err.valid));
    setPassword(value);
  };

  const handleSignUp = async () => {
    setLoading(true);
    const { success } = await Signup({ email, password });
    console.log('zkjdvfvbj', success)
    if (success) {
      alert(`Account created for ${email}`);
      setEmail('');
      setPassword('');
    }
    setLoading(false);
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
          onChange={handlePasswordChange}
        />
        {errors.length > 0
        && (
          <ErrorContainer>
            {errors.length>0 && errors.map(error => (
              <div style={{ display: "flex" }} >
                <SuccessIcon src={error.valid? Tick: Close} width={15} />
                {error.message}
              </div>
            ))}
          </ErrorContainer>
        )}
      </>
      <Center>
        <Button
          text="Signup"
          disabled={ctaDisabled || !email || loading}
          action={handleSignUp}
        />
        </Center>
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
  padding: 10pxs;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ErrorContainer = styled.div`
  padding: 15px 20px;
  background-color: ${theme.background};
  width: 85%;
  margin-top: 20px;
  border-radius: 15px;
  color: white;
`;

const SuccessIcon = styled.img`
  margin: 0 20px 15px 0;
`;