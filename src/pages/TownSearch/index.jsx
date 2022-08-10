import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import Footer from '../../layout/Footer';
import {
  Label,
  TownItem,
  TownSearchButton,
  TownSearchContainer,
  TownSearchForm,
  TownSearchInput,
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
function TownSearch() {
  const navigate = useNavigate();
  const onClickToTownRegistration = useCallback(() => {
    navigate('/town/registration');
  }, [navigate]);
  return (
    <TownSearchContainer>
      <h1>동네 찾기</h1>
      <TownSearchForm>
        <Label>
          <TownSearchInput placeholder="동네 찾기" />
          <div />
        </Label>
        <TownSearchButton onClick={onClickToTownRegistration}>
          <div />내 위치로 찾기
        </TownSearchButton>
      </TownSearchForm>
      {TownList.map((town) => (
        <TownItem key={town.townId}>{town.townName}</TownItem>
      ))}
      <Footer />
    </TownSearchContainer>
  );
}

export default TownSearch;
