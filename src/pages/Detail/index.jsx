import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';

import useSWR from 'swr';

import { DetailButton, DetailFooter, DetailMainContainer } from './style';
import fetcherAccessToken, {
  fetcherNonAccessToken,
} from '../../utils/fetcherAccessToken';

import DetailHeader from './components/DetailHeader';
import DetailContent from './components/DetailContent';

function Detail() {
  const { currentItemId } = useParams();

  // 유저데이터
  const { data: userData } = useSWR(
    `/user/profile/select`,
    fetcherAccessToken,
    { dedupingInterval: 500 },
  );

  const { data: detailBoardData } = useSWR(
    `/board/detail/select/${currentItemId}`,
    fetcherNonAccessToken,
    { dedupingInterval: 500 },
  );

  const navigate = useNavigate();

  const onClicktoMain = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const onClicktoLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  return (
    <DetailMainContainer>
      <DetailHeader
        itemsImg={detailBoardData?.data.noticeImg}
        onClicktoMain={onClicktoMain}
      />

      <DetailContent
        itemsHeadText={detailBoardData?.data.title}
        itemsText={detailBoardData?.data.description}
        itemsLink={detailBoardData?.data.link}
        itemsConfidence={detailBoardData?.data.containerYN}
        itemsPrice={detailBoardData?.data.price}
        itemRegistDate={detailBoardData?.data.insertDT}
        itemsDeadline={detailBoardData?.data.deadline}
        itemUserImg={detailBoardData?.data.userImg}
        itemUserName={detailBoardData?.data.nickname}
        itemsTownLocation={detailBoardData?.data.nghbrName}
        itemsLimitParticipants={detailBoardData?.data.personnel}
        itemsTag={detailBoardData?.data.category}
        itemsHomemade={detailBoardData?.data.homemadeYN}
        howShare={detailBoardData?.data.howShare}
      />
      <DetailFooter>
        <img
          role="button"
          onKeyDown={() => {}}
          tabIndex={0}
          onClick={() => (userData ? '' : onClicktoLogin())}
          className="items_heart"
          src={
            detailBoardData?.data.isHeartEmpty
              ? `${process.env.PUBLIC_URL}/assets/images/full_heart.png`
              : `${process.env.PUBLIC_URL}/assets/images/empty_heart.png`
          }
          alt="heart"
        />
        <p>4</p>

        <DetailButton onClick={() => (userData ? '' : onClicktoLogin())}>
          채팅 참여
        </DetailButton>
      </DetailFooter>
    </DetailMainContainer>
  );
}

export default Detail;
