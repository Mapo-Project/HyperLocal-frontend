import React, { useCallback, useState } from 'react';
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

  // 회원가입
  const onSubmitSignUp = useCallback(
    (e) => {
      e.preventDefault();

      // setJoinError('');
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

          alert('회원가입되었습니다');
        })
        .catch((error) => {
          console.log(error);
          alert(error.response?.data.message);
          // setJoinError(error.response?.data.message);
        });
      setNickname('');
      setPhoneNum('');
      setEmail('');
    },
    [
      nickname,
      phoneNum,
      setPhoneNum,
      setEmail,
      email,
      userMutate,
      // setJoinError,
      setNickname,
      // userAccessData?.accessToken,
    ],
  );

  const onClickToIdChecked = useCallback(() => {
    setIdCheck(!idCheck);
  }, [idCheck]);
  const onClickToPhoneNumChecked = useCallback(() => {
    setPhoneNumCheck(!phoneNumCheck);
  }, [phoneNumCheck]);
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
            />
          </Label>
          <Error>한글, 영문, 숫자로</Error>
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
              type="text"
              id="phoneNum"
              name="phoneNum"
              placeholder="전화번호"
              onChange={onChangePhoneNum}
              value={phoneNum}
            />
          </Label>

          <Error>유효하지 않은 전화번호입니다.</Error>
          <ErrorChecker
            onClick={onClickToPhoneNumChecked}
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
          <Error>사용할 수 없는 이메일입니다.</Error>
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
      <Footer />
    </SignUpContainer>
  );
}

export default SignUp;
