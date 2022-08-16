import Scrollbars from 'react-custom-scrollbars-2';
import styled from 'styled-components';
import MainContainer from '../../layout/MainContainer';

export const FindTown = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 54px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;

  letter-spacing: 0.15px;

  color: #212121;

  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);

  .FindTown_search_container {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-right: 18px;
  }
  .FindTown_search {
    width: 18px;
    cursor: pointer;
  }
  .FindTown_login {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;

    color: #212121;
    cursor: pointer;
  }
  .main_profile {
    width: 24px;
    border-radius: 50%;
    cursor: pointer;
  }
`;
export const SelectWrapper = styled.div`
  position: relative;
  width: 112px;
  cursor: pointer;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;

  letter-spacing: 0.15px;
  border: 0;
  color: #212121;

  img {
    position: absolute;
    left: 18px;
    top: 8px;
    width: 12px;
    height: 7.4px;
  }
`;

export const SelectOptions = styled.div`
  z-index: 10;

  position: absolute;
  top: 40px;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
    0px 2px 6px 2px rgba(0, 0, 0, 0.15);
  border-radius: 4px;

  overflow: hidden;
  display: ${(props) => (props.show ? 'block' : 'none')};
  padding: 0;
`;

export const Option = styled.div`
  width: 112px;
  padding: 12px 16px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  color: #000000;
  &:hover {
    background-color: #00d082;
  }
  color: ${(props) => (props.type === 'changeTown' ? '#9E9E9E' : '#000')};
`;

export const Label = styled.div`
  text-align: end;
  padding-right: 6px;
`;

export const Footer = styled.div`
  font-family: 'Pretendard';
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  z-index: 1;
  display: flex;
  gap: 8px;

  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  div.menu_container {
    margin-top: 8px;
    margin-left: 14px;
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
  }
  .menu_text {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
  }
`;

export const MainItemsContainer = styled.div`
  font-family: 'Pretendard';
  padding: 16px;
  border-bottom: 4px solid #eeeeee;
  padding-bottom: 5px;
  height: 213px;

  .items_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    div:hover {
      background-color: rgba(0, 0, 0, 0.4);
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
  .items_header .items_detail {
    height: 12px;
    width: 3px;
    cursor: pointer;
  }

  .items_content_wrapper {
    display: flex;
    gap: 16px;
    margin-top: 16px;
  }
  .items_img_wrapper img {
    width: 84px;
  }
  .items_img_wrapper div {
    position: relative;
    width: 84px;
    height: 84px;
    background: #e0e0e0;
    border-radius: 4px;
  }
  .items_img_wrapper div img {
    width: 13.33px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
  }
  .items_text_wrapper .items_main {
    display: flex;
    align-items: center;
    padding-bottom: 16px;
    margin-top: 16px;
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
    border-top: 1px solid #f5f5f5;
    padding-top: 14px;
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;

    .items_chat {
      margin-right: 5px;
      width: 20px;
    }
    .items_heart {
      width: 16px;
      margin-left: 18px;
      margin-right: 6px;
    }
    span {
      margin-left: 105px;
      color: #9e9e9e;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }
  }
`;

export const MainButton = styled.button`
  position: absolute;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #00d082;
  bottom: 100px;
  right: 17px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: none;

  img {
    width: 18px;
    height: 18px;
  }
`;

export const MainPageContainer = styled(MainContainer)`
  background: #ffffff;
  position: relative;

  .main_banner {
    position: absolute;
    top: 56px;
    width: 100%;
    height: 136px;
    background-color: #ececec;
  }
`;

export const MainScrollbars = styled(Scrollbars)`
  margin-top: 144px;
`;
