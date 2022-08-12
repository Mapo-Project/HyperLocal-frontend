import React from 'react';
import { Navigate } from 'react-router';

import Footer from '../../layout/Footer';
import { LoginContainer, LoginButton } from './style';

function Login() {
  const KAKAO_AUTH_URL = process.env.REACT_APP_KAKAO_AUTH_URL;
  const NAVER_AUTH_URL = process.env.REACT_APP_NAVER_AUTH_URL;

  /*
  verify === N, 가입은 되었지만 추가회원정보가 없으면 signup으로
  */

  if (window.localStorage.verify === 'N') {
    return <Navigate to="/signup" replace />;
  }

  return (
    <LoginContainer>
      <h1>로그인</h1>
      <a href={KAKAO_AUTH_URL}>
        <LoginButton domain="kakao">
          <div>
            <img
              alt="kakao_logo"
              src={`${process.env.PUBLIC_URL}/assets/images/login_kakao.png`}
            />
            <span>카카오 로그인</span>
          </div>
        </LoginButton>
      </a>
      <a href={NAVER_AUTH_URL}>
        <LoginButton domain="naver">
          <div>
            <img
              alt="kakao_logo"
              src={`${process.env.PUBLIC_URL}/assets/images/login_naver.png`}
            />
            <span>네이버 로그인</span>
          </div>
        </LoginButton>
      </a>
      <Footer />
    </LoginContainer>
  );
}

export default Login;
