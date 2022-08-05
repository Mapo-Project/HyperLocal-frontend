import styled from 'styled-components';
import signupCheck from '../public/images/signup_check.png';
import MainContainer from '../../layout/MainContainer';

export const SignUpContainer = styled(MainContainer)`
  text-align: center;
  h1 {
    margin-top: 16px;
    margin-bottom: 44px;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;

    text-align: center;

    color: #212121;
  }
`;

export const InputWrapper = styled.div`
  width: 328px;
  height: 64px;
  position: relative;
`;
export const Label = styled.label`
  width: 100%;
  height: 48px;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
`;
export const Error = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #f4511e;
`;
export const ErrorChecker = styled.div`
  background-image: url(signupCheck);
`;
