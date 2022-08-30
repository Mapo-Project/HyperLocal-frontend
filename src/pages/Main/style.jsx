import styled from 'styled-components';
import Scrollbars from 'react-custom-scrollbars-2';
import MainContainer from '../../layout/MainContainer';

export const MainPageContainer = styled(MainContainer)`
  position: relative;
  overflow: hidden;

  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

export const MainScrollbars = styled(Scrollbars)`
  .main_banner {
    display: block;
    width: 100%;
    height: 144px;
    background-color: #ececec;
    margin-bottom: 8px;
  }
`;

export const MainShowNoData = styled.div`
  padding: 45px 16px 0 16px;
  background-color: #ffffff;
  height: 100%;
  h1 {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 150%;

    display: flex;
    align-items: center;

    color: #212121;

    margin-bottom: 30px;
  }
  img {
    width: 328px;
    height: 323.36px;
  }
`;
