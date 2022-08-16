import React, { useCallback, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import useInput from '../../hooks/useInput';
import Footer from '../../layout/Footer';
import {
  Label,
  TownItem,
  TownSearchButton,
  TownSearchContainer,
  TownSearchInput,
  TownSearchWrapper,
} from './style';

const TownList = [
  { townId: 1, townName: '마포구 성산동' },
  { townId: 2, townName: '마포구 성산1동' },
  { townId: 3, townName: '마포구 성산2동' },
  { townId: 4, townName: '마포구 망원1동' },
  { townId: 5, townName: '마포구 망원2동' },
  { townId: 6, townName: '마포구 연남동' },
  { townId: 7, townName: '마포구 합정동' },
  { townId: 8, townName: '마포구 서교동' },
  { townId: 9, townName: '마포구 상암동' },
];
function TownSearch({ onSelectTown, onSelectCurrentTown, currentTown }) {
  const navigate = useNavigate();

  const [isTownSearch, setIsTownSearch] = useState(false);
  const [town, , onChangeTown] = useInput('');

  const onDisplyTownSearch = useCallback(() => {
    setIsTownSearch(true);
  }, []);

  const onSelectRegistTown = (value) => {
    console.log({ value, currentTown });

    if (
      currentTown[0]?.town === value ||
      currentTown[1]?.town === value ||
      currentTown[2]?.town === value
    ) {
      alert('이미 등록되어 있는 동네입니다.');
      return;
    }

    onSelectTown(value);
    // value를 전역 상태 관리에 저장하고 등록페이지로 이동
    onSelectCurrentTown(value);
    navigate('/town/regist');
  };

  // 소셜로그인 안하면 url로 접근 시 리다이렉트
  if (!localStorage?.verify) {
    return <Navigate to="/" replace />;
  }

  return (
    <TownSearchContainer>
      <h1>동네 찾기</h1>
      <TownSearchWrapper>
        <Label>
          <TownSearchInput
            placeholder="동네 찾기"
            onKeyDown={onDisplyTownSearch}
            value={town}
            onChange={onChangeTown}
            autoFocus
          />
          <img
            alt="town_search"
            src={`${process.env.PUBLIC_URL}/assets/images/town_search.png`}
          />
        </Label>
        <TownSearchButton>
          <img
            alt="town_my_location"
            src={`${process.env.PUBLIC_URL}/assets/images/town_my_location.png`}
          />
          내 위치로 찾기
        </TownSearchButton>
      </TownSearchWrapper>
      {isTownSearch &&
        TownList.filter((townValue) => {
          // 공백제거 후 search 메소드로 -1(없는 경우)를 제외
          const searchTown = town.replace(/\s/g, '');
          if (searchTown && townValue.townName.search(searchTown) !== -1) {
            return true;
          }
          return false;
        }).map((townVal) => (
          <TownItem
            onClick={() => {
              onSelectRegistTown(townVal.townName);
            }}
            key={townVal.townId}
          >
            {townVal.townName}
          </TownItem>
        ))}

      <Footer />
    </TownSearchContainer>
  );
}

export default TownSearch;
