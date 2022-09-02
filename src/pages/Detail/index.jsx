import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';

import { getMonth, getDate } from 'date-fns';

import useSWR from 'swr';

import { DetailButton, DetailFooter, DetailMainContainer } from './style';
import fetcherAccessToken from '../../utils/fetcherAccessToken';

import DetailHeader from './components/DetailHeader';
import DetailContent from './components/DetailContent';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function Detail({ mainData, onClickHeart }) {
  const { currentItemId } = useParams();

  // 유저데이터

  const { data: userData } = useSWR(
    `${BACKEND_URL}/user/profile/select`,
    fetcherAccessToken,
  );

  const selectedData = mainData.filter(
    (data) => data.itemId === currentItemId * 1,
  )[0];

  const changeDate = useCallback((originDate) => {
    if (typeof originDate !== 'string') {
      return `${
        getMonth(originDate) > 7
          ? `${getMonth(originDate) + 1}`
          : `0${getMonth(originDate) + 1}`
      }월 ${
        getDate(originDate) > 9
          ? `${getDate(originDate)}`
          : `0${getDate(originDate)}`
      }일까지`;
    }
    // 더미데이터
    return `${originDate.slice(1, 2)}월 ${originDate.slice(3, 5)}일까지`;
  }, []);

  const navigate = useNavigate();

  const onClicktoMain = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const onClicktoLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);
  // swr로 데이터를 불러오는 중에는 로딩중 창을 띄운다.
  if (userData === undefined) {
    return <div>로딩중</div>;
  }

  return (
    <DetailMainContainer>
      <DetailHeader
        itemsImg={selectedData.itemsImg}
        onClicktoMain={onClicktoMain}
      />

      <DetailContent
        itemsHeadText={selectedData.itemsHeadText}
        itemsText={selectedData.itemsText}
        itemsLink={selectedData.itemsLink}
        itemsConfidence={selectedData.itemsConfidence}
        itemsPrice={selectedData.itemsPrice}
        itemRegistDate={selectedData.itemRegistDate}
        itemsDeadline={selectedData.itemsDeadline}
        itemUserImg={selectedData.itemUserImg}
        itemUserName={selectedData.itemUserName}
        itemsTownLocation={selectedData.itemsTownLocation}
        itemsLimitParticipants={selectedData.itemsLimitParticipants}
        itemsCurrentParticipants={selectedData.itemsCurrentParticipants}
        itemsTag={selectedData.itemsTag}
        itemsHomemade={selectedData.itemsHomemade}
        changeDate={changeDate}
      />
      <DetailFooter>
        <img
          role="button"
          onKeyDown={() => {}}
          tabIndex={0}
          onClick={() =>
            userData ? onClickHeart(selectedData.itemId) : onClicktoLogin()
          }
          className="items_heart"
          src={
            selectedData.isHeartEmpty
              ? `${process.env.PUBLIC_URL}/assets/images/full_heart.png`
              : `${process.env.PUBLIC_URL}/assets/images/empty_heart.png`
          }
          alt="heart"
        />
        <p>{selectedData.itemsHeartCount}</p>

        <DetailButton onClick={() => (userData ? '' : onClicktoLogin())}>
          채팅 참여
        </DetailButton>
      </DetailFooter>
    </DetailMainContainer>
  );
}

export default Detail;
