import styled from 'styled-components';
import MainContainer from '../../layout/MainContainer';
import Button from '../../components/Button';

export const DetailMainContainer = styled(MainContainer)`
  position: relative;
`;
export const DetailHeader = styled.header`
  position: relative;

  width: 100%;
  height: 160px;
  background: #f5f5f5;
  overflow: hidden;

  .detail_main_no_img {
    display: block;
    margin: auto;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    border-radius: 2px;
  }
  .detail_main_img {
    display: block;
    margin: auto;
    /* width: 100%; */
    height: 100%;
    opacity: 0.7;
    border-radius: 2px;
  }
  .back_btn {
    position: absolute;

    padding: 4px;

    width: 16px;
    top: 16px;
    left: 16px;

    box-sizing: content-box;
    cursor: pointer;
  }
  .share_btn {
    position: absolute;
    width: 18px;

    top: 16px;
    right: 64px;

    padding: 2px 3px;
    box-sizing: content-box;
    cursor: pointer;
  }
  .more_info_btn {
    padding: 4px 10px;
    position: absolute;
    width: 4px;
    top: 16px;
    right: 16px;
    box-sizing: content-box;
    cursor: pointer;
  }
  span {
    padding: 0px 4px;
    position: absolute;
    border-radius: 4px;
    bottom: 16px;
    right: 16px;

    background: #000000;
    mix-blend-mode: multiply;
    opacity: 0.4;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;

    text-align: right;

    color: #ffffff;
  }
  .circle_border {
    position: absolute;
    bottom: -4px;
    gap: 8px;
    display: flex;
    margin-left: 8px;
    justify-content: center;
    z-index: -2;
  }
  div {
    width: 8px;
    height: 8px;
    background: #f5f5f5;
    border-radius: 50%;
  }
`;

export const DetailContent = styled.div`
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
