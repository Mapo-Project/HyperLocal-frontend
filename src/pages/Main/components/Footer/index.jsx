import React from 'react';
import { FooterWrapper } from './style';

const Footer = React.memo(function Footer({
  userData,
  onClickToInterestingPage,
  onClickToMyPage,
}) {
  return (
    <FooterWrapper>
      <div className="menu_container">
        <div className="menu_border">
          <img
            className="menu_photo"
            src={`${process.env.PUBLIC_URL}/assets/images/full_home.png`}
            alt="home"
          />
        </div>
        <div className="menu_text">홈</div>
      </div>
      <div
        className="menu_container"
        role="button"
        onKeyDown={() => {}}
        tabIndex={0}
        onClick={userData ? onClickToInterestingPage : null}
      >
        <div className="menu_border">
          <img
            className="menu_photo"
            src={`${process.env.PUBLIC_URL}/assets/images/empty_heart.png`}
            alt="heart"
          />
        </div>
        <div className="menu_text">관심</div>
      </div>
      <div className="menu_container">
        <div className="menu_border">
          <img
            className="menu_photo"
            src={`${process.env.PUBLIC_URL}/assets/images/chat_bubble.png`}
            alt="talk"
          />
        </div>
        <div className="menu_text">채팅</div>
      </div>
      <div
        className="menu_container"
        role="button"
        onKeyDown={() => {}}
        tabIndex={0}
        onClick={userData ? onClickToMyPage : null}
      >
        <div className="menu_border">
          <img
            className="menu_photo"
            src={`${process.env.PUBLIC_URL}/assets/images/account_circle.png`}
            alt="person"
          />
        </div>
        <div className="menu_text">My</div>
      </div>
    </FooterWrapper>
  );
});

export default Footer;
