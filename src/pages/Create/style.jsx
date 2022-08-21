import styled from 'styled-components';
import Button from '../../components/Button';
import MainContainer from '../../layout/MainContainer';

export const CreatePageMainContainer = styled(MainContainer)`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;

  letter-spacing: 0.15px;

  color: #000000;
`;

export const HeaderTextContainer = styled.div`
  position: relative;
  height: 80px;
  text-align: center;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  color: rgba(0, 0, 0, 0.87);
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }
  img {
    position: absolute;
    width: 14px;
    top: 10px;
    left: 11px;
    cursor: pointer;
    box-sizing: content-box;
    padding: 10px;
  }
`;

export const SelectPhotoContainer = styled.div`
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 11px;
  height: 90px;
  display: flex;
  align-items: center;

  gap: 8px;
  overflow-x: scroll;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  label {
    width: 80px;
    height: 80px;
    border-radius: 4px;

    border: 1px solid #9e9e9e;
    border-radius: 4px;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 6px;
    cursor: pointer;

    img {
      margin-top: 24px;
      width: 22px;
    }

    span {
      font-size: 12px;
      line-height: 16px;

      text-align: right;

      color: #9e9e9e;
    }
    input {
      opacity: 0;
    }
  }
`;
export const SelectPhotoWrapper = styled.div`
  display: flex;
  gap: 8px;

  height: 80px;

  img {
    cursor: pointer;
  }
  div {
    position: relative;
  }

  .delete-img {
    position: absolute;
    bottom: 8px;
    right: 8px;
    width: 12px;
    height: 14px;
  }
  .drag-img {
    position: absolute;
    width: 8px;
    height: 12px;
    top: 34px;
    left: 10px;
  }
`;

export const SelectedImg = styled.img`
  opacity: ${(props) => (props.selected ? 1 : 0.3)};
  width: 80px;
  height: 80px;

  border-radius: 4px;
`;
export const SelectCategory = styled.div`
  margin-top: 15px;
  margin-left: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  gap: 14px;
  position: relative;

  width: 328px;
  height: 48px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;

  color: #212121;
  border: 1px solid #9e9e9e;
  border-radius: 4px;
  cursor: pointer;
  img {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;
export const CategoryLabel = styled.div`
  text-align: start;
`;
export const CategorySelectOptions = styled.div`
  z-index: 10;

  width: 326px;
  position: absolute;
  top: 48px;
  left: 0;
  background: #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3),
    0px 4px 8px 3px rgba(0, 0, 0, 0.15);
  border-radius: 4px;

  overflow: hidden;
  display: ${(props) => (props.show ? 'block' : 'none')};
  padding: 8px 0;
`;
export const CategoryOption = styled.div`
  padding: 14px 16px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  color: #000000;
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const HeadAndTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 16px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  color: #212121;

  label {
    position: relative;
    margin-top: 16px;
  }

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
  textarea {
    margin-top: 4px;
    padding: 12px 16px;
    width: 328px;
    height: 192px;
    background: #f5f5f5;
    border-radius: 4px;
    border: 0;
    resize: none;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    &::placeholder {
      color: #9e9e9e;
    }
  }
`;

export const ErrorChecker = styled.img`
  position: absolute;
  top: 47px;
  right: 38px;
  width: 12.7px;
`;

export const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
  margin-bottom: 16px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  color: #212121;

  label {
    position: relative;
    margin-top: 16px;
  }

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
`;
export const ConfidenceWrapper = styled.div`
  margin-top: 16px;

  border-bottom: 1px solid #e0e0e0;
  label {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #212121;
  }
  input {
    margin-left: 16px;
    margin-right: 11px;

    appearance: none;
    -webkit-appearance: none;
    background-color: #fff;

    font: inherit;
    color: #212121;
    width: 18px;
    height: 18px;
    border: 2px solid #212121;
    border-radius: 3px;

    display: grid;
    place-content: center;

    outline: none;
  }

  input::before {
    content: '';
    width: 0.7em;
    height: 0.7em;
    transform: scale(0);

    box-shadow: inset 1em 1em #212121;
  }
  input:checked::before {
    transform: scale(1) rotate(15deg);

    transform-origin: center center;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }
`;
export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
  margin-bottom: 16px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  color: #212121;

  label {
    position: relative;
    margin-top: 16px;
  }
  span {
    position: absolute;
    top: 40px;
    left: 12px;
    color: ${(props) => (props.ishomemade ? '#E0E0E0' : '#212121')};
  }
  input#price {
    margin-top: 4px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    width: 328px;
    height: 48px;
    padding: 12px 16px;
    padding-left: 28px;
    background: ${(props) => (props.ishomemade ? '#BDBDBD' : '#f5f5f5')};
    border-radius: 4px;
    border: 0;
  }
`;
export const BarterContainer = styled.div`
  margin: 0 16px;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  padding-bottom: 28px;
  border-bottom: 1px solid #e0e0e0;

  div {
    display: flex;
    align-items: center;
  }
`;

export const RadioBox = styled.input`
  width: 16px;
  height: 16px;
  margin-right: 10px;
  margin-left: 2px;
  border-radius: 50%;

  /* 쉬운방법
    accent-color: #212121; */

  /* box shadow 쓰기 */
  appearance: none;
  -webkit-appearance: none;

  border-radius: 50%;

  /* 라디오 박스의 색깔 */
  background: #fff;

  /* box shadow로 만든 가짜 border를 구분해주는 역할 */
  border: 3px solid #fff;

  /* And by creating a box-shadow with no offset and no blur, we have an outer circle */
  box-shadow: 0 0 0 2px ${(props) => (props.ishomemade ? '#BDBDBD' : '#212121')};

  /* 키보드로 포커스 되어도 테두리 안생기게 */
  outline: none;

  &:focus-visible {
    outline-offset: 0;
  }

  &:checked {
    box-shadow: 0 0 0 2px #212121;
    background-color: #212121;
    border-width: 3px;
  }
`;

export const RadioBoxLabel = styled.label`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  color: ${(props) => (props.ishomemade ? '#BDBDBD' : '#212121')};
`;
export const SelectPaticipantContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-left: 16px;
  margin-right: 16px;
  padding: 16px 0;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  color: #212121;

  border-bottom: 1px solid #e0e0e0;

  span {
    margin-bottom: 4px;
  }
  .participant-control-wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .participant-control-wrapper img {
    width: 20px;
    cursor: pointer;
  }
  .participant-control-wrapper div {
    width: 73px;
    height: 48px;
    background: #eeeeee;
    border-radius: 4px;
    padding: 12px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .participant-control-wrapper div > img {
    width: 16px;
    margin-right: 4px;
  }
`;

export const SelectDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 16px;
  margin-bottom: 16px;
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

export const CreateButton = styled(Button)`
  background: #00d082;
  margin-bottom: 135px;
  margin-left: 16px;
  margin-top: 16px;
`;

export const MyCalendarContainer = styled.div`
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
    top: 11px;
    left: 11px;
    padding: 10px;
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
    width: 7.4px;
    height: 12px;
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

export const MyCalendarButton = styled(Button)`
  background: #00d082;
  width: calc(330px - 32px);
  margin-bottom: 40px;
`;
