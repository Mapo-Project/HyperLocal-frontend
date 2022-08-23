import React, { useCallback, useState, useRef } from 'react';

import Scrollbars from 'react-custom-scrollbars-2';
import { Navigate, useNavigate } from 'react-router';

import DatePicker, { CalendarContainer } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { getYear, getMonth } from 'date-fns';

import useSWR from 'swr';
import {
  BarterContainer,
  CategoryLabel,
  CategoryOption,
  CategorySelectOptions,
  ConfidenceWrapper,
  CreateButton,
  CreateButtonDisable,
  CreatePageMainContainer,
  ErrorChecker,
  HeadAndTextContainer,
  HeaderTextContainer,
  LinkContainer,
  MyCalendarButton,
  MyCalendarContainer,
  PriceContainer,
  RadioBox,
  RadioBoxLabel,
  SelectCategory,
  SelectDateContainer,
  SelectedImg,
  SelectPaticipantContainer,
  SelectPhotoContainer,
  SelectPhotoWrapper,
} from './style';
import { category as categroies } from '../../utils/dummyData/createPageData';
import useInput from '../../hooks/useInput';

import fetcherAccessToken from '../../utils/fetcherAccessToken';

const _ = require('lodash');

const radioBoxList = [
  { label: '같이 정해요', value: 'together', checked: false },
  { label: '나눔', value: 'share', checked: false },
  { label: '물물교환', value: 'exchange', checked: false },
];

const categoryValue = categroies;

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function MyContainer({ className, children }) {
  return (
    <MyCalendarContainer>
      <CalendarContainer className={className}>
        <h1>날짜 선택</h1>
        <div>{children}</div>
      </CalendarContainer>
    </MyCalendarContainer>
  );
}

function Create({ currentSelectedTown, setMaindata, dataId }) {
  // 유저데이터

  const { data: userData } = useSWR(
    `${BACKEND_URL}/user/profile/select`,
    fetcherAccessToken,
  );

  // 사진
  const [img, setImg] = useState([]);

  const imgId = useRef(0);

  // 제목
  const [title, , onChangeTitle] = useInput('');
  // 내용
  const [text, , onChangeText] = useInput('');
  // 링크
  const [link, , onChangeLink] = useInput('');
  // 용기 여부
  const [isConfidence, setIsConfidence] = useState(false);
  // 홈메이드 여부
  const [isHomemade, setIsHomemade] = useState(false);

  // 카테고리
  const [isShowCategory, setShowCategory] = useState(false);
  const [category, setCategory] = useState('카테고리');
  // 참여 인원
  const [participant, setParticipant] = useState(2);

  // 가격
  const [price, setPrice] = useState('');
  // 가격 유형
  const [priceType, setPriceType] = useState('');
  // radioBox
  const [radioValue, setradioValue] = useState(radioBoxList);

  console.log(radioValue);
  // 캘린더
  const [dueDate, setDueDate] = useState(null);
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);

  const years = _.range(getYear(new Date()), getYear(new Date()) + 2, 1);
  const months = _.range(getMonth(new Date()), getMonth(new Date()) + 12, 1);

  const navigate = useNavigate();
  // 데이터 제출
  const onSubmitCreateData = useCallback(
    (e) => {
      e.preventDefault();
      if (
        img.length > 0 &&
        title &&
        text &&
        category !== '카테고리' &&
        participant &&
        price &&
        dueDate
      ) {
        setMaindata((prov) => [
          {
            // eslint-disable-next-line no-param-reassign
            itemId: dataId.current++,
            itemsTag: [category],
            itemsImg: img,
            itemsHeadText: title,
            itemsText: text,
            itemsLink: link,
            itemsConfidence: isConfidence,
            itemsHomemade: isHomemade,
            itemsTownLocation: currentSelectedTown,
            itemsLimitParticipants: participant,
            itemsCurrentParticipants: 0,
            itemsPrice: price,
            itemsPriceType: priceType,
            itemsHeartCount: 0,
            itemsDeadline: dueDate,
            isHeartEmpty: false,
            isLock: !!isHomemade,
            itemUserName: userData?.data?.nickname,
            // eslint-disable-next-line radix
            itemRegistDate: new Date(),
          },

          ...prov,
        ]);
        console.log({
          dataId,
          img,
          title,
          text,
          link,
          isConfidence,
          isHomemade,
          participant,
          price,
          priceType,
          dueDate,
          category,
          currentSelectedTown,
        });
        navigate('/', { replace: true });
      }
    },
    [
      userData,
      navigate,
      dataId,
      img,
      title,
      text,
      link,
      isConfidence,
      isHomemade,
      participant,
      price,
      priceType,
      dueDate,
      category,
      currentSelectedTown,
      setMaindata,
    ],
  );

  const onClickToMain = useCallback(() => {
    navigate('/');
  }, [navigate]);

  // swr로 데이터를 불러오는 중에는 로딩중 창을 띄운다.
  if (userData === undefined) {
    return <div>로딩중</div>;
  }

  // 유저데이터가 없으면 첫 페이지로 이동
  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  return (
    <CreatePageMainContainer>
      <Scrollbars autoHide style={{ height: '800px' }}>
        <form onSubmit={onSubmitCreateData}>
          <HeaderTextContainer>
            <img
              role="button"
              onKeyDown={() => {}}
              tabIndex={0}
              onClick={onClickToMain}
              alt="x"
              src={`${process.env.PUBLIC_URL}/assets/images/create_close.png`}
            />
            <h1>
              두근두근
              <br />
              어떤 이웃과 만날지 기대돼요!
            </h1>
          </HeaderTextContainer>

          <SelectPhotoContainer>
            <label htmlFor="addImg">
              <img
                alt="dummy_photo"
                src={`${process.env.PUBLIC_URL}/assets/images/create_add_a_photo.png`}
              />
              <span>{img.length}/10</span>
              <input
                type="file"
                id="addImg"
                accept="image/jpg, image/png, image/jpeg"
                // multiple
                onChange={(e) => {
                  console.log(e.target.files);
                  // 사진파일 취소했을때 에러뜨는 것을 방지하기위해
                  if (e.target.files.length) {
                    const [files] = e.target.files;
                    console.log(files);
                    if (img.length < 10) {
                      setImg((prov) => [
                        ...prov,

                        { imgId: imgId.current++, imgSelected: false, files },
                      ]);
                    } else {
                      alert('사진 파일은 10개까지 등록 가능합니다');
                    }
                  }
                }}
              />
            </label>
            <SelectPhotoWrapper>
              {img.map((elm) => (
                <div key={elm.imgId}>
                  <SelectedImg
                    alt=""
                    src={URL.createObjectURL(elm.files)}
                    onClick={() => {
                      setImg((prov) =>
                        prov.map((data) =>
                          data.imgId === elm.imgId
                            ? { ...data, imgSelected: !elm.imgSelected }
                            : data,
                        ),
                      );
                    }}
                    selected={elm.imgSelected}
                  />
                  {elm.imgSelected && (
                    <img
                      role="button"
                      onKeyDown={() => {}}
                      tabIndex={0}
                      onClick={() => {
                        setImg((prov) =>
                          prov.filter((data) => data.imgId !== elm.imgId),
                        );
                      }}
                      className="delete-img"
                      alt="delete-img"
                      src={`${process.env.PUBLIC_URL}/assets/images/create_delete.png`}
                    />
                  )}

                  <img
                    className="drag-img"
                    alt="delete-drag-img"
                    src={`${process.env.PUBLIC_URL}/assets/images/create_drag_indicator.png`}
                  />
                </div>
              ))}
            </SelectPhotoWrapper>
          </SelectPhotoContainer>

          <SelectCategory onClick={() => setShowCategory((prev) => !prev)}>
            {!isShowCategory ? (
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/main_expand_more.png`}
                alt="expand_more"
              />
            ) : (
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/create_expand_more.png`}
                alt="expand_more"
              />
            )}

            <CategoryLabel>{category}</CategoryLabel>
            <CategorySelectOptions show={isShowCategory}>
              {categoryValue?.map((option, idx) => (
                <CategoryOption
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCategory(e.target.textContent);
                    setShowCategory((prev) => !prev);
                  }}
                >
                  {option.label}
                </CategoryOption>
              ))}
            </CategorySelectOptions>
          </SelectCategory>

          <HeadAndTextContainer>
            <label htmlFor="headText">
              제목
              <input id="headText" value={title} onChange={onChangeTitle} />
              <ErrorChecker
                src={
                  title
                    ? `${process.env.PUBLIC_URL}/assets/images/signup_check.png`
                    : `${process.env.PUBLIC_URL}/assets/images/signup_uncheck.png`
                }
              />
            </label>
            <label htmlFor="explanation">
              설명
              <textarea
                value={text}
                onChange={onChangeText}
                id="explanation"
                placeholder={`작성팁
  ◦  이웃과 같이 사고 싶은 물품은 무엇인가요?
  ◦  어디서 나눠 가져가나요?
  ◦  금액은 얼마이고 어떻게 나누나요?
  ◦  나눌 때 용기가 필요한가요?`}
              />
              <ErrorChecker
                src={
                  text
                    ? `${process.env.PUBLIC_URL}/assets/images/signup_check.png`
                    : `${process.env.PUBLIC_URL}/assets/images/signup_uncheck.png`
                }
              />
            </label>
          </HeadAndTextContainer>

          <LinkContainer>
            <label htmlFor="link">
              링크(선택)
              <input id="link" value={link} onChange={onChangeLink} />
            </label>
          </LinkContainer>

          <ConfidenceWrapper>
            {category === '식품' && (
              <>
                <label htmlFor="confidence">
                  <input
                    type="checkbox"
                    id="confidence"
                    value={isConfidence}
                    onClick={() => {
                      setIsConfidence((prov) => !prov);
                    }}
                  />
                  당신의 🧺용기가 필요해요
                </label>
                <label htmlFor="homemade">
                  <input
                    type="checkbox"
                    id="homemade"
                    value={isHomemade}
                    onClick={() => {
                      setIsHomemade((prov) => !prov);
                      if (!(price === '나눔' || price === '물물교환')) {
                        setPrice('');
                      }
                    }}
                  />
                  홈메이드🧡
                </label>
              </>
            )}
          </ConfidenceWrapper>

          <PriceContainer ishomemade={isHomemade}>
            <label htmlFor="price">
              가격
              <input
                id="price"
                value={`${price}`}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                disabled={isHomemade || priceType}
              />
              <span>₩</span>
              <ErrorChecker
                src={
                  price
                    ? `${process.env.PUBLIC_URL}/assets/images/signup_check.png`
                    : `${process.env.PUBLIC_URL}/assets/images/signup_uncheck.png`
                }
              />
            </label>
          </PriceContainer>

          <BarterContainer>
            {radioValue.map(
              (radioBox, idx) => (
                <div key={idx}>
                  {/* 라디오 박스를 state로 설정하고 활성화되면 true, 체크해제는 false하여 조작한다. */}
                  <RadioBox
                    type="radio"
                    id={radioBox.value}
                    value={radioBox.value}
                    name="barter"
                    disabled={radioBox.value === 'together' && isHomemade}
                    ishomemade={radioBox.value === 'together' && isHomemade}
                    onClick={() => {
                      setradioValue((prov) =>
                        prov.map((data) =>
                          data.value === radioBox.value
                            ? { ...data, checked: !data.checked }
                            : { ...data, checked: false },
                        ),
                      );
                      if (!radioBox.checked) {
                        setPriceType(radioBox.value);
                        setPrice(radioBox.label);
                      } else {
                        setPriceType('');
                        setPrice('');
                      }
                    }}
                    isChecked={radioBox.checked}
                  />
                  <RadioBoxLabel
                    htmlFor={radioBox.value}
                    ishomemade={radioBox.value === 'together' && isHomemade}
                  >
                    {radioBox.label}
                  </RadioBoxLabel>
                </div>
              ),
              // radioBox.value === 'together' && isHomemade ? null : (
              //   <div key={idx}>
              //     <input
              //       type="radio"
              //       id={radioBox.value}
              //       value={radioBox.value}
              //       name="barter"
              //     />
              //     <label htmlFor={radioBox.value}>{radioBox.label}</label>
              //   </div>
              // ),
            )}
          </BarterContainer>

          <SelectPaticipantContainer>
            <span>참여 인원</span>

            <div className="participant-control-wrapper">
              <img
                role="button"
                onKeyDown={() => {}}
                tabIndex={0}
                alt="-"
                src={`${process.env.PUBLIC_URL}/assets/images/create_do_not_disturb_on.png`}
                onClick={() => {
                  if (participant > 2) setParticipant((data) => data - 1);
                }}
              />
              <div>
                <img
                  alt="pariticipant"
                  src={`${process.env.PUBLIC_URL}/assets/images/create_person.png`}
                />
                {participant}
              </div>

              <img
                role="button"
                onKeyDown={() => {}}
                tabIndex={0}
                alt="+"
                src={`${process.env.PUBLIC_URL}/assets/images/create_add_circle.png`}
                onClick={() => {
                  if (participant < 20) setParticipant((data) => data + 1);
                }}
              />
            </div>
          </SelectPaticipantContainer>

          <SelectDateContainer>
            마켓 기한
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              minDate={new Date()} // 이전 날짜 disable
              placeholderText="날짜" // placeholder
              locale={ko} // 한국어로
              calendarContainer={MyContainer} // custom container
              shouldCloseOnSelect={false} // 날짜 클릭 시 안꺼지게
              calendarStartDay={1} // 시작하는 요일
              dateFormat="yyyy-MM-dd" //  날짜 형식
              open={isCalenderOpen} // 달력 열린 상태
              onInputClick={() => setIsCalenderOpen(true)}
              onClickOutside={() => setIsCalenderOpen(false)}
              readOnly // 값 임의 변경 금지
              popperPlacement="top-start" // 팝업 위치
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className="selectbox-wrapper">
                  <select
                    value={
                      months[
                        getMonth(date) - months[0] >= 0
                          ? getMonth(date) - months[0]
                          : 12 + getMonth(date) - months[0]
                      ]
                    }
                    onChange={({ target: { value } }) => {
                      if (value > 12) {
                        changeMonth(value - 12);
                        changeYear(years[1]);
                      } else {
                        changeMonth(value);
                        changeYear(years[0]);
                      }
                    }}
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option >= 12
                          ? `${years[1]}년 ${option - 12 + 1}월`
                          : `${years[0]}년 ${option + 1}월`}
                      </option>
                    ))}
                  </select>

                  <div
                    className="calender-btn button--previous"
                    role="button"
                    aria-label="<"
                    onKeyDown={() => {}}
                    onClick={() => {
                      if (getMonth(date) - months[0]) {
                        decreaseMonth();
                      }
                    }}
                    disabled={prevMonthButtonDisabled}
                  >
                    <img
                      alt="<"
                      src={`${process.env.PUBLIC_URL}/assets/images/create_chevron_left.png`}
                    />
                  </div>
                  <div
                    className="calender-btn button--next"
                    role="button"
                    aria-label="<"
                    onKeyDown={() => {}}
                    onClick={() => {
                      if (
                        getMonth(date) - months[0] !== -1 &&
                        getMonth(date) - months[0] !== 11
                      ) {
                        increaseMonth();
                      }
                    }}
                    disabled={nextMonthButtonDisabled}
                  >
                    <img
                      alt="<"
                      src={`${process.env.PUBLIC_URL}/assets/images/create_chevron_right.png`}
                    />
                  </div>
                </div>
              )}
            >
              <img
                className="calendar_x"
                role="button"
                onKeyDown={() => {}}
                tabIndex={0}
                onClick={() => {
                  setIsCalenderOpen(false);
                }}
                alt="x"
                src={`${process.env.PUBLIC_URL}/assets/images/create_close.png`}
              />
              <MyCalendarButton
                onClick={(e) => {
                  e.preventDefault();
                  if (dueDate) {
                    setIsCalenderOpen(false);
                  }
                }}
              >
                확인
              </MyCalendarButton>
            </DatePicker>
            <ErrorChecker
              src={
                dueDate
                  ? `${process.env.PUBLIC_URL}/assets/images/signup_check.png`
                  : `${process.env.PUBLIC_URL}/assets/images/signup_uncheck.png`
              }
            />
          </SelectDateContainer>

          {img.length > 0 &&
          title &&
          text &&
          category !== '카테고리' &&
          participant &&
          price &&
          dueDate ? (
            <CreateButton>확인</CreateButton>
          ) : (
            <CreateButtonDisable>확인</CreateButtonDisable>
          )}
        </form>
      </Scrollbars>
    </CreatePageMainContainer>
  );
}

export default Create;
