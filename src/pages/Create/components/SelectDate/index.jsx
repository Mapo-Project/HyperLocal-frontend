import React, { useCallback, useMemo, useState } from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { getYear, getMonth } from 'date-fns';
import {
  DateModalCover,
  MyCalendarButton,
  MyCalendarContainer,
  SelectDateContainer,
} from './style';
import { ErrorChecker } from '../style';

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

const SelectDate = React.memo(function SelectDate({
  dueDate,
  setDueDate,
  isCalenderOpen,
  setIsCalenderOpen,
}) {
  const [showModal, setShowModal] = useState(false);

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

  // console.log(years, months, dueDate, getMonth(dueDate));
  return (
    <SelectDateContainer>
      마켓 기한
      <DateModalCover show={showModal} />
      <DatePicker
        onClick={(e) => {
          e.stopPropagation();
        }}
        show={showModal}
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
        onInputClick={() => {
          setIsCalenderOpen(true);
          setShowModal((prev) => !prev);
        }}
        onClickOutside={() => {
          setIsCalenderOpen(false);
          setShowModal((prev) => !prev);
        }}
        readOnly // 값 임의 변경 금지
        popperPlacement="top-start" // 팝업 위치
        popperModifiers={[
          {
            name: 'offset',
            options: {
              offset: [-1, -182],
            },
          },
        ]} // 팝업 위치 세부조정
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
                if (value >= 12) {
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
            setShowModal((prev) => !prev);
          }}
          alt="x"
          src={`${process.env.PUBLIC_URL}/assets/images/close.png`}
        />
        <MyCalendarButton
          onClick={(e) => {
            e.preventDefault();
            if (dueDate) {
              setIsCalenderOpen(false);
              setShowModal((prev) => !prev);
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
export default SelectDate;
