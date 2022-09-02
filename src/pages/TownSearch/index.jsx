import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Scrollbars from 'react-custom-scrollbars-2';
import useSWR from 'swr';
import useInput from '../../hooks/useInput';
import fetcherAccessToken from '../../utils/fetcherAccessToken';
import {
  Label,
  TownItem,
  TownSearchButton,
  TownSearchContainer,
  TownSearchInput,
  TownSearchWrapper,
} from './style';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const TownList = [
  { townId: 1, townValue: '성산동', townName: '마포구 성산동' },
  { townId: 2, townValue: '성산1동', townName: '마포구 성산1동' },
  { townId: 3, townValue: '성산2동', townName: '마포구 성산2동' },
  { townId: 4, townValue: '망원동', townName: '마포구 망원동' },
  { townId: 5, townValue: '망원1동', townName: '마포구 망원1동' },
  { townId: 6, townValue: '망원2동', townName: '마포구 망원2동' },
  { townId: 7, townValue: '연남동', townName: '마포구 연남동' },
  { townId: 8, townValue: '합정동', townName: '마포구 합정동' },
  { townId: 9, townValue: '서교동', townName: '마포구 서교동' },
  { townId: 10, townValue: '상암동', townName: '마포구 상암동' },
];
function TownSearch({ setNonMemberTown, tempTown, setTempTown }) {
  const { data: userData } = useSWR(
    `${BACKEND_URL}/user/profile/select`,
    fetcherAccessToken,
  );

  const { data: townData, mutate: townMutate } = useSWR(
    `${BACKEND_URL}/user/neighborhood/select`,
    fetcherAccessToken,
  );

  const [isTownSearch, setIsTownSearch] = useState(false);
  const [town, , onChangeTown] = useInput('');

  const onDisplayTownSearch = useCallback(() => {
    setIsTownSearch(true);
  }, []);

  useEffect(() => console.log(townData?.data), [townData]);

  const navigate = useNavigate();

  const onSelectRegistTown = useCallback(
    (value) => {
      console.log({ value });

      // 프론트에서도 중복 동네 처리를 한다.
      if (
        townData?.data[0]?.neighborhoodName === value ||
        townData?.data[1]?.neighborhoodName === value ||
        townData?.data[2]?.neighborhoodName === value
      ) {
        alert('이미 등록되어 있는 동네입니다.');
        return;
      }

      // 2번째 인자로 null 안 넣으면 header에 인증 안됨.
      axios
        .post(`${BACKEND_URL}/user/neighborhood/registration/${value}`, null, {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        })

        .then((res) => {
          console.log(res.data);
          navigate('/town/regist');
          townMutate();
        })
        .catch((error) => {
          console.log(error.response.data.message);
          alert(error.response.data.message);
          return new Error(`요청이 실패했습니다.`);
        });

      // value를 등록 API요청하고 등록페이지로 이동
    },
    [navigate, townData, townMutate],
  );

  // 비회원 동네설정
  const onSelectNonMemberRegistTown = useCallback(
    (curtown) => {
      setNonMemberTown(curtown);
      sessionStorage.setItem('nonMemberTown', curtown);
      navigate('/town/regist');
    },
    [setNonMemberTown, navigate],
  );

  // 동네 3개까지 선택가능 url로 접근하려하면 막는다.
  if (townData?.count === '3') {
    navigate('/town/regist', { replace: true });
  }
  if (townData === undefined) {
    return <div>동네 데이터 받아오는중</div>;
  }

  return (
    <TownSearchContainer>
      <h1>내 동네 찾기</h1>
      <img
        className="town_back_btn"
        role="button"
        onKeyDown={() => {}}
        onClick={() => {
          if (tempTown) {
            onSelectRegistTown(tempTown);
            setTempTown('');
          }
          navigate('/town/regist');
        }}
        tabIndex={0}
        draggable="false"
        alt="town_search"
        src={`${process.env.PUBLIC_URL}/assets/images/arrow_back.png`}
      />
      <TownSearchWrapper>
        <Label>
          <TownSearchInput
            placeholder="동네를 검색하세요."
            onKeyDown={onDisplayTownSearch}
            value={town}
            onChange={onChangeTown}
            autoFocus
          />
          <img
            draggable="false"
            alt="town_search"
            src={`${process.env.PUBLIC_URL}/assets/images/search.png`}
          />
        </Label>
        <TownSearchButton>
          <img
            draggable="false"
            alt="town_my_location"
            src={`${process.env.PUBLIC_URL}/assets/images/town/town_my_location.png`}
          />
          내 위치로 찾기
        </TownSearchButton>
      </TownSearchWrapper>

      {isTownSearch && (
        <>
          <p>내 동네는...</p>
          <Scrollbars autoHide style={{ height: '500px' }}>
            {TownList.filter((townValue) => {
              // 공백제거 후 search 메소드로 -1(없는 경우)를 제외
              const searchTown = town
                .replace(/\s/g, '')
                .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '');

              if (searchTown && townValue.townName.search(searchTown) !== -1) {
                return true;
              }
              return false;
            }).map((townVal) => (
              <TownItem
                onClick={() => {
                  userData
                    ? onSelectRegistTown(townVal.townValue)
                    : onSelectNonMemberRegistTown(townVal.townValue);
                }}
                key={townVal.townId}
              >
                {townVal.townName}
              </TownItem>
            ))}
          </Scrollbars>
        </>
      )}
    </TownSearchContainer>
  );
}

export default TownSearch;
