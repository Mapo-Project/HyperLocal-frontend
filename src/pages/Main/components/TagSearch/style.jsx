import styled from 'styled-components';
import MainContainer from '../../../../layout/MainContainer';
import { Input, Label } from '../../../SignUp/style';

export const CategorySearchMainContainer = styled(MainContainer)`
  padding: 16px;
  position: relative;

  .back_btn {
    position: absolute;
    top: 16px;
    left: 16px;
    cursor: pointer;
    width: 24px;
    height: 24px;
  }

  .search_category_wrapper {
    display: flex;
    gap: 40px;
    flex-wrap: wrap;
    justify-content: center;

    margin-bottom: 100px;
  }
  .category_item_wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 56px;
    margin-bottom: -16px;
    cursor: pointer;
  }
  .category_item_wrapper div {
    height: 56px;
    width: 56px;
    border: 1px solid #eeeeee;
    border-radius: 20px;
  }
  .category_item_wrapper p {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: #000000;
  }
  h1 {
    text-align: center;
    padding: 20px;
  }
`;

export const SearchLabel = styled(Label)`
  position: relative;
  .search_img {
    position: absolute;
    width: 24px;
    height: 24px;
    left: 16px;
    top: -2px;
  }
`;

export const SearchInput = styled(Input)`
  margin-top: 40px;
  margin-bottom: 40px;
  padding-left: 56px;
  padding-right: 16px;
`;
