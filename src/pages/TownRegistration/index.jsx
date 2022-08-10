import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import Footer from '../../layout/Footer';
import {
  RegisteredTown,
  TownRegistrationButton,
  TownRegistrationContainer,
  TownRegistrationList,
  UnRegisteredTown,
} from './style';

function TownRegistration() {
  const navigate = useNavigate();
  const onClickToMain = useCallback(() => {
    navigate('/main');
  }, [navigate]);
  return (
    <TownRegistrationContainer>
      <h1>동네 등록</h1>

      <TownRegistrationList>
        <RegisteredTown>
          마포구 성산동
          <img
            alt="search_cancel"
            src={`${process.env.PUBLIC_URL}/assets/images/search_cancel.png`}
          />
        </RegisteredTown>
        <UnRegisteredTown>
          <img
            alt="search_cancel"
            src={`${process.env.PUBLIC_URL}/assets/images/search_add.png`}
          />
        </UnRegisteredTown>
        <UnRegisteredTown>
          <img
            alt="search_cancel"
            src={`${process.env.PUBLIC_URL}/assets/images/search_add.png`}
          />
        </UnRegisteredTown>
      </TownRegistrationList>
      <TownRegistrationButton onClick={onClickToMain}>
        이웃의 마켓 구경하기
      </TownRegistrationButton>
      <Footer />
    </TownRegistrationContainer>
  );
}

export default TownRegistration;
