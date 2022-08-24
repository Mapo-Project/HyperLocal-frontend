import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';

import { getMonth, getDate } from 'date-fns';

import useSWR from 'swr';
import Scrollbars from 'react-custom-scrollbars-2';

import {
  DetailButton,
  DetailContent,
  DetailFooter,
  DetailHeader,
  DetailMainContainer,
} from './style';
import fetcherAccessToken from '../../utils/fetcherAccessToken';

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

  // console.log(mainData, selectedData, currentItemId);
  // 지금 쓸데 없는 렌더링이 너무 많이 되고 있다.
  // useEffect를 이용하던지 해서 최적화를 많이 시켜야한다...

  const changeDate = (originDate) => {
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
  };

  let itemsTag2 = [...selectedData.itemsTag];
  if (selectedData.itemsTag.length < 2) {
    switch (selectedData.itemsTag[0]) {
      case '배달':
        itemsTag2 = ['배달 🛵'];
        break;
      case 'OTT':
        itemsTag2 = ['OTT 📺'];
        break;
      case '식품':
        itemsTag2 = ['식품 🍎'];
        break;
      case '의류':
        itemsTag2 = ['의류 👕'];
        break;
      case '장보기친구':
        itemsTag2 = ['장보기친구 🙋 '];
        break;
      case '생활용품':
        itemsTag2 = ['생활용품 🧹 '];
        break;
      case '미용/화장품':
        itemsTag2 = ['미용/화장품 💄 '];
        break;
      case '온라인강의/Software':
        itemsTag2 = ['온라인강의/Software 💻 '];
        break;
      case '반려동물':
        itemsTag2 = ['반려동물 🐾 '];
        break;
      default:
        itemsTag2;
    }
    if (selectedData.itemsHomemade) {
      itemsTag2.push('홈메이드 🧡');
    }
  }
  const navigate = useNavigate();

  const onClicktoMain = useCallback(() => {
    navigate('/');
  }, [navigate]);

  // swr로 데이터를 불러오는 중에는 로딩중 창을 띄운다.
  if (userData === undefined) {
    return <div>로딩중</div>;
  }

  return (
    <DetailMainContainer>
      <DetailHeader>
        {typeof selectedData.itemsImg === 'string' ? (
          <img
            className="detail_main_img"
            alt="header_img"
            src={selectedData.itemsImg}
          />
        ) : selectedData.itemsImg.length ? (
          <img
            className="detail_main_img"
            alt="header_img"
            src={URL.createObjectURL(selectedData.itemsImg[0].files)}
          />
        ) : (
          <div className="detail_main_img" />
        )}

        <img
          role="button"
          onKeyDown={() => {}}
          tabIndex={0}
          className="back_btn"
          alt="back_btn"
          onClick={onClicktoMain}
          src={`${process.env.PUBLIC_URL}/assets/images/detail_arrow_back.png`}
        />
        <img
          className="share_btn"
          alt="share_btn"
          src={`${process.env.PUBLIC_URL}/assets/images/detail_share.png`}
        />
        <img
          className="more_info_btn"
          alt="more_info_btn"
          src={`${process.env.PUBLIC_URL}/assets/images/detail_more_vert.png`}
        />
        <span>
          {/* 더미데이터면 1, 사진을 등록 안했으면 1 */}1 /{' '}
          {typeof selectedData.itemsImg === 'string'
            ? 1
            : selectedData.itemsImg.length
            ? selectedData.itemsImg.length
            : 1}
        </span>
        {/* 전체 너비에서 원지름 8을 나누고 8px마다 있으므로 2로 나눈다. 첫번째는 마진이므로 반내림한다. */}
        {/* <section className="circle_border">
          {Array(Math.ceil(360 / 8 / 2))
            .fill('')
            .map((elm, idx) => (
              <div key={idx} />
            ))}
        </section> */}
      </DetailHeader>

      <Scrollbars autoHide style={{ height: '530px' }}>
        <DetailContent>
          {/* {selectedData.itemsTag.map((tag, idx) => (
          <div key={idx} className="item_tag">
            {tag}
          </div>
        ))} */}
          <div className="item_tag_wrapper">
            {itemsTag2.map((tag, idx) => (
              <div key={idx} className="item_tag">
                {tag}
              </div>
            ))}
          </div>

          <h1 className="item_title">{selectedData.itemsHeadText}</h1>
          <div className="item_text_wrapper wrapper">
            <img
              alt="text"
              src={`${process.env.PUBLIC_URL}/assets/images/detail_short_text.png`}
            />
            <p>{selectedData.itemsText}</p>
          </div>
          {selectedData.itemsLink && (
            <div className="item_link_wrapper wrapper">
              <img
                alt="link"
                src={`${process.env.PUBLIC_URL}/assets/images/detail_shopping_basket.png`}
              />
              <a href={selectedData.itemsLink} target="_blank" rel="noreferrer">
                {selectedData.itemsLink.length > 28
                  ? `${selectedData.itemsLink.slice(0, 28)}...`
                  : selectedData.itemsLink}
              </a>
            </div>
          )}
          {selectedData.itemsConfidence && (
            <div className="item_confidence_wrapper wrapper">
              <img
                alt="chore"
                src={`${process.env.PUBLIC_URL}/assets/images/detail_shopping_basket.png`}
              />
              <p>당신의 🧺용기가 필요해요</p>
            </div>
          )}
          <div className="item_price_wrapper wrapper">
            <img
              alt="price"
              src={`${process.env.PUBLIC_URL}/assets/images/detail_Subtitle.png`}
            />
            <p>{selectedData.itemsPrice}</p>
          </div>
          <div className="item_participant_wrapper wrapper">
            <img
              alt="participant"
              src={`${process.env.PUBLIC_URL}/assets/images/detail_person.png`}
            />
            <p>
              {`${selectedData.itemsLimitParticipants} / 
            ${selectedData.itemsCurrentParticipants}명 참여중`}
            </p>
          </div>
          <div className="item_duedate_wrapper wrapper">
            <img
              alt="duedate"
              src={`${process.env.PUBLIC_URL}/assets/images/detail_date_range.png`}
            />
            <p>{changeDate(selectedData.itemsDeadline)}</p>
          </div>
          <div className="item_user_wrapper">
            {selectedData?.itemUserImg ? (
              <img
                className="userImg"
                alt="userData"
                src={selectedData.itemUserImg}
              />
            ) : (
              <div className="user_dummy_img" />
            )}

            <div className="user_name_wrapper">
              <div>
                {selectedData.itemsTownLocation} ◦{' '}
                {selectedData.itemUserName
                  ? selectedData.itemUserName
                  : '동네이웃001'}
              </div>
              <div>식빵지수</div>
            </div>
            <div className="user_create_date">
              {selectedData.itemRegistDate
                ? `${
                    getDate(new Date() - selectedData.itemRegistDate) - 1 === 0
                      ? '오늘 작성'
                      : `${
                          getDate(new Date() - selectedData.itemRegistDate) - 1
                        }일전 작성`
                  }`
                : '1일전 작성'}
            </div>
          </div>
        </DetailContent>
      </Scrollbars>
      <DetailFooter>
        <img
          role="button"
          onKeyDown={() => {}}
          tabIndex={0}
          onClick={() => onClickHeart(selectedData.itemId)}
          className="items_heart"
          src={
            selectedData.isHeartEmpty
              ? `${process.env.PUBLIC_URL}/assets/images/main_heart.png`
              : `${process.env.PUBLIC_URL}/assets/images/main_empty_heart.svg`
          }
          alt="heart"
        />
        <p>{selectedData.itemsHeartCount}</p>

        <DetailButton>채팅 참여</DetailButton>
      </DetailFooter>
    </DetailMainContainer>
  );
}

export default Detail;
