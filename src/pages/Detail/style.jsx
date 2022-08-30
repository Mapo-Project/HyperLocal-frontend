import styled from 'styled-components';
import MainContainer from '../../layout/MainContainer';
import Button from '../../components/Button';

export const DetailMainContainer = styled(MainContainer)`
  position: relative;
`;

export const DetailFooter = styled.footer`
  position: absolute;
  bottom: 0;
  height: 108px;
  width: 100%;
  display: flex;
  align-items: center;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
    0px 4px 8px 3px rgba(0, 0, 0, 0.15);

  padding-bottom: 44px;
  padding-top: 16px;

  img {
    margin-left: 34px;
    width: 20px;
    cursor: pointer;
  }
  p {
    margin-left: 6px;
    margin-right: 32px;
    min-width: 9px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;

    color: #212121;
  }
`;
export const DetailButton = styled(Button)`
  width: 243px;
  background: #00d082;
`;
