import React from 'react';
import Header from '../../layout/Header';
import { LoginContainer, LoginButton } from './style';

function Login() {
  return (
    <LoginContainer>
      <Header />
      <h1>로그인</h1>
      <LoginButton domain="kakao">
        <div>
          <img
            alt="kakao_logo"
            src={`${process.env.PUBLIC_URL}/assets/images/login_kakao.png`}
          />
          <span>카카오 로그인</span>
        </div>
      </LoginButton>
      <LoginButton domain="naver">
        <div>
          <img
            alt="kakao_logo"
            src={`${process.env.PUBLIC_URL}/assets/images/login_naver.png`}
          />
          <span>네이버 로그인</span>
        </div>
      </LoginButton>
    </LoginContainer>
  );
}

export default Login;
