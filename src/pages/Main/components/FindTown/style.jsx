import styled from 'styled-components';

export const FindTownWrapper = styled.div`
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
    gap: 24px;
    margin-right: 18px;
  }
  .FindTown_search {
    width: 24px;
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

    border: 1px solid #212121;
    border-radius: 12px;

    padding: 4px 8px;
  }
  .main_profile {
    width: 24px;
    border: 2px solid #212121;
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
    left: 16px;
    top: 16px;
    width: 24px;
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

  color: #212121;
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
