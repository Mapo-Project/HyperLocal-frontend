import React from 'react';
import Footer from '../../layout/Footer';
import { ChatPageMainContainer } from './style';

function Chat() {
  return (
    <ChatPageMainContainer>
      <h1>채팅</h1>
      <p>이웃의 마켓에 채팅으로 참여해보세요.</p>
      <Footer page="chat" />
    </ChatPageMainContainer>
  );
}

export default Chat;
