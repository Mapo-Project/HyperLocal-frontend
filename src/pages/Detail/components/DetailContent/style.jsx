import styled from 'styled-components';

export const DetailContentWrapper = styled.div`
  padding: 16px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  .item_tag_wrapper {
    display: flex;
    gap: 8px;
  }
  .item_tag {
    display: inline-block;
    background: #e0e0e0;
    border-radius: 4px;
    padding: 4px 8px;
  }
  .item_title {
    font-size: 20px;
    line-height: 24px;
  }
  .wrapper {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    font-size: 16px;
    line-height: 24px;

    letter-spacing: 0.1px;

    img {
      box-sizing: content-box;
    }
  }
  .item_text_wrapper {
    margin-bottom: 16px;

    img {
      width: 16px;
      padding: 9px 4px;
    }
  }
  .item_price_wrapper {
    img {
      margin-left: 3px;
      width: 17.5px;
      margin-right: 3.5px;
    }

    align-items: center;
  }
  .item_link_wrapper {
    align-items: center;
    img {
      width: 22px;
      padding: 2px 1px;
    }
  }
  .item_confidence_wrapper {
    align-items: center;
    img {
      width: 22px;
      padding: 2px 1px;
    }
  }
  .item_participant_wrapper {
    align-items: center;
    img {
      width: 16px;
      padding: 4px;
    }
  }
  .item_duedate_wrapper {
    align-items: center;
    img {
      width: 18px;
      padding: 2px 3px;
    }
    margin-bottom: 40px;
  }
  .item_user_wrapper {
    display: flex;
    width: 100%;
    position: relative;
    color: #9e9e9e;
    margin-bottom: 29px;

    .userImg {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid #9e9e9e;
    }
    .user_dummy_img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #d9d9d9;
      border: 1px solid #9e9e9e;
    }
    .user_name_wrapper {
      display: flex;
      flex-direction: column;
      margin-left: 5px;
    }
    .user_create_date {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
`;
