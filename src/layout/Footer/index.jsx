import React, { useCallback } from 'react';

import { useNavigate } from 'react-router';
import { FooterWrapper } from './style';

function Footer({ page }) {
  const navigate = useNavigate();

  const onClickToMainPage = useCallback(() => {
    navigate(`/`);
  }, [navigate]);
  // const onClickToInterestingPage = useCallback(() => {
  //   navigate('/interesting');
  // }, [navigate]);

  const onClickToMyPage = useCallback(() => {
    navigate('/mypage');
  }, [navigate]);

  const onClickToChat = useCallback(() => {
    navigate('/chat');
  }, [navigate]);

  return (
    <FooterWrapper>
      {/* main */}
      <div
        className="menu_container"
        role="button"
        onKeyDown={() => {}}
        tabIndex={0}
        onClick={() => {
          if (page !== 'main') onClickToMainPage();
        }}
      >
        <div className="menu_border">
          {page === 'main' ? (
            <img
              className="menu_photo"
              src={`${process.env.PUBLIC_URL}/assets/images/full_home.png`}
              alt="home"
            />
          ) : (
            <img
              className="menu_photo"
              src={`${process.env.PUBLIC_URL}/assets/images/home.png`}
              alt="home"
            />
          )}
        </div>
        <div className="menu_text">홈</div>
      </div>

      {/* 관심 */}
      <div
        className="menu_container"
        role="button"
        onKeyDown={() => {}}
        tabIndex={0}
        // onClick={() => {
        //   if (page !== 'interesting') onClickToInterestingPage();
        // }}
      >
        <div className="menu_border">
          {page === 'interesting' ? (
            <img
              className="menu_photo"
              src={`${process.env.PUBLIC_URL}/assets/images/full_heart.png`}
              alt="home"
            />
          ) : (
            <img
              className="menu_photo"
              src={`${process.env.PUBLIC_URL}/assets/images/empty_heart.png`}
              alt="home"
            />
          )}
        </div>
        <div className="menu_text">관심</div>
      </div>

      {/* 채팅 */}
      <div
        className="menu_container"
        role="button"
        onKeyDown={() => {}}
        tabIndex={0}
        onClick={() => {
          if (page !== 'chat') onClickToChat();
        }}
      >
        <div className="menu_border">
          {page === 'chat' ? (
            <img
              className="menu_photo"
              src={`${process.env.PUBLIC_URL}/assets/images/full_chat_bubble.png`}
              alt="home"
            />
          ) : (
            <img
              className="menu_photo"
              src={`${process.env.PUBLIC_URL}/assets/images/chat_bubble.png`}
              alt="home"
            />
          )}
        </div>
        <div className="menu_text">채팅</div>
      </div>

      {/* 마이페이지 */}
      <div
        className="menu_container"
        role="button"
        onKeyDown={() => {}}
        tabIndex={0}
        onClick={() => {
          if (page !== 'mypage') onClickToMyPage();
        }}
      >
        <div className="menu_border">
          {page === 'mypage' ? (
            <img
              className="menu_photo"
              src={`${process.env.PUBLIC_URL}/assets/images/full_account_circle.png`}
              alt="home"
            />
          ) : (
            <img
              className="menu_photo"
              src={`${process.env.PUBLIC_URL}/assets/images/account_circle.png`}
              alt="home"
            />
          )}
        </div>
        <div className="menu_text">My</div>
      </div>
    </FooterWrapper>
  );
}

export default Footer;
