import React, { useCallback, useRef, useState } from 'react';
import { Navigate } from 'react-router';
import useSWR from 'swr';
import axios from 'axios';
import useInput from '../../hooks/useInput';
import Footer from '../../layout/Footer';
// import getAccessData from '../../utils/getAccessData';
import {
  Error,
  ErrorChecker,
  Input,
  InputWrapper,
  Label,
  SignupButton,
  SignUpContainer,
  SignupForm,
} from './style';
import fetcherAccessToken from '../../utils/fetcherAccessToken';

function SignUp() {
  /*
  새로고침 시 마다 userAccessData 사라지니 아예 로컬,세션 스토리지에 저장?
  세션스토리지에서 유저 데이터 불러옴
  지속적으로 유저데이터를 받아와야하므로 swr를 이용
*/

  // const { data: userAccessData } = useSWR('localStorage', getAccessData);

  const { data: userData, mutate: userMutate } = useSWR(
    'http://172.30.1.5:7979/user/profile/select',
    fetcherAccessToken,
  );

  // 닉네임
  const [nickname, setNickname, onChangeNickname] = useInput('');
  // 전화번호
  const [phoneNum, setPhoneNum, onChangePhoneNum] = useInput('');
  // 이메일
  const [email, setEmail, onChangeEmail] = useInput('');

  const [idCheck, setIdCheck] = useState(false);
  const [phoneNumCheck, setPhoneNumCheck] = useState(false);
  const [EmailCheck, setEmailCheck] = useState(false);

  // 닉네임 중복체크 메시지
  const [isNicknameDoubleCheck, setIsNicknameDoubleCheck] = useState('');

  // 회원가입 에러 메시지
  const [joinError, setJoinError] = useState('');

  // 전화번호 validation
  const phoneNumRef = useRef();

  const changePhoneNum = () => {
    const value = phoneNumRef.current.value.replace(/\D+/g, '');
    const numberLength = 11;
    let result = '';
    // eslint-disable-next-line no-plusplus
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
  };

  const isWrongPhone = useCallback(() => {
    // eslint-disable-next-line no-unused-expressions
    console.log(phoneNumRef.current.value.length);
    // eslint-disable-next-line no-unused-expressions
    phoneNumRef.current.value.length === 13
      ? setPhoneNumCheck(true)
      : setPhoneNumCheck(false);
  }, []);

  /**
   * profile validation
   *
   * ID(nickname)
   * 사용 중인 아이디입니다.(중복체크)
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

  // 회원가입
  const onSubmitSignUp = useCallback(
    (e) => {
      e.preventDefault();

      axios
        .post(
          'http://172.30.1.5:7979/user/profile/add',
          {
            nickname,
            phoneNum,
            email,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.accessToken}`,
            },
          },
        )
        .then((response) => {
          console.log(response);
          // setJoinError(response.data.message);
          userMutate();

          window.localStorage.verify = 'Y';

          alert('회원가입되었습니다'); // 추후 삭제
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
      .get(`http://172.30.1.5:7979/user/  duplicate/nickname/${nickname}`)
      .then((response) => {
        // console.log(response);
        // eslint-disable-next-line no-unused-expressions
        response.data.duplicate === 'duplicate'
          ? setIsNicknameDoubleCheck('사용 중인 아이디입니다.')
          : setIsNicknameDoubleCheck('');
      })
      .catch((error) => {
        console.log(error);
      });
  }, [nickname]);

  const onClickToIdChecked = useCallback(() => {
    setIdCheck(!idCheck);
  }, [idCheck]);
  const onClickToEmailChecked = useCallback(() => {
    setEmailCheck(!EmailCheck);
  }, [EmailCheck]);

  if (userData === undefined) {
    return <div>로딩중</div>;
  }

  if (userData) {
    // console.log(userData);
    return <Navigate to="/" replace />;
  }

  return (
    <SignUpContainer>
      <h1>프로필 설정</h1>
      <SignupForm onSubmit={onSubmitSignUp}>
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
            />
          </Label>
          <Error>{isNicknameDoubleCheck}</Error>
          <ErrorChecker
            onClick={onClickToIdChecked}
            src={
              idCheck
                ? `${process.env.PUBLIC_URL}/assets/images/signup_check.png`
                : `${process.env.PUBLIC_URL}/assets/images/signup_uncheck.png`
            }
          />
        </InputWrapper>
        <InputWrapper>
          <Label>
            <span>전화번호</span>
            <Input
              ref={phoneNumRef}
              type="text"
              id="phoneNum"
              name="phoneNum"
              placeholder="전화번호"
              onChange={(e) => {
                changePhoneNum();
                onChangePhoneNum(e);
              }}
              value={phoneNum}
              onBlur={isWrongPhone}
            />
          </Label>

          <Error>
            {/* 전화번호가 있고, 전화번호가 유효하지 않을때 출력 */}
            {phoneNum && !phoneNumCheck ? '유효하지 않은 전화번호입니다.' : ''}
            <span>{phoneNumCheck ? '사용가능한 전화번호 입니다' : ''}</span>
          </Error>
          <ErrorChecker
            src={
              phoneNumCheck
                ? `${process.env.PUBLIC_URL}/assets/images/signup_check.png`
                : `${process.env.PUBLIC_URL}/assets/images/signup_uncheck.png`
            }
          />
        </InputWrapper>
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
            />
          </Label>
          <Error>.</Error>
          <ErrorChecker
            onClick={onClickToEmailChecked}
            src={
              EmailCheck
                ? `${process.env.PUBLIC_URL}/assets/images/signup_check.png`
                : `${process.env.PUBLIC_URL}/assets/images/signup_uncheck.png`
            }
          />
        </InputWrapper>
        <SignupButton>확인</SignupButton>
      </SignupForm>
      {joinError}
      <Footer />
    </SignUpContainer>
  );
}

export default SignUp;
