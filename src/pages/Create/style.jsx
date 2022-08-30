import styled from 'styled-components';
import Button from '../../components/Button';
import MainContainer from '../../layout/MainContainer';

export const CreatePageMainContainer = styled(MainContainer)`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;

  letter-spacing: 0.15px;

  color: #212121;
`;

export const CreateButton = styled(Button)`
  background: #00d082;
  margin-bottom: 135px;
  margin-left: 16px;
  margin-top: 16px;
`;
export const CreateButtonDisable = styled.div`
  background-color: gray;
  margin-bottom: 135px;
  margin-left: 16px;
  margin-top: 16px;

  font-family: 'Pretendard';
  color: #ffffff;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.25px;

  width: 328px;
  height: 48px;

  padding: 14px 16px;

  border-radius: 4px;
  border: 0;

  cursor: pointer;
`;
