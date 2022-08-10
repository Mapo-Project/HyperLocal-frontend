import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import Footer from '../../layout/Footer';
import {
  Error,
  ErrorChecker,
  Input,
  InputWrapper,
  Label,
  SignupButton,
  SignUpContainer,
  SignupForm,
} from './style';

function SignUp() {
  const navigate = useNavigate();
  const onSubmitSignUp = useCallback(
    (e) => {
      e.preventDefault();
      navigate('/town/search');
    },
    [navigate],
  );
  return (
    <SignUpContainer>
      <h1>프로필 설정</h1>
      <SignupForm onSubmit={onSubmitSignUp}>
        <InputWrapper>
          <Label>
            <span>아이디</span>
            <Input type="text" id="userId" name="userId" placeholder="아이디" />
          </Label>
          <Error>한글, 영문, 숫자로</Error>
          <ErrorChecker checked="checked" />
        </InputWrapper>
        <InputWrapper>
          <Label>
            <span>전화번호</span>
            <Input
              type="text"
              id="phonenum"
              name="phonenum"
              placeholder="전화번호"
            />
          </Label>
          <Error>유효하지 않은 전화번호입니다.</Error>
          <ErrorChecker checked="checked" />
        </InputWrapper>
        <InputWrapper>
          <Label>
            <span>E-mail</span>
            <Input type="email" id="email" name="email" placeholder="E-mail" />
          </Label>
          <Error>사용할 수 없는 이메일입니다.</Error>
          <ErrorChecker checked="unchecked" />
        </InputWrapper>
        <SignupButton>확인</SignupButton>
      </SignupForm>
      <Footer />
    </SignUpContainer>
  );
}

export default SignUp;
