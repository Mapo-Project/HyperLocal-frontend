import React, { useEffect, useCallback, useRef, useState } from 'react';

import { useNavigate } from 'react-router';
import Select from 'react-select';
import { useDraggable } from 'react-use-draggable-scroll';
import useSWR from 'swr';

import {
  FindTown,
  Footer,
  MainButton,
  MainPageContainer,
  MainItemsContainer,
  MainScrollbars,
} from './style';

import { mainItemsData, options } from '../../utils/dummyData/mainPageData.js';
import fetcherAccessToken from '../../utils/fetcherAccessToken';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function MainItems({
  itemId,
  itemsTag,
  itemsImg,
  itemsHeadText,
  itemsTownLocation,
  itemsLimitParticipants,
  itemsCurrentParticipants,
  itemsPrice,
  itemsHeartCount,
  itemsDeadline,
  isHeartEmpty,
  onClickHeart,
  onClickToDetailPage,
}) {
  const ref = useRef();
  const { events } = useDraggable(ref);

  return (
    <MainItemsContainer onClick={onClickToDetailPage}>
      <div className="items_header">
        <div className="items_tag_wrapper" ref={ref} {...events}>
          {itemsTag.map((tag, idx) => (
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
      <div className="items_content_wrapper">
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
              ~{itemsDeadline}
            </div>
          </div>
        </div>
        <div className="items_img_wrapper">
          {/* lock걸려있으면 사진을 보여주지 않음 */}
          {itemsPrice !== '같이 정해요' ? (
            <img src={itemsImg} alt="items_img" />
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
          onKeyDown={onClickHeart}
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
        {itemsHeartCount}
        <span>{itemsTownLocation} - 아이디</span>
      </div>
    </MainItemsContainer>
  );
}

function Main() {
  const { data: userData } = useSWR(
    `${BACKEND_URL}/user/profile/select`,
    fetcherAccessToken,
  );

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const [maindata, setMaindata] = useState();

  const onSortByLocation = useCallback(() => {
    setMaindata([
      ...mainItemsData.filter((data) =>
        data.itemsTownLocation.includes(selectedOption.label),
      ),
    ]);
  }, [selectedOption?.label]);

  useEffect(() => {
    onSortByLocation();
  }, [onSortByLocation]);

  const onChangeTown = useCallback(
    (e) => {
      setSelectedOption(e);
      onSortByLocation();
    },
    [setSelectedOption, onSortByLocation],
  );

  const onClickHeart = (e) => {
    const targetNum = e.target.attributes.tabindex.nodeValue * 1;

    setMaindata((maindata2) =>
      maindata2.map((data) =>
        data.itemId === targetNum
          ? { ...data, isHeartEmpty: !data.isHeartEmpty }
          : data,
      ),
    );
  };

  const navigate = useNavigate();
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

  console.log(userData);
  return (
    <MainPageContainer>
      <FindTown>
        <div className="FindTown_selectBox_container">
          <Select
            classNamePrefix="react-select"
            className="FindTown_selectBox"
            defaultValue={options[0]}
            onChange={onChangeTown}
            options={options}
            isSearchable={false}
          />
        </div>
        <div className="FindTown_search_container">
          <img
            className="FindTown_search"
            src={`${process.env.PUBLIC_URL}/assets/images/main_search.png`}
            alt="search"
          />
          {!userData ? (
            <span
              role="button"
              onKeyDown={onClickToLoginPage}
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
              onKeyDown={onClickToLoginPage}
              tabIndex={0}
              alt="profile_img"
              src={userData.data.profile_img}
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
          onKeyDown={onClickToInterestingnPage}
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
          onKeyDown={userData ? onClickToMyPage : null}
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
