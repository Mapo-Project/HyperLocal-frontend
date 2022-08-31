import styled from 'styled-components';
import Button from '../../components/Button';
import MainContainer from '../../layout/MainContainer';

export const TownSearchContainer = styled(MainContainer)`
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
  .town_back_btn {
    cursor: pointer;
    width: 24px;
    position: absolute;
    top: 16px;
    left: 16px;
  }
  p {
    text-align: start;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    margin-top: 24px;
    margin-bottom: 2px;
    margin-left: 16px;
  }
`;
export const TownSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  margin-bottom: 14px;
`;

export const Label = styled.label`
  position: relative;
  height: 48px;
  width: 328px;
  img {
    position: absolute;
    top: 12px;
    left: 16px;
    width: 24px;
  }
`;

export const TownSearchInput = styled.input`
  width: 100%;
  height: 48px;
  padding-left: 44px;

  background: #f5f5f5;
  border-radius: 4px 4px 0px 0px;

  border: 0;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #9e9e9e;
  }
`;
export const TownSearchButton = styled(Button)`
  font-family: 'Pretendard';
  font-weight: 400;

  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9px;

  img {
    width: 20px;
  }
`;

export const TownItem = styled.div`
  margin: auto;
  width: 328px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #212121;

  height: 56px;
  border-bottom: 1px solid #f5f5f5;

  display: flex;
  align-items: center;
  cursor: pointer;
`;
