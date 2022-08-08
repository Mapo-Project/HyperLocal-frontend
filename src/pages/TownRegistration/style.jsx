import styled from 'styled-components';
import Button from '../../components/Button';
import MainContainer from '../../layout/MainContainer';

export const TownRegistrationContainer = styled(MainContainer)`
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

export const TownRegistrationList = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 16px;
`;
export const RegisteredTown = styled.button`
  border: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 12px 16px;

  width: 328px;
  height: 48px;

  background: #00d082;
  border-radius: 4px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  letter-spacing: 0.25px;

  color: #ffffff;

  cursor: pointer;

  div {
    width: 20px;
    height: 20px;
    background-image: url('./../assets/images/search_cancel.png');
  }
`;
export const UnRegisteredTown = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 328px;
  height: 48px;

  background-color: #fff;
  border: 1px solid #424242;
  border-radius: 4px;

  cursor: pointer;

  div {
    width: 14px;
    height: 14px;
    background-image: url('./../assets/images/search_add.png');
  }
`;

export const TownRegistrationButton = styled(Button)`
  position: absolute;
  left: 16px;
  bottom: 52px;
`;
