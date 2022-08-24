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
  height: 56px;
  width: 328px;
  img {
    position: absolute;
    top: 21px;
    left: 19px;
    width: 14px;
  }
`;

export const TownSearchInput = styled.input`
  width: 100%;
  height: 56px;
  padding-left: 44px;

  background: #f5f5f5;
  border-radius: 4px 4px 0px 0px;

  border: 0;
  border-bottom: 1px solid black;

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
    width: 18px;
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
