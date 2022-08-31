import React, { useCallback, useMemo, useRef } from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { getYear, getMonth } from 'date-fns';
import {
  BarterContainer,
  CategoryLabel,
  CategoryOption,
  CategorySelectOptions,
  ConfidenceWrapper,
  ErrorChecker,
  HeadAndTextContainer,
  HeaderTextContainer,
  LinkContainer,
  MyCalendarButton,
  MyCalendarContainer,
  PriceContainer,
  RadioBox,
  RadioBoxLabel,
  SelectCategoryWrapper,
  SelectDateContainer,
  SelectedImg,
  SelectPaticipantContainer,
  SelectPhotoContainer,
  SelectPhotoWrapper,
} from './style';

import { category as categroies } from '../../../utils/dummyData/createPageData';

export const HeaderText = React.memo(function HeaderText({ onClickToMain }) {
  return (
    <HeaderTextContainer>
      <img
        draggable="false"
        role="button"
        onKeyDown={() => {}}
        tabIndex={0}
        onClick={onClickToMain}
        alt="x"
        src={`${process.env.PUBLIC_URL}/assets/images/close.png`}
      />
      <h1>
        두근두근
        <br />
        어떤 이웃과 만날지 기대돼요!
      </h1>
    </HeaderTextContainer>
  );
});
export const SelectPhoto = React.memo(function SelectPhoto({ img, setImg }) {
  const imgId = useRef(0);
  return (
    <SelectPhotoContainer>
      <label htmlFor="addImg">
        <img
          alt="dummy_photo"
          src={`${process.env.PUBLIC_URL}/assets/images/create/create_add_a_photo.png`}
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
                src={`${process.env.PUBLIC_URL}/assets/images/create/create_delete.png`}
              />
            )}

            <img
              className="drag-img"
              alt="delete-drag-img"
              src={`${process.env.PUBLIC_URL}/assets/images/create/create_drag_indicator.png`}
            />
          </div>
        ))}
      </SelectPhotoWrapper>
    </SelectPhotoContainer>
  );
});
export const SelectCategory = React.memo(function SelectCategory({
  setShowCategory,
  setIsHomemade,
  isShowCategory,
  category,
  setCategory,
}) {
  return (
    <SelectCategoryWrapper
      onClick={() => {
        setShowCategory((prev) => !prev);
        setIsHomemade(false);
      }}
    >
      {!isShowCategory ? (
        <img
          draggable="false"
          src={`${process.env.PUBLIC_URL}/assets/images/expand_more_down.png`}
          alt="expand_more"
        />
      ) : (
        <img
          draggable="false"
          src={`${process.env.PUBLIC_URL}/assets/images/expand_more_up.png`}
          alt="expand_more"
        />
      )}

      <CategoryLabel>{category}</CategoryLabel>
      <CategorySelectOptions show={isShowCategory}>
        {categroies?.map((option, idx) => (
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
    </SelectCategoryWrapper>
  );
});
export const HeadAndText = React.memo(function HeadAndText({
  title,
  onChangeTitle,
  text,
  onChangeText,
}) {
  return (
    <HeadAndTextContainer>
      <label htmlFor="headText">
        제목
        <input id="headText" value={title} onChange={onChangeTitle} />
        <ErrorChecker
          draggable="false"
          src={
            title
              ? `${process.env.PUBLIC_URL}/assets/images/input_check.png`
              : `${process.env.PUBLIC_URL}/assets/images/input_uncheck.png`
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
          draggable="false"
          src={
            text
              ? `${process.env.PUBLIC_URL}/assets/images/input_check.png`
              : `${process.env.PUBLIC_URL}/assets/images/input_uncheck.png`
          }
        />
      </label>
    </HeadAndTextContainer>
  );
});

export const LinkText = React.memo(function LinkText({ link, onChangeLink }) {
  return (
    <LinkContainer>
      <label htmlFor="link">
        링크(선택)
        <input id="link" value={link} onChange={onChangeLink} />
      </label>
    </LinkContainer>
  );
});

export const Confidence = React.memo(function Confidence({
  category,
  isConfidence,
  setIsConfidence,
  isHomemade,
  setIsHomemade,
  setPrice,
  price,
}) {
  return (
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
  );
});
export const Price = React.memo(function Price({
  isHomemade,
  setPrice,
  priceType,
  price,
}) {
  return (
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
          draggable="false"
          src={
            price
              ? `${process.env.PUBLIC_URL}/assets/images/input_check.png`
              : `${process.env.PUBLIC_URL}/assets/images/input_uncheck.png`
          }
        />
      </label>
    </PriceContainer>
  );
});
export const Barter = React.memo(function Barter({
  radioValue,
  isHomemade,
  setradioValue,
  setPriceType,
  setPrice,
}) {
  return (
    <BarterContainer>
      {radioValue.map((radioBox, idx) => (
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
      ))}
    </BarterContainer>
  );
});
export const SelectPaticipant = React.memo(function SelectPaticipant({
  participant,
  setParticipant,
}) {
  return (
    <SelectPaticipantContainer>
      <span>참여 인원</span>

      <div className="participant-control-wrapper">
        <img
          draggable="false"
          role="button"
          onKeyDown={() => {}}
          tabIndex={0}
          alt="-"
          src={`${process.env.PUBLIC_URL}/assets/images/create/create_do_not_disturb_on.png`}
          onClick={() => {
            if (participant > 2) setParticipant((data) => data - 1);
          }}
        />
        <div>
          <img
            draggable="false"
            alt="participant"
            src={`${process.env.PUBLIC_URL}/assets/images/participant.png`}
          />
          <span>{participant}</span>
        </div>

        <img
          draggable="false"
          role="button"
          onKeyDown={() => {}}
          tabIndex={0}
          alt="+"
          src={`${process.env.PUBLIC_URL}/assets/images/create/create_add_circle.png`}
          onClick={() => {
            if (participant < 20) setParticipant((data) => data + 1);
          }}
        />
      </div>
    </SelectPaticipantContainer>
  );
});

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

export const SelectDate = React.memo(function SelectDate({
  dueDate,
  setDueDate,
  isCalenderOpen,
  setIsCalenderOpen,
}) {
  // lodash 안쓰고 직접 구현
  const myRange = useCallback((prevNum, nextNum) => {
    return new Array(nextNum - prevNum)
      .fill(prevNum)
      .map((elm, idx) => elm + idx);
  }, []);

  const years = useMemo(
    () => myRange(getYear(new Date()), getYear(new Date()) + 2),
    [myRange],
  );
  const months = useMemo(
    () => myRange(getMonth(new Date()), getMonth(new Date()) + 12),
    [myRange],
  );

  return (
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
                draggable="false"
                alt="<"
                src={`${process.env.PUBLIC_URL}/assets/images/create/create_chevron_left.png`}
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
                draggable="false"
                alt="<"
                src={`${process.env.PUBLIC_URL}/assets/images/create/create_chevron_right.png`}
              />
            </div>
          </div>
        )}
      >
        <img
          draggable="false"
          className="calendar_x"
          role="button"
          onKeyDown={() => {}}
          tabIndex={0}
          onClick={() => {
            setIsCalenderOpen(false);
          }}
          alt="x"
          src={`${process.env.PUBLIC_URL}/assets/images/close.png`}
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
        draggable="false"
        src={
          dueDate
            ? `${process.env.PUBLIC_URL}/assets/images/input_check.png`
            : `${process.env.PUBLIC_URL}/assets/images/input_uncheck.png`
        }
      />
    </SelectDateContainer>
  );
});
