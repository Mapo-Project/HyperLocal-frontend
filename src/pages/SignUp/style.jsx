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
  position: relative;
  margin: auto;
`;
export const Label = styled.label`
  width: 100%;
  height: 48px;

  span {
    display: block;
    text-align: start;

    margin-bottom: 2px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;

    color: #212121;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;

  font-family: 'Pretendard';
  padding-left: 12px;
  padding-right: 50px;
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

  height: 16px;
  color: #dd2c00;
`;
export const ErrorChecker = styled.img`
  position: absolute;
  top: 33px;
  right: 13px;
  width: 24px;
`;

export const SignupButton = styled(Button)`
  position: absolute;
  bottom: 52px;
`;

export const SignupButtonDisable = styled.div`
  position: absolute;
  bottom: 52px;
  width: 328px;
  height: 48px;

  padding: 14px 16px;

  background-color: gray;
  border-radius: 4px;
  border: 0;

  cursor: pointer;

  font-family: 'Pretendard';
  color: #ffffff;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.25px;
`;
