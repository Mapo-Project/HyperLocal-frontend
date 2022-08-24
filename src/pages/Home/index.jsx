import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import Button from '../../components/Button';
import Footer from '../../layout/Footer';
import HomeContainer from './style';

function Home() {
  const navigate = useNavigate();
  const onClickToLogin = useCallback(() => {
    navigate('/login', { replace: false });
  }, [navigate]);
  return (
    <HomeContainer>
      <h1>저랑 같이 살래요?</h1>
      <img
        alt="main_logo"
        src={`${process.env.PUBLIC_URL}/assets/images/main_logo_01.png`}
      />
      <p>
        우리네 이웃과
        <br />
        같이 사고 함께 나누는
        <br />
        공동구매 플랫폼
      </p>
      <Button onClick={onClickToLogin}>
        <span>시작하기</span>
      </Button>
      <Footer />
    </HomeContainer>
  );
}

export default Home;
