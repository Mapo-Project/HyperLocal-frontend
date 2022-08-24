import React from 'react';
import { Navigate } from 'react-router';

function SocialLoginCallback() {
  const currrentUrlQuery = window.location.search; // 현재 url query
  const params = new URLSearchParams(currrentUrlQuery); // URLSearchParams 객체
  const userAccessDataJson = params.get('user'); // user 인스턴스 - json type data
  const userAccessData = JSON.parse(userAccessDataJson); // user 객체

  // 회원 추가정보가 있는 상태인지 Y,N으로 설명
  const { verify } = userAccessData;
  const { accessToken } = userAccessData;
  const { refreshToken } = userAccessData;

  // 로컬 스토리지에 userData 저장
  window.localStorage.setItem('verify', verify);
  window.localStorage.setItem('accessToken', accessToken);
  window.localStorage.setItem('refreshToken', refreshToken);

  if (verify === 'Y') {
    return <Navigate to="/" replace />;
  }
  if (verify === 'N') {
    return <Navigate to="/signup" replace />;
  }
  return <div>카카오,네이버 콜백 받아오자</div>;
}

export default SocialLoginCallback;
