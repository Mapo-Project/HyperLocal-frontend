import React from 'react';
import { category as categoies } from '../../../../utils/dummyData/createPageData';
import {
  CategoryLabel,
  CategoryModalCover,
  CategoryOption,
  CategorySelectOptions,
  SelectCategoryWrapper,
} from './style';

const SelectCategory = React.memo(function SelectCategory({
  setShowCategory,
  setIsHomemade,
  isShowCategory,
  category,
  setCategory,
}) {
  return (
    <SelectCategoryWrapper
      onClick={() => {
        setShowCategory((prev) => !prev);
        setIsHomemade(false);
      }}
    >
      {!isShowCategory ? (
        <img
          draggable="false"
          src={`${process.env.PUBLIC_URL}/assets/images/expand_more_down.png`}
          alt="expand_more"
        />
      ) : (
        <img
          draggable="false"
          src={`${process.env.PUBLIC_URL}/assets/images/expand_more_up.png`}
          alt="expand_more"
        />
      )}

      <CategoryLabel>{category}</CategoryLabel>
      <CategoryModalCover show={isShowCategory} category={category} />
      <CategorySelectOptions show={isShowCategory}>
        {categoies?.map((option, idx) => (
          <CategoryOption
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setCategory(e.target.textContent);
              setShowCategory((prev) => !prev);
            }}
          >
            {option.label}
          </CategoryOption>
        ))}
      </CategorySelectOptions>
    </SelectCategoryWrapper>
  );
});

export default SelectCategory;
