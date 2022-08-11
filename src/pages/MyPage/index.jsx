import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router';

import useSWR from 'swr';

import axios from 'axios';
import fetcherAccessToken from '../../utils/fetcherAccessToken';
import { MyPageMainContainer } from './style';

function MyPage() {
  // 유저데이터
  const { data: userData, mutate: userMutate } = useSWR(
    'http://172.30.1.5:7979/user/profile/select',
    fetcherAccessToken,
  );

  const [logout, setLogout] = useState(true);

  /**
   * 로그아웃
   * 성공 시 로컬스토리지 비우고 swr데이터(유저 데이터) 초기화한다.
   */
  const Logout = useCallback(() => {
    setLogout(false);
    axios
      .get('http://172.30.1.5:7979/user/logout', {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        // setLogout(true);

        // 로그아웃 후 로컬스토리지 비우고 swr데이터들을 초기화한다.
        window.localStorage.clear();
        userMutate();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setLogout, userMutate]);

  /**
   * 회원탈퇴
   * 성공 시 로컬스토리지 비우고 swr데이터(유저 데이터) 초기화한다.
   */
  const withdrawal = useCallback(() => {
    axios
      .delete('http://172.30.1.5:7979/user/withdrawal', {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        // 탈퇴 후 로컬스토리지 비우고 swr데이터들을 초기화한다.
        window.localStorage.clear();
        userMutate();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userMutate]);

  // swr로 데이터를 불러오는 중에는 로딩중 창을 띄운다.
  if (userData === undefined) {
    return <div>로딩중</div>;
  }

  // 유저데이터가 없으면 첫 페이지로 이동
  if (!userData) {
    return <Navigate to="/" replace />;
  }

  return (
    <MyPageMainContainer>
      <h1>마이페이지</h1>
      <button type="submit" onClick={Logout}>
        로그아웃
      </button>
      <button type="submit" onClick={withdrawal}>
        회원탈퇴
      </button>
      {logout ? <div>로그인 중</div> : <div>로그인해라</div>}
      <h1>nickname : {userData.data.nickname}</h1>
      <h1>email : {userData.data.email}</h1>
      <h1>전화번호 : {userData.data.phoneNum}</h1>
      <img alt="profile_img" src={userData.data.profileImg} />
    </MyPageMainContainer>
  );
}

export default MyPage;
