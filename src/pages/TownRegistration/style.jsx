import styled from 'styled-components';
import Button from '../../components/Button';
import MainContainer from '../../layout/MainContainer';

export const TownRegistrationContainer = styled(MainContainer)`
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
  h2 {
    margin-top: 16px;
    margin-bottom: 8px;

    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;

    color: #9e9e9e;
  }
  .town_back_btn {
    position: absolute;
    height: 24px;
    top: 16px;
    left: 16px;
    cursor: pointer;
  }
`;

export const TownRegistrationList = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 16px;
`;
export const RegisteredTown = styled.button`
  position: relative;
  border: 0;
  display: flex;
  align-items: center;

  padding: 12px 16px;
  width: 328px;
  height: 48px;

  background: ${(props) =>
    props.selected === 'selected' ? '#00d082' : '#9E9E9E'};

  border-radius: 4px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  letter-spacing: 0.25px;

  color: #ffffff;

  cursor: pointer;

  img {
    top: 14px;
    right: 20px;
    position: absolute;
    width: 20px;
    height: 20px;
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

  img {
    width: 20px;
  }
`;

export const TownRegistrationButton = styled(Button)`
  position: absolute;
  left: 16px;
  bottom: 52px;
`;
