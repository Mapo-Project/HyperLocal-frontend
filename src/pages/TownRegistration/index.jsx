import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
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
      <Header />
      <h1>동네 등록</h1>

      <TownRegistrationList>
        <RegisteredTown>
          마포구 성산동
          <div />
        </RegisteredTown>
        <UnRegisteredTown>
          <div />
        </UnRegisteredTown>
        <UnRegisteredTown>
          <div />
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
