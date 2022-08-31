import styled from 'styled-components';
import MainContainer from '../../layout/MainContainer';

export const InterestingMainContainer = styled(MainContainer)`
  position: relative;
  overflow: hidden;
`;

export const InterestingContent = styled.div`
  padding: 20px 16px;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  gap: 14px;
  cursor: pointer;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  color: #212121;
  .interesting_main_img {
    width: 48px;
    height: 48px;

    border-radius: 16px;
  }
  .content_wrapper {
    display: flex;
    flex-direction: column;
  }

  .content_sub_wrapper {
    font-weight: 400;
    display: flex;
    span.interesting--content {
      display: flex;
      gap: 2px;
      align-items: center;
    }
    .interesting--content > span {
      margin-top: 2px;
    }
  }
  .interesting--content_price {
    margin-right: 4px;
  }

  .interesting--content_participant {
    margin-left: 4px;
    margin-right: 24px;
  }

  .interesting--price_img {
    width: 20px;
  }

  .interesting--pariticipant_img {
    width: 20px;
  }
  .interesting--deadline_img {
    width: 20px;
  }
`;

export const InterestingFooter = styled.footer`
  background-color: #ffffff;
  font-family: 'Pretendard';
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  z-index: 1;
  display: flex;
  gap: 8px;

  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.3), 0px 1px 3px rgba(0, 0, 0, 0.1);
  div.menu_container {
    padding-top: 8px;
    padding-left: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }

  .menu_border {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 64px;
    height: 32px;
    border-radius: 16px;

    img {
      width: 24px;
    }
  }
  .menu_text {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
  }
`;
