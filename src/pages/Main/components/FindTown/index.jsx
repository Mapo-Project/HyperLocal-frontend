import axios from 'axios';
import React, { useCallback, useState } from 'react';
import useSWR from 'swr';
import fetcherAccessToken from '../../../../utils/fetcherAccessToken';

import {
  FindTownWrapper,
  Label,
  Option,
  SelectOptions,
  SelectWrapper,
} from './style';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function SelectBox({ onSelectAdditionalTown }) {
  const [isShowOptions, setShowOptions] = useState(false);

  const { data: townData, mutate: townMutate } = useSWR(
    `${BACKEND_URL}/user/neighborhood/select`,
    fetcherAccessToken,
  );

  const onSelectTown = useCallback(
    (id) => {
      axios
        .post(`${BACKEND_URL}/user/neighborhood/choice/${id}`, null, {
          headers: { Authorization: `Bearer ${localStorage.accessToken}` },
        })
        .then((res) => {
          console.log(res.data.data);
          townMutate();
        })
        .catch((error) => console.log(error.response.data.message));
    },
    [townMutate],
  );

  return (
    <SelectWrapper onClick={() => setShowOptions((prev) => !prev)}>
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/expand_more_down.png`}
        alt="expand_more"
      />
      <Label>
        {townData?.data?.length
          ? townData?.data.filter((towns) => towns.choiceYN === 'Y')[0]
              ?.neighborhoodName
          : '성산동'}
      </Label>
      <SelectOptions show={isShowOptions}>
        {!townData ? (
          <Option key="성산동" value="성산동">
            성산동
          </Option>
        ) : (
          townData?.data.map((option, idx) => (
            <Option
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                onSelectTown(option.neighborhoodId);
                setShowOptions((prev) => !prev);
              }}
            >
              {option.neighborhoodName}
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

  onSelectAdditionalTown,
}) {
  return (
    <FindTownWrapper>
      <SelectBox onSelectAdditionalTown={onSelectAdditionalTown} />
      <div className="FindTown_search_container">
        <img
          className="FindTown_search"
          src={`${process.env.PUBLIC_URL}/assets/images/search.png`}
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
