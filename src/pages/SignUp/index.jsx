import React, { useCallback, useRef, useState } from 'react';

import useSWR from 'swr';
import axios from 'axios';
import { Navigate } from 'react-router';
import useInput from '../../hooks/useInput';

import {
  Error,
  ErrorChecker,
  Input,
  InputWrapper,
  Label,
  SignupButton,
  SignupButtonDisable,
  SignUpContainer,
  SignupForm,
} from './style';
import fetcherAccessToken from '../../utils/fetcherAccessToken';
import axiosInstance from '../../utils/axiosConfig';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const IdInput = React.memo(function IdInput({
  onChangeNickname,
  nickname,
  doubleCheck,
  setIsNicknameDoubleCheck,
  isWrongId,
  isNicknameDoubleCheck,
  idSpaceTypeCheck,
  idMinCheck,
  idMaxCheck,
}) {
  return (
    <InputWrapper>
      <Label>
        <span>아이디</span>
        <Input
          type="text"
          id="nickname"
          name="nickname"
          placeholder="아이디"
          onChange={onChangeNickname}
          value={nickname}
          onBlur={doubleCheck}
          onKeyUp={() => {
            setIsNicknameDoubleCheck(false);
            isWrongId();
          }}
        />
      </Label>
      <Error>
        {nickname && isNicknameDoubleCheck
          ? '사용 중인 아이디입니다.'
          : nickname && !idSpaceTypeCheck
          ? '띄어쓰기없이 한글, 영어, 숫자로 작성해주세요.'
          : nickname && !idMinCheck
          ? '최소 2자 이상으로 작성해주세요.'
          : nickname && !idMaxCheck
          ? '최대 12자까지 작성할 수 있어요.'
          : ''}
      </Error>
      <ErrorChecker
        draggable="false"
        src={
          !isNicknameDoubleCheck && idMaxCheck
            ? `${process.env.PUBLIC_URL}/assets/images/input_check.png`
            : `${process.env.PUBLIC_URL}/assets/images/input_uncheck.png`
        }
      />
    </InputWrapper>
  );
});

const PhoneInput = React.memo(function PhoneInput({
  phoneNumRef,
  changePhoneNum,
  onChangePhoneNum,
  phoneNum,
  isWrongPhone,
  phoneNumCheck,
}) {
  const [PhoneErrorMessage, setPhoneErrorMessage] = useState(false);

  return (
    <InputWrapper>
      <Label>
        <span>전화번호</span>
        <Input
          ref={phoneNumRef}
          type="text"
          id="phoneNum"
          name="phoneNum"
          placeholder="000-0000-0000"
          onChange={(e) => {
            changePhoneNum();
            onChangePhoneNum(e);
          }}
          value={phoneNum}
          onBlur={() => {
            setPhoneErrorMessage(true);
            isWrongPhone();
          }}
          onFocus={() => {
            setPhoneErrorMessage(false);
          }}
          maxLength="13"
        />
      </Label>

      <Error>
        {/* 전화번호가 있고, 전화번호가 유효하지 않을때 출력 */}
        {PhoneErrorMessage && !phoneNumCheck
          ? '유효하지 않은 전화번호입니다.'
          : ''}
      </Error>

      <ErrorChecker
        draggable="false"
        src={
          // 전화번호가 있고, 전화번호가 유효하면 체크
          phoneNum && phoneNumCheck
            ? `${process.env.PUBLIC_URL}/assets/images/input_check.png`
            : `${process.env.PUBLIC_URL}/assets/images/input_uncheck.png`
        }
      />
    </InputWrapper>
  );
});
const EmailInput = React.memo(function EmailInput({
  onChangeEmail,
  email,
  isWrongEmail,
  EmailCheck,
}) {
  const [EmailErrorMessage, setEmailErrorMessage] = useState(false);
  return (
    <InputWrapper>
      <Label>
        <span>E-mail</span>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="E-mail"
          onChange={onChangeEmail}
          value={email}
          onBlur={() => {
            setEmailErrorMessage(true);
            isWrongEmail();
          }}
          onFocus={() => {
            setEmailErrorMessage(false);
          }}
        />
      </Label>

      <Error>
        {/* 이메일이 있고 이메일이 유효하지 않을때 출력 */}
        {EmailErrorMessage && !EmailCheck ? '사용할 수 없는 이메일입니다.' : ''}
      </Error>

      <ErrorChecker
        draggable="false"
        src={
          EmailCheck
            ? `${process.env.PUBLIC_URL}/assets/images/input_check.png`
            : `${process.env.PUBLIC_URL}/assets/images/input_uncheck.png`
        }
      />
    </InputWrapper>
  );
});
function SignUp() {
  /*
  새로고침 시 마다 userAccessData 사라지니 아예 로컬,세션 스토리지에 저장?
  세션스토리지에서 유저 데이터 불러옴
  지속적으로 유저데이터를 받아와야하므로 swr를 이용
*/

  // const { data: userAccessData } = useSWR('localStorage', getAccessData);

  const { data: userData, mutate: userMutate } = useSWR(
    `/user/profile/select`,
    fetcherAccessToken,
  );

  // 닉네임
  const [nickname, setNickname, onChangeNickname] = useInput('');
  // 전화번호
  const [phoneNum, setPhoneNum, onChangePhoneNum] = useInput('');
  // 이메일
  const [email, setEmail, onChangeEmail] = useInput('');

  // const [idCheck, setIdCheck] = useState(false);
  const [idSpaceTypeCheck, setIdSpaceTypeCheck] = useState(false);
  const [idMinCheck, setIdMinCheck] = useState(false);
  const [idMaxCheck, setIdMaxCheck] = useState(false);

  const [phoneNumCheck, setPhoneNumCheck] = useState(false);
  const [EmailCheck, setEmailCheck] = useState(false);

  // 닉네임 중복체크 메시지
  const [isNicknameDoubleCheck, setIsNicknameDoubleCheck] = useState(false);

  // 회원가입 에러 메시지
  const [joinError, setJoinError] = useState('');

  /**
   * profile validation
   *
   * ID(nickname)
   * 사용 중인 아이디입니다.(중복체크) - onBlur로 확인
   * onKeyUp으로 전부 확인
   * 띄어쓰기없이 한글, 영어, 숫자로 작성해주세요.
   * 최소 2자 이상으로 작성해주세요.
   * 최대 12자까지 작성할 수 있어요.
   * 모든 조건이 완료되었을때 초록색 체크
   *
   * phoneNum
   * 010-1111-1111
   * 숫자만 가능
   * 자동으로 - 추가됨
   * 유효하지 않은 전화번호입니다.
   * 모든 조건이 완료되었을때 초록색 체크
   *
   * Email
   * ee@cc.com 정도
   * 사용할 수 없는 이메일입니다.
   * 모든 조건이 완료되었을때 초록색 체크
   *
   * 셋 다 조건이 완료되었을때 회원가입 버튼 활성화
   */

  // nickname(id) validation
  const isIdSpace = (IdValue) => /\s/g.test(IdValue);
  const isIdSpecial = (IdValue) => /[^가-힣a-zA-Z0-9]/gi.test(IdValue);
  const isIdType = (IdValue) => /^[가-힣a-zA-Z0-9]/.test(IdValue);
  const isIdMin = (IdValue) => /^[가-힣a-zA-Z0-9]{2}/.test(IdValue);
  const isIdMax = (IdValue) => /^[가-힣a-zA-Z0-9]{2,12}$/.test(IdValue);

  const isWrongId = useCallback(() => {
    !isIdSpace(nickname) && !isIdSpecial(nickname) && isIdType(nickname)
      ? setIdSpaceTypeCheck(true)
      : setIdSpaceTypeCheck(false);

    !isIdSpace(nickname) && !isIdSpecial(nickname) && isIdMin(nickname)
      ? setIdMinCheck(true)
      : setIdMinCheck(false);

    !isIdSpace(nickname) && !isIdSpecial(nickname) && isIdMax(nickname)
      ? setIdMaxCheck(true)
      : setIdMaxCheck(false);
  }, [nickname]);

  // 전화번호 validation
  const phoneNumRef = useRef();

  const changePhoneNum = useCallback(() => {
    const value = phoneNumRef.current.value.replace(/\D+/g, '');
    const numberLength = 11;
    let result = '';

    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 3:
          result += '-';
          break;
        case 7:
          result += '-';
          break;
        default:
          break;
      }
      result += value[i];
    }
    phoneNumRef.current.value = result;
  }, []);

  const isWrongPhone = useCallback(() => {
    phoneNumRef.current.value.length === 13
      ? setPhoneNumCheck(true)
      : setPhoneNumCheck(false);
  }, []);

  // 이메일 validation - https://emailregex.com/
  const isEmail = (emailValue) =>
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      emailValue,
    );

  const isWrongEmail = useCallback(() => {
    isEmail(email) ? setEmailCheck(true) : setEmailCheck(false);
  }, [email]);

  // 회원가입
  const onSubmitSignUp = useCallback(
    (e) => {
      e.preventDefault();
      axiosInstance
        .post(`/user/profile/add`, {
          nickname,
          phoneNum,
          email,
        })
        .then((response) => {
          console.log(response);
          // setJoinError(response.data.message);
          userMutate();

          window.localStorage.verify = 'Y';

          // alert('회원가입되었습니다'); // 추후 삭제
        })
        .catch((error) => {
          console.log(error);
          alert(error.response?.data.message);
          setJoinError(error.response?.data.message);
        });
      setNickname('');
      setPhoneNum('');
      setEmail('');
    },
    [nickname, phoneNum, setPhoneNum, setEmail, email, userMutate, setNickname],
  );

  // 중복체크 - get방식 , API : /user/duplicate/nickname/{nickname}
  const doubleCheck = useCallback(() => {
    axios
      .get(`${BACKEND_URL}/user/duplicate/nickname/${nickname}`)
      .then((response) => {
        // console.log(response);

        if (response.data.duplicate === 'duplicate') {
          setIsNicknameDoubleCheck(true);
        } else {
          setIsNicknameDoubleCheck(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [nickname]);

  if (userData === undefined) {
    return <div>로딩중</div>;
  }

  if (userData) {
    // console.log(userData);
    return <Navigate to="/" replace />;
  }

  // // 소셜로그인 안하면 url로 접근 시 리다이렉트
  // if (!localStorage?.verify) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <SignUpContainer>
      <h1>프로필 설정</h1>
      <IdInput
        onChangeNickname={onChangeNickname}
        nickname={nickname}
        doubleCheck={doubleCheck}
        setIsNicknameDoubleCheck={setIsNicknameDoubleCheck}
        isWrongId={isWrongId}
        isNicknameDoubleCheck={isNicknameDoubleCheck}
        idSpaceTypeCheck={idSpaceTypeCheck}
        idMinCheck={idMinCheck}
        idMaxCheck={idMaxCheck}
      />
      <PhoneInput
        phoneNumRef={phoneNumRef}
        changePhoneNum={changePhoneNum}
        onChangePhoneNum={onChangePhoneNum}
        phoneNum={phoneNum}
        isWrongPhone={isWrongPhone}
        phoneNumCheck={phoneNumCheck}
      />
      <EmailInput
        onChangeEmail={onChangeEmail}
        email={email}
        isWrongEmail={isWrongEmail}
        EmailCheck={EmailCheck}
      />
      <SignupForm onSubmit={onSubmitSignUp}>
        {!isNicknameDoubleCheck && idMaxCheck && phoneNumCheck && EmailCheck ? (
          <SignupButton>확인</SignupButton>
        ) : (
          <SignupButtonDisable>확인</SignupButtonDisable>
        )}
      </SignupForm>
      {joinError}
    </SignUpContainer>
  );
}

export default SignUp;
