import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { category } from '../../../../utils/dummyData/createPageData';
import { CategorySearchMainContainer } from './style';

export default function CategorySearch() {
  const [pickedCategory, setPickedCategory] = useState('');

  const navigate = useNavigate();

  const onClickToMainPage = () => {
    navigate('/');
  };

  return (
    <CategorySearchMainContainer>
      <img
        className="back_btn"
        role="button"
        onKeyDown={() => {}}
        tabIndex={0}
        alt="back_btn"
        src={`${process.env.PUBLIC_URL}/assets/images/detail_arrow_back.png`}
        onClick={onClickToMainPage}
      />
      <div className="search_wrapper">
        <label htmlFor="category_search">
          <input type="text" id="category_search" />
        </label>
        <img
          alt="search_img"
          src={`${process.env.PUBLIC_URL}/assets/images/main_search.png`}
        />
      </div>

      <div className="search_category_wrapper">
        {category.map((data, idx) => (
          <div
            role="button"
            onKeyDown={() => {}}
            tabIndex={0}
            className="category_item_wrapper"
            key={idx}
            onClick={() => {
              setPickedCategory(data.label);
            }}
          >
            <div />
            <p>{data.label}</p>
          </div>
        ))}
      </div>
      <h1>현재 선택된 카테고리 : {pickedCategory}</h1>
    </CategorySearchMainContainer>
  );
}
