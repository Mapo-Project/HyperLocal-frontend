import styled from 'styled-components';
import MainContainer from '../../layout/MainContainer';

const HomeContainer = styled(MainContainer)`
  text-align: center;
  font-family: 'Pretendard';

  h1 {
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 150%;

    margin-top: 193px;
  }

  img {
    width: 207px;
    margin-top: 56px;
    margin-bottom: 73px;
  }

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    color: #212121;

    margin-bottom: 110px;
  }
`;

export default HomeContainer;
