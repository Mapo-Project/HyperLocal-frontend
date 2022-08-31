import styled from 'styled-components';
import Button from '../../components/Button';
import MainContainer from '../../layout/MainContainer';

export const LoginContainer = styled(MainContainer)`
  position: relative;
  text-align: center;

  h1 {
    margin-top: 16px;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;

    text-align: center;

    color: #212121;
  }
`;

export const LoginButton = styled(Button)`
  background: #fee500;
  position: absolute;
  bottom: 52px;
  left: 16px;
  cursor: pointer;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 20px;
  }

  span {
    margin-top: 2px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 100%;

    color: #424242;

    margin-left: 16px;
  }
`;
