import Scrollbars from 'react-custom-scrollbars-2';
import styled from 'styled-components';
import MainContainer from '../../layout/MainContainer';

export const FindTown = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 100;

  background-color: #ffffff;
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

  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.15);

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
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;

    color: #212121;
    cursor: pointer;

    border: 1px solid #000000;
    border-radius: 12px;

    padding: 4px 8px;
  }
  .main_profile {
    width: 24px;
    border: 2px solid #000000;
    border-radius: 50%;
    cursor: pointer;
  }
`;
export const SelectWrapper = styled.div`
  position: relative;
  width: 145px;
  cursor: pointer;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;

  letter-spacing: 0.15px;
  border: 0;
  color: #212121;
  padding: 16px 0;
  padding-right: 16px;

  img {
    position: absolute;
    left: 18px;
    top: 24px;
    width: 12px;
    height: 7.4px;
  }
`;

export const SelectOptions = styled.div`
  z-index: 10;

  width: 112px;
  position: absolute;
  top: 56px;
  left: 40px;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
    0px 2px 6px 2px rgba(0, 0, 0, 0.15);
  border-radius: 4px;

  overflow: hidden;
  display: ${(props) => (props.show ? 'block' : 'none')};
  padding: 0;
`;

export const Option = styled.div`
  padding: 12px 16px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  color: #000000;
  &:hover {
    background-color: #f5f5f5;
  }
  color: ${(props) => (props.type === 'changeTown' ? '#9E9E9E' : '#000')};
`;

export const Label = styled.div`
  text-align: start;
  padding-left: 55px;
  padding-right: 6px;
`;

export const Footer = styled.div`
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

    color: #000000;

    margin-bottom: 30px;
  }
  img {
    width: 328px;
    height: 323.36px;
  }
`;
