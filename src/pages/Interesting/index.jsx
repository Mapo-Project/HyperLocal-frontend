import React from 'react';
import { Navigate, useNavigate } from 'react-router';
import useSWR from 'swr';
import { getMonth, getDate } from 'date-fns';

import {
  InterestingContent,
  InterestingFooter,
  InterestingMainContainer,
} from './style';

import fetcherAccessToken from '../../utils/fetcherAccessToken';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function Interesting({ mainData }) {
  const { data: userData } = useSWR(
    `${BACKEND_URL}/user/profile/select`,
    fetcherAccessToken,
  );

  const interestingDate = mainData.filter((data) => data.isHeartEmpty);

  const changeDate = (originDate) => {
    if (typeof originDate !== 'string') {
      return `${
        getMonth(originDate) > 8
          ? `${getMonth(originDate) + 1}`
          : `0${getMonth(originDate) + 1}`
      }.${
        getDate(originDate) > 9
          ? `${getDate(originDate)}`
          : `0${getDate(originDate)}`
      }`;
    }
    return originDate;
  };

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
              <span className="interesting--content_price">
                <img
                  className="interesting--price_img"
                  alt="price"
                  src={`${process.env.PUBLIC_URL}/assets/images/detail_Subtitle.png`}
                />
                {data.itemsPrice}
              </span>
              /
              <span className="interesting--content_participant">
                <img
                  className="interesting--pariticipant_img"
                  alt="pariticipant"
                  src={`${process.env.PUBLIC_URL}/assets/images/create_person.png`}
                />
                {data.itemsCurrentParticipants}
              </span>
              <span className="interesting--content_dueDate">
                <img
                  className="interesting--deadline_img"
                  src={`${process.env.PUBLIC_URL}/assets/images/main_calendar_month.png`}
                  alt="deadline"
                />
                ~{changeDate(data.itemsDeadline)}
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
              src={`${process.env.PUBLIC_URL}/assets/images/interest_home.png`}
              alt="home"
            />
          </div>
          <div className="menu_text">홈</div>
        </div>
        <div className="menu_container">
          <div className="menu_border">
            <img
              className="menu_photo"
              src={`${process.env.PUBLIC_URL}/assets/images/main_heart.png`}
              alt="heart"
            />
          </div>
          <div className="menu_text">관심</div>
        </div>
        <div className="menu_container">
          <div className="menu_border">
            <img
              className="menu_photo"
              src={`${process.env.PUBLIC_URL}/assets/images/nav/mode_comment.png`}
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
              src={`${process.env.PUBLIC_URL}/assets/images/nav/account_circle.png`}
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
