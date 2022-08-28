import styled from 'styled-components';
import MainContainer from '../../../../layout/MainContainer';

export const CategorySearchMainContainer = styled(MainContainer)`
  padding: 16px;

  .back_btn {
    width: 24px;
  }
  .search_wrapper {
    margin-top: 20px;
    margin-bottom: 40px;
  }
  .search_category_wrapper {
    display: flex;
    gap: 40px;
    flex-wrap: wrap;
  }
  .category_item_wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
    align-items: center;
  }
  .category_item_wrapper div {
    width: 56px;
    height: 56px;

    border: 1px solid #eeeeee;
    border-radius: 20px;
  }
  .category_item_wrapper p {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;

    color: #000000;
  }
`;
