import styled from 'styled-components';
import MainContainer from '../../layout/MainContainer';

export const InterestingMainContainer = styled(MainContainer)`
  position: relative;
  overflow: hidden;

  .interesting_title {
    margin-top: 16px;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;

    text-align: center;

    color: #212121;
  }
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
