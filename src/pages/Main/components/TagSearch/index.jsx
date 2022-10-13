import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

import { category } from '../../../../utils/dummyData/createPageData';
import { CategorySearchMainContainer, SearchInput, SearchLabel } from './style';
import useInput from '../../../../hooks/useInput';

function debounce(callback, delay) {
  let timer;
  return (...args) => {
    // 마지막 전에 들어온 이벤트들은 모두 무시
    clearTimeout(timer);
    // 마지막 이벤트는 setTimeout함수를 이용해 일정 delay 이후 callback함수 실행
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export default function CategorySearch({ setCurrentSearchValue }) {
  const [, setPickedCategory] = useState('');
  const [searchValue, , changeSearchValue] = useInput('');

  const navigate = useNavigate();

  const onClickToMainPage = useCallback(() => {
    navigate('/');
  }, [navigate]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const alertValue = useCallback(
    debounce((value) => console.log(value), 500),
    [],
  );

  const enterkey = useCallback(() => {
    if (window.event.keyCode === 13) {
      setCurrentSearchValue(searchValue);
      onClickToMainPage();
    }
  }, [setCurrentSearchValue, searchValue, onClickToMainPage]);

  return (
    <CategorySearchMainContainer>
      <img
        className="back_btn"
        role="button"
        onKeyDown={() => {}}
        tabIndex={0}
        alt="back_btn"
        src={`${process.env.PUBLIC_URL}/assets/images/arrow_back.png`}
        onClick={onClickToMainPage}
      />
      <div className="search_wrapper">
        <SearchLabel htmlFor="category_search">
          <SearchInput
            type="text"
            id="category_search"
            name="search"
            placeholder="키워드를 입력해주세요"
            onChange={(e) => {
              changeSearchValue(e);
              alertValue(e.target.value);
            }}
            value={searchValue}
            onKeyUp={enterkey}
          />
          <img
            className="search_img"
            alt="search_img"
            src={`${process.env.PUBLIC_URL}/assets/images/search.png`}
          />
        </SearchLabel>
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
    </CategorySearchMainContainer>
  );
}
