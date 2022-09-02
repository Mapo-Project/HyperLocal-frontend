import React from 'react';
import { MainButtonWrapper } from './style';

const MainButton = React.memo(function MainButton({
  onClickToCreatePage,
  userData,
  onClickToLoginPage,
}) {
  return (
    // <MainButtonWrapper onClick={onClickToCreatePage}>
    <MainButtonWrapper
      onClick={userData ? onClickToCreatePage : onClickToLoginPage}
    >
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/main_add.png`}
        alt="pencil"
      />
    </MainButtonWrapper>
  );
});

export default MainButton;
