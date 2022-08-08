import styled from 'styled-components';
import Button from '../../components/Button';
import MainContainer from '../../layout/MainContainer';

export const SignUpContainer = styled(MainContainer)`
  position: relative;
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
export const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
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

  font-family: 'Pretendard';
  padding-left: 12px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  background: #f5f5f5;
  border-radius: 4px 4px 0px 0px;

  border: 0;
  border-bottom: 1px solid black;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #9e9e9e;
  }
`;
export const Error = styled.div`
  text-align: start;

  margin-top: 4px;
  margin-left: 16px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;

  color: #dd2c00;
`;
export const ErrorChecker = styled.div`
  position: absolute;
  top: 19.13px;
  right: 19.13px;
  background-image: url(${(props) =>
    props.checked === 'checked'
      ? './assets/images/signup_check.png'
      : './assets/images/signup_uncheck.png'});
  width: 12.7px;
  height: 9.75px;
`;

export const SignupButton = styled(Button)`
  position: absolute;
  bottom: 52px;
`;
