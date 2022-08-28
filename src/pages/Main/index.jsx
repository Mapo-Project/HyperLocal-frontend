import React, { useState } from 'react';

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
  MainShowNoData,
} from './style';

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
          options?.map((option, idx) => (
            <Option
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                onSelectCurrentTown(e.target.textContent);
                setShowOptions((prev) => !prev);
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
  itemsHomemade,
  itemUserName,
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
          src={`${process.env.PUBLIC_URL}/assets/images/main_detail_bar.jpg`}
          alt="items_detail_bar"
        />
      </div>
      <div
        className="items_content_wrapper"
        role="button"
        onKeyDown={() => {}}
        tabIndex={0}
        onClick={() => {
          onClickToDetailPage(itemId);
        }}
      >
        <div className="items_text_wrapper">
          <h1>
            {itemsHeadText.length > 30
              ? `${itemsHeadText.slice(0, 30)}...`
              : itemsHeadText}
          </h1>
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
          {itemsImg.length ? (
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
            <div />
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
          onClick={() => {
            onClickHeart(itemId);
          }}
          className="items_heart"
          src={
            isHeartEmpty
              ? `${process.env.PUBLIC_URL}/assets/images/main_heart.png`
              : `${process.env.PUBLIC_URL}/assets/images/main_empty_heart.svg`
          }
          alt="heart"
        />
        <p>{itemsHeartCount}</p>
        <span>
          {itemsTownLocation} ◦ {itemUserName}
        </span>
      </div>
    </MainItemsContainer>
  );
}

function Main({
  currentSelectedTown,
  currentTown,
  onSelectCurrentTown,
  mainData,
  onClickHeart,
}) {
  const { data: userData } = useSWR(
    `${BACKEND_URL}/user/profile/select`,
    fetcherAccessToken,
  );

  const onSortByLocation = mainData.filter((data) =>
    data.itemsTownLocation?.includes(currentSelectedTown),
  );

  const onSortByDate = onSortByLocation.sort((data1, data2) => {
    return data2.itemRegistDate - data1.itemRegistDate;
  });

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
  const onClickToInterestingPage = () => {
    navigate('/interesting');
  };
  // const onClickToCategorySearchPage = () => {
  //   navigate('/search');
  // };
  const onClickToDetailPage = (id) => {
    navigate(`/detail/${id}`);
  };

  // swr로 데이터를 불러오는 중에는 로딩중 창을 띄운다.
  if (userData === undefined) {
    return <div>로딩중</div>;
  }

  console.log({ userData, currentSelectedTown, currentTown });
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
            role="button"
            onKeyDown={() => {}}
            tabIndex={0}
            // onClick={onClickToCategorySearchPage}
          />
          {!userData ? (
            <span
              role="button"
              onKeyDown={() => {}}
              tabIndex={0}
              className="FindTown_login"
              onClick={onClickToLoginPage}
            >
              Sign-In
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

      <MainScrollbars
        autoHide
        style={{
          height: '665px',
          position: 'absolute',
          top: '54px',
          zIndex: 0,
          backgroundColor: '#f5f5f5',
        }}
      >
        {onSortByDate.length ? (
          <>
            <img
              className="main_banner"
              src={`${process.env.PUBLIC_URL}/assets/images/main_banner.jpg`}
              alt="banner"
            />
            {onSortByDate?.map((data) => (
              <MainItems
                key={data.itemId}
                {...data}
                onClickHeart={onClickHeart}
                onClickToDetailPage={onClickToDetailPage}
              />
            ))}
          </>
        ) : (
          <MainShowNoData>
            <h1>
              찾고있는 공동구매가 없나요?
              <br /> 직접 마켓을 열어 공동구매를
              <br /> 함께 할 이웃을 찾아보세요!
            </h1>
            <img
              alt="no_data_img"
              src={`${process.env.PUBLIC_URL}/assets/images/main_search.png`}
            />
          </MainShowNoData>
        )}
      </MainScrollbars>

      {/* <MainButton onClick={onClickToCreatePage}> */}
      <MainButton onClick={userData ? onClickToCreatePage : null}>
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
          onClick={userData ? onClickToInterestingPage : null}
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
