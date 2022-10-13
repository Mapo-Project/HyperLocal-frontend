import React, { useCallback, useState } from 'react';
import useSWR from 'swr';
import axiosInstance from '../../../../utils/axiosConfig';
import fetcherAccessToken from '../../../../utils/fetcherAccessToken';

import {
  FindTownWrapper,
  Label,
  ModalCover,
  Option,
  SelectOptions,
  SelectWrapper,
} from './style';

function SelectBox({ onSelectAdditionalTown, nonMemberTown }) {
  const [isShowOptions, setShowOptions] = useState(false);

  const { data: townData, mutate: townMutate } = useSWR(
    `/user/neighborhood/select`,
    fetcherAccessToken,
    { dedupingInterval: 500 },
  );

  const onSelectTown = useCallback(
    (id) => {
      axiosInstance
        .post(`/user/neighborhood/choice/${id}`, null)
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
          : nonMemberTown}
      </Label>
      <ModalCover show={isShowOptions} />
      <SelectOptions show={isShowOptions}>
        {!townData ? (
          <Option key={nonMemberTown} value={nonMemberTown}>
            {nonMemberTown}
          </Option>
        ) : (
          townData?.data.map((option, idx) => (
            <Option
              key={idx}
              onClick={(e) => {
                onSelectTown(option.neighborhoodId);
                setShowOptions((prev) => !prev);
                e.stopPropagation();
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
  onClickToCategorySearchPage,
  nonMemberTown,
}) {
  return (
    <FindTownWrapper>
      <SelectBox
        onSelectAdditionalTown={onSelectAdditionalTown}
        nonMemberTown={nonMemberTown}
      />
      <div className="FindTown_search_container">
        <img
          className="FindTown_search"
          src={`${process.env.PUBLIC_URL}/assets/images/search.png`}
          alt="search"
          role="button"
          onKeyDown={() => {}}
          tabIndex={0}
          onClick={onClickToCategorySearchPage}
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
