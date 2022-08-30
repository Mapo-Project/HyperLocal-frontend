import React from 'react';
import { MainButtonWrapper } from './style';

const MainButton = React.memo(function MainButton({ onClickToCreatePage }) {
  return (
    <MainButtonWrapper onClick={onClickToCreatePage}>
      {/* <MainButton onClick={userData ? onClickToCreatePage : null}> */}
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/main_add.png`}
        alt="pencil"
      />
    </MainButtonWrapper>
  );
});

export default MainButton;
