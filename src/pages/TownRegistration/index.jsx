import React, { useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router';
import Footer from '../../layout/Footer';
import {
  RegisteredTown,
  TownRegistrationButton,
  TownRegistrationContainer,
  TownRegistrationList,
  UnRegisteredTown,
} from './style';

function TownRegistration({
  currentTown,
  onDeleteTown,
  currentSelectedTown,
  onSelectCurrentTown,
}) {
  console.log({ currentTown, currentSelectedTown });

  const navigate = useNavigate();
  const onClickToMain = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const onClickToAddTown = useCallback(() => {
    navigate('/town');
  }, [navigate]);

  // 소셜로그인 안하면 url로 접근 시 리다이렉트
  if (!localStorage?.verify) {
    return <Navigate to="/login" replace />;
  }

  return (
    <TownRegistrationContainer>
      <h1>동네 등록</h1>

      <TownRegistrationList>
        {currentTown[0]?.town ? (
          <RegisteredTown
            selected={
              currentTown[0].town === currentSelectedTown
                ? 'selected'
                : 'unSelected'
            }
            onClick={() => {
              onSelectCurrentTown(currentTown[0].town);
            }}
          >
            {currentTown[0].town}
            <img
              role="button"
              onKeyDown={() => {}}
              onClick={(e) => {
                onDeleteTown(currentTown[0].townId);
                e.stopPropagation();
                if (currentTown[0].town !== currentSelectedTown) {
                  return;
                }
                onSelectCurrentTown('');
                onClickToAddTown();
              }}
              tabIndex={0}
              alt="search_cancel"
              src={`${process.env.PUBLIC_URL}/assets/images/search_cancel.png`}
            />
          </RegisteredTown>
        ) : (
          <UnRegisteredTown onClick={onClickToAddTown}>
            <img
              alt="search_cancel"
              src={`${process.env.PUBLIC_URL}/assets/images/search_add.png`}
            />
          </UnRegisteredTown>
        )}
        {currentTown[1]?.town ? (
          <RegisteredTown
            selected={
              currentTown[1].town === currentSelectedTown
                ? 'selected'
                : 'unSelected'
            }
            onClick={() => {
              onSelectCurrentTown(currentTown[1].town);
            }}
          >
            {currentTown[1].town}
            <img
              role="button"
              onKeyDown={() => {}}
              tabIndex={0}
              onClick={(e) => {
                onDeleteTown(currentTown[1].townId);
                e.stopPropagation();
                if (currentTown[1].town !== currentSelectedTown) {
                  return;
                }
                onSelectCurrentTown(currentTown[0].town);
              }}
              alt="search_cancel"
              src={`${process.env.PUBLIC_URL}/assets/images/search_cancel.png`}
            />
          </RegisteredTown>
        ) : (
          <UnRegisteredTown onClick={onClickToAddTown}>
            <img
              alt="search_cancel"
              src={`${process.env.PUBLIC_URL}/assets/images/search_add.png`}
            />
          </UnRegisteredTown>
        )}
        {currentTown[2]?.town ? (
          <RegisteredTown
            selected={
              currentTown[2].town === currentSelectedTown
                ? 'selected'
                : 'unSelected'
            }
            onClick={() => {
              onSelectCurrentTown(currentTown[2].town);
            }}
          >
            {currentTown[2].town}
            <img
              role="button"
              onKeyDown={() => {}}
              tabIndex={0}
              onClick={(e) => {
                onDeleteTown(currentTown[2].townId);
                e.stopPropagation();
                if (currentTown[2].town !== currentSelectedTown) {
                  return;
                }
                onSelectCurrentTown(currentTown[1].town);
              }}
              alt="search_cancel"
              src={`${process.env.PUBLIC_URL}/assets/images/search_cancel.png`}
            />
          </RegisteredTown>
        ) : (
          <UnRegisteredTown onClick={onClickToAddTown}>
            <img
              alt="search_cancel"
              src={`${process.env.PUBLIC_URL}/assets/images/search_add.png`}
            />
          </UnRegisteredTown>
        )}
      </TownRegistrationList>
      <TownRegistrationButton onClick={onClickToMain}>
        이웃의 마켓 구경하기
      </TownRegistrationButton>
      <Footer />
    </TownRegistrationContainer>
  );
}

export default TownRegistration;
