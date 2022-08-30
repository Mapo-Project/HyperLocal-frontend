import styled from 'styled-components';

export const DetailHeaderWrapper = styled.header`
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
