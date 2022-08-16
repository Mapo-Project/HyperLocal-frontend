import styled from 'styled-components';
import MainContainer from '../../layout/MainContainer';

export const MyPageMainContainer = styled(MainContainer)`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;

  letter-spacing: 0.15px;

  color: #000000;

  h2 {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    /* identical to box height, or 24px */

    letter-spacing: -0.25px;

    color: #000000;
    margin-left: 28px;
    margin-top: 20px;
  }
`;

export const MyPageProfileBox = styled.div`
  border: 1px solid #000000;
  border-radius: 0px 0px 20px 20px;
  width: 100%;
`;
export const ProfileHeader = styled.div`
  padding-top: 40px;
  position: relative;
  h1 {
    text-align: center;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;

    letter-spacing: 0.15px;

    color: #000000;
  }
  img {
    position: absolute;
    width: 20px;
    top: 42px;
    right: 18px;
    cursor: pointer;
  }
`;
export const ProfileWrapper = styled.div`
  padding-top: 21px;
  display: flex;
  gap: 25px;
  margin-left: 24px;

  div {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;

    letter-spacing: -0.25px;

    color: #000000;
    h1 {
      margin-bottom: 14px;
    }
    b {
      font-weight: 600;
      margin-right: 20px;
    }
  }
  img {
    border: 4px solid #000000;
    border-radius: 29px;
    width: 96px;
  }
`;

export const ProfileFooter = styled.div`
  margin-left: 24px;
  margin-top: 15px;
  margin-bottom: 18px;
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
`;
