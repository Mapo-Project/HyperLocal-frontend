import styled from 'styled-components';
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
  margin: auto;
`;
export const Label = styled.label`
  width: 100%;
  height: 48px;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;

  background: #f5f5f5;
  border-radius: 4px 4px 0px 0px;

  border: 0;
  border-bottom: 1px solid black;
  ::placeholder,
  ::-webkit-input-placeholder {
    padding-left: 12px;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;

    color: #212121;
  }
`;
export const Error = styled.div`
  text-align: start;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #f4511e;
`;
export const ErrorChecker = styled.div`
  position: absolute;
  top: 19.13px;
  right: 19.13px;
  background-image: url('./assets/images/signup_check.png');
  width: 12.7px;
  height: 9.75px;
`;
