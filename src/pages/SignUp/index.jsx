import React from 'react';
import Button from '../../components/Button';
import Header from '../../layout/Header';
import {
  Error,
  ErrorChecker,
  Input,
  InputWrapper,
  Label,
  SignUpContainer,
} from './style';

function SignUp() {
  return (
    <SignUpContainer>
      <Header />
      <h1>프로필 설정</h1>
      <form>
        <InputWrapper>
          <Label>
            <Input type="text" id="userId" name="userId" placeholder="아이디" />
          </Label>
          <Error>한글, 영문, 숫자로</Error>
          <ErrorChecker />
        </InputWrapper>
        <Button>확인</Button>
      </form>
    </SignUpContainer>
  );
}

export default SignUp;
