import React from 'react';
import HeaderContainer from './styles';

function Header() {
  return (
    <HeaderContainer>
      <div className="header_button">
        <div className="square" />
        <div className="circle" />
        <div className="triangle-down" />
      </div>
    </HeaderContainer>
  );
}

export default Header;
