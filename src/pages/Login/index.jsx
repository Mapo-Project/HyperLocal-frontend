import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import { LoginContainer, LoginButton } from './style';

function Login() {
  const navigate = useNavigate();
  const onClickToSignup = useCallback(() => {
    navigate('/signup');
  }, [navigate]);
  return (
    <LoginContainer>
      <Header />
      <h1>로그인</h1>
      <LoginButton domain="kakao" onClick={onClickToSignup}>
        <div>
          <img
            alt="kakao_logo"
            src={`${process.env.PUBLIC_URL}/assets/images/login_kakao.png`}
          />
          <span>카카오 로그인</span>
        </div>
      </LoginButton>
      <LoginButton domain="naver" onClick={onClickToSignup}>
        <div>
          <img
            alt="kakao_logo"
            src={`${process.env.PUBLIC_URL}/assets/images/login_naver.png`}
          />
          <span>네이버 로그인</span>
        </div>
      </LoginButton>
      <Footer />
    </LoginContainer>
  );
}

export default Login;
