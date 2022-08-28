import styled from 'styled-components';

export const MainItemsContainer = styled.div`
  font-family: 'Pretendard';
  background-color: #ffffff;
  padding: 16px 0;
  margin-bottom: 8px;

  height: 213px;
  position: relative;
  .items_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
  }
  .items_header .items_tag_wrapper {
    border-radius: 4px;
    display: flex;
    align-items: center;
    overflow-x: scroll;
    gap: 8px;
    width: 310px;

    /* Hide scrollbar for IE and Edge */
    & {
      -ms-overflow-style: none;
    }
    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .items_header .items_tag_wrapper .items_tag {
    display: flex;
    justify-content: center;
    align-items: center;

    flex: none;

    padding: 4px 8px;

    background: #e0e0e0;
    border-radius: 4px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;

    text-align: center;

    color: #616161;
  }

  .items_detail {
    position: absolute;

    top: 16px;
    right: 8px;
    height: 20px;
    width: 20px;
    /* padding: 4px 8.5px;
  box-sizing: content-box; */
    cursor: pointer;
  }

  .items_content_wrapper {
    display: flex;
    gap: 16px;
    margin-top: 16px;
    cursor: pointer;
    padding-bottom: 16px;
  }
  .items_img_wrapper {
    margin-right: 16px;
  }
  .items_img_wrapper img {
    width: 84px;
    height: 84px;
    border-radius: 4px;
  }
  .items_img_wrapper div {
    width: 84px;
    height: 84px;
    border-radius: 4px;
    background: #e0e0e0;
  }
  .items_content_wrapper .items_text_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    color: #212121;
  }
  .items_text_wrapper h1 {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    margin-left: 16px;
  }
  .items_text_wrapper .items_main {
    display: flex;
    align-items: center;

    margin-top: 16px;
    margin-left: 16px;
  }
  .items_price {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
  .items_participants {
    margin-left: 7px;
    margin-right: 29px;
    display: flex;
    gap: 7px;
    align-items: center;
  }
  .items_participants img {
    width: 13.46px;
  }
  .items_participants span {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
  .items_deadline {
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    gap: 7px;
    img {
      width: 14px;
    }
  }

  .items_footer {
    padding: 0 16px;
    border-top: 1px solid #f5f5f5;
    padding-top: 14px;
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    position: relative;

    .items_chat {
      margin-right: 5px;
      width: 20px;
    }
    .items_heart {
      width: 20px;
      margin-left: 18px;
      margin-right: 6px;
      cursor: pointer;
    }

    span {
      position: absolute;
      top: 16px;
      right: 16px;
      color: #9e9e9e;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }
  }
`;
