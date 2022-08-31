import React, { useCallback, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import axios from 'axios';
import useSWR from 'swr';
import {
  RegisteredTown,
  TownRegistrationButton,
  TownRegistrationContainer,
  TownRegistrationList,
  UnRegisteredTown,
} from './style';
import fetcherAccessToken from '../../utils/fetcherAccessToken';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function TownRegistration() {
  const navigate = useNavigate();
  const onClickToMain = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const onClickToAddTown = useCallback(() => {
    navigate('/town');
  }, [navigate]);

  const { data: townData, mutate: townMutate } = useSWR(
    `${BACKEND_URL}/user/neighborhood/select`,
    fetcherAccessToken,
  );

  useEffect(() => console.log(townData), [townData]);

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

  const onDeleteTown = useCallback(
    (id) => {
      axios
        .delete(`${BACKEND_URL}/user/neighborhood/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.accessToken}` },
        })
        .then((res) => {
          console.log(res);
          townMutate();

          // townMutate({ ...townData, count: `${--townData.count}` });
          // if (townData.count === '1') {
          //   onClickToAddTown();
          // }
        })
        .catch((error) => console.log(error));
    },
    [townMutate],
  );

  // 소셜로그인 안하면 url로 접근 시 리다이렉트
  if (!localStorage?.verify) {
    return <Navigate to="/login" replace />;
  }
  if (!townData) {
    return <h1>동네 데이터 불러오는 중</h1>;
  }

  return (
    <TownRegistrationContainer>
      <h1>내 동네 설정 </h1>
      <h2>나의 동네는 최소 1곳 최대 3곳까지 등록 가능합니다.</h2>
      <img
        className="town_back_btn"
        role="button"
        onKeyDown={() => {}}
        onClick={onClickToMain}
        tabIndex={0}
        alt="search_back"
        src={`${process.env.PUBLIC_URL}/assets/images/expand_more_up.png`}
      />
      <TownRegistrationList>
        {townData?.data[0] ? (
          <RegisteredTown
            selected={
              townData?.data[0].choiceYN === 'Y' ? 'selected' : 'unSelected'
            }
            onClick={() => {
              onSelectTown(townData?.data[0].neighborhoodId);
            }}
          >
            {townData?.data[0].neighborhoodName}
            <img
              role="button"
              onKeyDown={() => {}}
              onClick={(e) => {
                e.stopPropagation();
                if (townData?.count === '1') {
                  if (
                    // eslint-disable-next-line no-restricted-globals, no-alert
                    confirm(`동네는 최소 한 곳 이상 등록되어 있어야 합니다.
동네를 변경하시겠습니까?`)
                  ) {
                    onDeleteTown(townData?.data[0].neighborhoodId);
                    navigate('/town');
                  }
                } else {
                  onDeleteTown(townData?.data[0].neighborhoodId);
                  onSelectTown(townData?.data[1].neighborhoodId);
                }
              }}
              tabIndex={0}
              alt="search_cancel"
              src={`${process.env.PUBLIC_URL}/assets/images/cancel.png`}
            />
          </RegisteredTown>
        ) : (
          <UnRegisteredTown onClick={onClickToAddTown}>
            <img
              alt="search_add"
              src={`${process.env.PUBLIC_URL}/assets/images/black_add.png`}
            />
          </UnRegisteredTown>
        )}
        {townData?.data[1] ? (
          <RegisteredTown
            selected={
              townData?.data[1].choiceYN === 'Y' ? 'selected' : 'unSelected'
            }
            onClick={() => {
              onSelectTown(townData?.data[1].neighborhoodId);
            }}
          >
            {townData?.data[1].neighborhoodName}
            <img
              role="button"
              onKeyDown={() => {}}
              tabIndex={0}
              onClick={(e) => {
                onDeleteTown(townData?.data[1].neighborhoodId);
                e.stopPropagation();
                if (townData?.data[1].choiceYN !== 'Y') {
                  return;
                }
                onSelectTown(townData?.data[0].neighborhoodId);
              }}
              alt="search_cancel"
              src={`${process.env.PUBLIC_URL}/assets/images/cancel.png`}
            />
          </RegisteredTown>
        ) : (
          <UnRegisteredTown onClick={onClickToAddTown}>
            <img
              alt="search_add"
              src={`${process.env.PUBLIC_URL}/assets/images/black_add.png`}
            />
          </UnRegisteredTown>
        )}
        {townData?.data[2] ? (
          <RegisteredTown
            selected={
              townData?.data[2].choiceYN === 'Y' ? 'selected' : 'unSelected'
            }
            onClick={() => {
              onSelectTown(townData?.data[2].neighborhoodId);
            }}
          >
            {townData?.data[2].neighborhoodName}
            <img
              role="button"
              onKeyDown={() => {}}
              tabIndex={0}
              onClick={(e) => {
                onDeleteTown(townData?.data[2].neighborhoodId);
                e.stopPropagation();
                if (townData?.data[2].choiceYN !== 'Y') {
                  return;
                }
                onSelectTown(townData?.data[1].neighborhoodId);
              }}
              alt="search_cancel"
              src={`${process.env.PUBLIC_URL}/assets/images/cancel.png`}
            />
          </RegisteredTown>
        ) : (
          <UnRegisteredTown onClick={onClickToAddTown}>
            <img
              alt="search_add"
              src={`${process.env.PUBLIC_URL}/assets/images/black_add.png`}
            />
          </UnRegisteredTown>
        )}
      </TownRegistrationList>

      <TownRegistrationButton onClick={onClickToMain}>
        확인
      </TownRegistrationButton>
    </TownRegistrationContainer>
  );
}

export default TownRegistration;
