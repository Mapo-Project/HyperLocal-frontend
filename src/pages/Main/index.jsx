import React, { useEffect, useCallback, useState, useMemo } from 'react';

import { useNavigate } from 'react-router';
import useSWR from 'swr';

import { getMonth, getDate } from 'date-fns';
import {
  FindTown,
  Footer,
  MainButton,
  MainPageContainer,
  MainItemsContainer,
  MainScrollbars,
  SelectWrapper,
  Label,
  SelectOptions,
  Option,
} from './style';

import { mainItemsData } from '../../utils/dummyData/mainPageData.js';
import fetcherAccessToken from '../../utils/fetcherAccessToken';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function SelectBox({
  options,
  defaultValue,
  onSelectAdditionalTown,
  onSelectCurrentTown,
}) {
  const [isShowOptions, setShowOptions] = useState(false);

  return (
    <SelectWrapper onClick={() => setShowOptions((prev) => !prev)}>
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/main_expand_more.png`}
        alt="expand_more"
      />
      <Label>{defaultValue}</Label>
      <SelectOptions show={isShowOptions}>
        {!options.length ? (
          <Option key="성산동" value="성산동">
            성산동
          </Option>
        ) : (
          options?.map((option) => (
            <Option
              onClick={(e) => {
                e.stopPropagation();
                onSelectCurrentTown(e.target.textContent);
              }}
            >
              {option.town}
            </Option>
          ))
        )}

        <Option
          onClick={(e) => {
            e.stopPropagation();
            onSelectAdditionalTown();
          }}
          type="changeTown"
        >
          동네설정
        </Option>
      </SelectOptions>
    </SelectWrapper>
  );
}

function MainItems({
  itemId, //
  itemsTag, //
  itemsImg, //
  itemsHeadText, //
  itemsTownLocation, //
  itemsLimitParticipants, //
  itemsCurrentParticipants, // 처음에 0
  itemsPrice, //
  itemsHeartCount, // 해야함
  itemsDeadline, //
  isHeartEmpty, // 해야함
  onClickHeart, // 해야함
  onClickToDetailPage,
  isLock,
  itemsHomemade,
}) {
  let itemsDeadline2 = '';
  if (typeof itemsDeadline !== 'string') {
    itemsDeadline2 = `${
      getMonth(itemsDeadline) > 8
        ? `${getMonth(itemsDeadline) + 1}`
        : `0${getMonth(itemsDeadline) + 1}`
    }.${
      getDate(itemsDeadline) > 9
        ? `${getDate(itemsDeadline)}`
        : `0${getDate(itemsDeadline)}`
    }`;
  } else {
    itemsDeadline2 = itemsDeadline;
  }
  let itemsTag2 = [...itemsTag];
  if (itemsTag.length < 2) {
    switch (itemsTag[0]) {
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
      case '장보기 친구':
        itemsTag2 = ['장보기 친구 🤝 '];
        break;
      default:
        itemsTag2;
    }
    if (itemsHomemade) {
      itemsTag2.push('홈메이드 🧡');
    }
  }

  return (
    <MainItemsContainer>
      <div className="items_header">
        <div className="items_tag_wrapper">
          {itemsTag2.map((tag, idx) => (
            <div key={idx} className="items_tag">
              {tag}
            </div>
          ))}
        </div>
        <img
          className="items_detail"
          src={`${process.env.PUBLIC_URL}/assets/images/main_detail_bar.png`}
          alt="items_detail_bar"
        />
      </div>
      <div
        className="items_content_wrapper"
        role="button"
        onKeyDown={() => {}}
        tabIndex={0}
        onClick={onClickToDetailPage}
      >
        <div className="items_text_wrapper">
          <h1>{itemsHeadText}</h1>
          <div className="items_main">
            <div className="items_price">₩ {itemsPrice} / </div>
            <div className="items_participants">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/main_person.png`}
                alt="items_participants"
              />
              <span>{itemsLimitParticipants}</span>
            </div>
            <div className="items_deadline">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/main_calendar_month.png`}
                alt="items_deadline"
              />
              {/* 더미데이터 때문에 */}~{itemsDeadline2}
            </div>
          </div>
        </div>
        <div className="items_img_wrapper">
          {/* lock걸려있으면 사진을 보여주지 않음 */}
          {!isLock ? (
            <img
              // 더미데이터때문에 만들어놓음
              src={
                itemsImg[0] === '/'
                  ? itemsImg
                  : URL.createObjectURL(itemsImg[0].files)
              }
              alt="items_img"
            />
          ) : (
            <div>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/main_lock.png`}
                alt="lock"
              />
            </div>
          )}
        </div>
      </div>
      <div className="items_footer">
        <img
          className="items_chat"
          alt="chat"
          src={`${process.env.PUBLIC_URL}/assets/images/main_chat_bubble.png`}
        />
        {itemsCurrentParticipants}명 참여중
        <img
          role="button"
          onKeyDown={() => {}}
          tabIndex={itemId}
          onClick={onClickHeart}
          className="items_heart"
          src={
            isHeartEmpty
              ? `${process.env.PUBLIC_URL}/assets/images/main_heart.png`
              : `${process.env.PUBLIC_URL}/assets/images/main_empty_heart.svg`
          }
          alt="heart"
        />
        <p>{itemsHeartCount}</p>
        <span>{itemsTownLocation} - 아이디</span>
      </div>
    </MainItemsContainer>
  );
}

function Main({
  currentSelectedTown,
  currentTown,
  onSelectCurrentTown,
  newShareData,
}) {
  const { data: userData } = useSWR(
    `${BACKEND_URL}/user/profile/select`,
    fetcherAccessToken,
  );

  // 더미데이터와 추가데이터 병합
  const mainItemsData2 = useMemo(
    () => [...mainItemsData, ...newShareData],
    [newShareData],
  );

  const [maindata, setMaindata] = useState();

  // 지역별 정렬
  const onSortByLocation = useCallback(() => {
    setMaindata([
      ...mainItemsData2.filter((data) =>
        data.itemsTownLocation?.includes(currentSelectedTown),
      ),
    ]);
  }, [currentSelectedTown, mainItemsData2]);

  // 날짜순 정렬
  const onSortByDate = useCallback(() => {
    setMaindata([
      ...mainItemsData2.sort((a, b) => b.itemsDeadline - a.itemsDeadline),
    ]);
  }, [mainItemsData2]);

  useEffect(() => {
    onSortByLocation();
    onSortByDate();
  }, [onSortByLocation, onSortByDate]);

  // 하트
  const onClickHeart = (e) => {
    const targetNum = e.target.attributes.tabindex.nodeValue * 1;

    setMaindata((maindata2) =>
      maindata2.map((data) =>
        data.itemId === targetNum
          ? {
              ...data,
              isHeartEmpty: !data.isHeartEmpty,

              itemsHeartCount: !data.isHeartEmpty
                ? data.itemsHeartCount + 1
                : data.itemsHeartCount - 1,
            }
          : data,
      ),
    );
  };

  const navigate = useNavigate();

  const onSelectAdditionalTown = () => {
    if (userData) {
      if (currentTown.length === 3) {
        navigate('/town/regist');
      } else {
        navigate('/town');
      }
    } else {
      navigate('/login');
    }
  };

  const onClickToCreatePage = () => {
    navigate('/create');
  };
  const onClickToLoginPage = () => {
    navigate('/login');
  };
  const onClickToMyPage = () => {
    navigate('/mypage');
  };
  const onClickToInterestingnPage = () => {
    navigate('/interesting');
  };
  const onClickToDetailPage = () => {
    navigate('/detail/2');
  };

  console.log({ userData, currentSelectedTown, currentTown, newShareData });
  return (
    <MainPageContainer>
      <FindTown>
        <SelectBox
          options={currentTown}
          defaultValue={currentSelectedTown}
          onSelectAdditionalTown={onSelectAdditionalTown}
          onSelectCurrentTown={onSelectCurrentTown}
        />
        <div className="FindTown_search_container">
          <img
            className="FindTown_search"
            src={`${process.env.PUBLIC_URL}/assets/images/main_search.png`}
            alt="search"
          />
          {!userData ? (
            <span
              role="button"
              onKeyDown={() => {}}
              tabIndex={0}
              className="FindTown_login"
              onClick={onClickToLoginPage}
            >
              login
            </span>
          ) : (
            <img
              className="main_profile"
              role="button"
              onKeyDown={() => {}}
              tabIndex={0}
              alt="profile_img"
              src={userData.data.profileImg}
              onClick={onClickToMyPage}
            />
          )}
        </div>
      </FindTown>

      <div className="main_banner" />
      <MainScrollbars autoHide style={{ height: '520px' }}>
        {maindata?.map((data) => (
          <MainItems
            key={data.itemId}
            {...data}
            onClickHeart={onClickHeart}
            onClickToDetailPage={onClickToDetailPage}
          />
        ))}
      </MainScrollbars>

      <MainButton onClick={onClickToCreatePage}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/main_add.png`}
          alt="pencil"
        />
      </MainButton>

      <Footer>
        <div className="menu_container">
          <div className="menu_border">
            <img
              className="menu_photo"
              src={`${process.env.PUBLIC_URL}/assets/images/main_home.png`}
              alt="home"
            />
          </div>
          <div className="menu_text">홈</div>
        </div>
        <div
          className="menu_container"
          role="button"
          onKeyDown={() => {}}
          tabIndex={0}
          onClick={onClickToInterestingnPage}
        >
          <div className="menu_border">
            <img
              className="menu_photo"
              src={`${process.env.PUBLIC_URL}/assets/images/nav/favorite.png`}
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
      </Footer>
    </MainPageContainer>
  );
}

export default Main;
