import React from 'react';
import { Navigate, useNavigate } from 'react-router';
import useSWR from 'swr';

import {
  InterestingContent,
  InterestingFooter,
  InterestingMainContainer,
} from './style';

import fetcherAccessToken from '../../utils/fetcherAccessToken';
import { changeDate } from '../../utils/changeFormat';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function Interesting({ mainData }) {
  const { data: userData } = useSWR(
    `${BACKEND_URL}/user/profile/select`,
    fetcherAccessToken,
  );

  const interestingDate = mainData.filter((data) => data.isHeartEmpty);

  console.log(mainData, interestingDate);

  const navigate = useNavigate();

  const onClickToMyPage = () => {
    navigate('/mypage');
  };

  const onClckToMainPage = () => {
    navigate('/');
  };

  const onClickToDetailPage = (id) => {
    navigate(`/detail/${id}`);
  };

  // swr로 데이터를 불러오는 중에는 로딩중 창을 띄운다.
  if (userData === undefined) {
    return <div>로딩중</div>;
  }

  // 유저데이터가 없으면 첫 페이지로 이동
  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  return (
    <InterestingMainContainer>
      {interestingDate.map((data) => (
        <InterestingContent
          key={data.itemId}
          onClick={() => {
            onClickToDetailPage(data.itemId);
          }}
        >
          {typeof data.itemsImg === 'string' ? (
            <img
              className="interesting_main_img"
              alt="header_img"
              src={data.itemsImg}
            />
          ) : (
            <img
              className="interesting_main_img"
              alt="header_img"
              src={URL.createObjectURL(data.itemsImg[0].files)}
            />
          )}
          <div className="content_wrapper">
            <h1>
              {data.itemsHeadText.length > 20
                ? `${data.itemsHeadText.slice(0, 20)}...`
                : data.itemsHeadText}
            </h1>
            <div className="content_sub_wrapper">
              <span className="interesting--content_price interesting--content">
                <img
                  className="interesting--price_img"
                  alt="price"
                  src={`${process.env.PUBLIC_URL}/assets/images/price.png`}
                />
                <span>{data.itemsPrice}</span>
              </span>
              /
              <span className="interesting--content_participant interesting--content">
                <img
                  className="interesting--pariticipant_img"
                  alt="pariticipant"
                  src={`${process.env.PUBLIC_URL}/assets/images/participant.png`}
                />
                <span>{data.itemsCurrentParticipants}</span>
              </span>
              <span className="interesting--content_dueDate interesting--content">
                <img
                  className="interesting--deadline_img"
                  src={`${process.env.PUBLIC_URL}/assets/images/date_range.png`}
                  alt="deadline"
                />
                <span>~{changeDate(data.itemsDeadline)}</span>
              </span>
            </div>
          </div>
        </InterestingContent>
      ))}

      <InterestingFooter>
        <div
          className="menu_container"
          onClick={onClckToMainPage}
          role="button"
          onKeyDown={() => {}}
          tabIndex={0}
        >
          <div className="menu_border">
            <img
              className="menu_photo"
              src={`${process.env.PUBLIC_URL}/assets/images/home.png`}
              alt="home"
            />
          </div>
          <div className="menu_text">홈</div>
        </div>
        <div className="menu_container">
          <div className="menu_border">
            <img
              className="menu_photo"
              src={`${process.env.PUBLIC_URL}/assets/images/full_heart.png`}
              alt="heart"
            />
          </div>
          <div className="menu_text">관심</div>
        </div>
        <div className="menu_container">
          <div className="menu_border">
            <img
              className="menu_photo"
              src={`${process.env.PUBLIC_URL}/assets/images/chat_bubble.png`}
              alt="talk"
            />
          </div>
          <div className="menu_text">채팅</div>
        </div>
        <div
          className="menu_container"
          role="button"
          onKeyDown={() => {}}
          tabIndex={0}
          onClick={userData ? onClickToMyPage : null}
        >
          <div className="menu_border">
            <img
              className="menu_photo"
              src={`${process.env.PUBLIC_URL}/assets/images/account_circle.png`}
              alt="person"
            />
          </div>
          <div className="menu_text">My</div>
        </div>
      </InterestingFooter>
    </InterestingMainContainer>
  );
}

export default Interesting;
