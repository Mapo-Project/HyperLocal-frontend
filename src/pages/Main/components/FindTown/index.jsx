import React, { useState } from 'react';
import {
  FindTownWrapper,
  Label,
  Option,
  SelectOptions,
  SelectWrapper,
} from './style';

function SelectBox({
  options,
  defaultValue,
  onSelectAdditionalTown,
  onSelectCurrentTown,
}) {
  const [isShowOptions, setShowOptions] = useState(false);

  return (
    <SelectWrapper onClick={() => setShowOptions((prev) => !prev)}>
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/main_expand_more.png`}
        alt="expand_more"
      />
      <Label>{defaultValue}</Label>
      <SelectOptions show={isShowOptions}>
        {!options.length ? (
          <Option key="성산동" value="성산동">
            성산동
          </Option>
        ) : (
          options?.map((option, idx) => (
            <Option
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                onSelectCurrentTown(e.target.textContent);
                setShowOptions((prev) => !prev);
              }}
            >
              {option.town}
            </Option>
          ))
        )}

        <Option
          onClick={(e) => {
            e.stopPropagation();
            onSelectAdditionalTown();
          }}
          type="changeTown"
        >
          동네설정
        </Option>
      </SelectOptions>
    </SelectWrapper>
  );
}

const FindTown = React.memo(function FindTown({
  onClickToLoginPage,
  userData,
  onClickToMyPage,
  currentTown,
  currentSelectedTown,
  onSelectAdditionalTown,
  onSelectCurrentTown,
}) {
  return (
    <FindTownWrapper>
      <SelectBox
        options={currentTown}
        defaultValue={currentSelectedTown}
        onSelectAdditionalTown={onSelectAdditionalTown}
        onSelectCurrentTown={onSelectCurrentTown}
      />
      <div className="FindTown_search_container">
        <img
          className="FindTown_search"
          src={`${process.env.PUBLIC_URL}/assets/images/main_search.png`}
          alt="search"
          role="button"
          onKeyDown={() => {}}
          tabIndex={0}
          // onClick={onClickToCategorySearchPage}
        />
        {!userData ? (
          <span
            role="button"
            onKeyDown={() => {}}
            tabIndex={0}
            className="FindTown_login"
            onClick={onClickToLoginPage}
          >
            Sign-In
          </span>
        ) : (
          <img
            className="main_profile"
            role="button"
            onKeyDown={() => {}}
            tabIndex={0}
            alt="profile_img"
            src={userData.data.profileImg}
            onClick={onClickToMyPage}
          />
        )}
      </div>
    </FindTownWrapper>
  );
});

export default FindTown;
