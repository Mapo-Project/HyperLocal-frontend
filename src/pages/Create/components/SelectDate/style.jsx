import styled from 'styled-components';
import Button from '../../../../components/Button';

export const SelectDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 16px;
  padding-bottom: 16px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  color: #212121;

  position: relative;
  margin-top: 16px;

  input {
    margin-top: 4px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    width: 328px;
    height: 48px;
    padding: 12px 16px;

    background: #f5f5f5;
    border-radius: 4px;
    border: 0;
  }
  input::placeholder {
    color: #9e9e9e;
  }
`;

export const MyCalendarContainer = styled.div`
  position: relative;

  z-index: 2;
  .selectbox-wrapper {
    text-align: start;
    margin-left: 24px;
    margin-bottom: 16px;
  }
  select {
    border: 0;
    height: 24px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;

    color: #212121;
  }
  .react-datepicker {
    position: relative;
    padding: 0 16px;
    box-sizing: border-box;
    border-radius: 20px 20px 0px 0px;
    width: 330px;
    background: #ffffff;
    /* border: 0; */
  }
  .calendar_x {
    position: absolute;
    top: 16px;
    left: 16px;
    width: 24px;
    cursor: pointer;
  }
  h1 {
    text-align: center;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #212121;
    margin-top: 16px;
    margin-bottom: 32px;
  }
  .calender-btn {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .calender-btn img {
    width: 40px;
  }
  .button--previous {
    left: 190px;
  }
  .button--next {
    right: 20px;
  }
  .react-datepicker__header {
    border: 0;
    background-color: #ffffff;
  }
  .react-datepicker__month {
    margin: 0 12px 32px 12px;
  }
  .react-datepicker__month-container {
    min-height: 361px;
  }

  .react-datepicker__day-name,
  .react-datepicker__day {
    width: 40px;
    height: 40px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    margin: 0;

    color: #212121;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 0;
    outline: none;
  }

  .react-datepicker__day--disabled {
    color: #bdbdbd;
  }
  .react-datepicker__day--today,
  .react-datepicker__day--keyboard-selected {
    background-color: #ffffff;
    border-radius: 50%;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--selected:hover,
  .react-datepicker__day--selected:focus,
  .react-datepicker__day--selected:active {
    color: #ffffff;
    border-radius: 50%;
    background-color: #00d082;
  }
`;

export const DateModalCover = styled.div`
  position: absolute;
  top: -1200px;
  left: -16px;
  width: 360px;
  height: 1550px;
  background-color: ${(props) => (props.show ? 'rgba(0, 0, 0, 0.3)' : '')};
  display: ${(props) => (props.show ? 'block' : 'none')};
  z-index: 1;
`;

export const MyCalendarButton = styled(Button)`
  background: #00d082;
  width: calc(330px - 32px);
  margin-bottom: 40px;
`;
