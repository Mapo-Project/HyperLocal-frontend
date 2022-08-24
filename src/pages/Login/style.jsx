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
  background: ${(props) => (props.domain === 'kakao' ? '#FEE500' : '#03C75A')};
  position: absolute;
  bottom: ${(props) => (props.domain === 'kakao' ? '116px' : '52px')};
  left: 16px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: ${(props) => (props.domain === 'kakao' ? '20px' : '16px')};
  }

  span {
    margin-top: 2px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 100%;

    color: ${(props) => (props.domain === 'kakao' ? '#424242' : '#ffffff')};

    margin-left: ${(props) => (props.domain === 'kakao' ? '16px' : '18px')};
  }
`;
