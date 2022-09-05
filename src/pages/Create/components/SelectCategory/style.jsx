import styled from 'styled-components';

export const SelectCategoryWrapper = styled.div`
  margin-top: 15px;
  margin-left: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  gap: 14px;
  position: relative;

  width: 328px;
  height: 48px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;

  color: #212121;
  border: 1px solid #9e9e9e;
  border-radius: 4px;

  cursor: pointer;
  img {
    position: absolute;
    width: 24px;
    top: 12px;
    right: 16px;
  }
`;

export const CategoryModalCover = styled.div`
  position: absolute;
  top: -300px;
  left: -17px;
  width: 360px;
  height: ${(props) => (props.category === '식품' ? '1550px' : '1460px')};
  background-color: ${(props) => (props.show ? 'rgba(0, 0, 0, 0.3)' : '')};
  display: ${(props) => (props.show ? 'block' : 'none')};
  z-index: 2;
`;

export const CategoryLabel = styled.div`
  text-align: start;
`;
export const CategorySelectOptions = styled.div`
  z-index: 2;

  width: 326px;
  position: absolute;
  top: 48px;
  left: 0;
  background: #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3),
    0px 4px 8px 3px rgba(0, 0, 0, 0.15);
  border-radius: 4px;

  overflow: hidden;
  display: ${(props) => (props.show ? 'block' : 'none')};
  padding: 8px 0;
`;
export const CategoryOption = styled.div`
  padding: 14px 16px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  color: #212121;
  &:hover {
    background-color: #f5f5f5;
  }
`;
