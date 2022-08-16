import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router';

import useSWR from 'swr';

import axios from 'axios';
import fetcherAccessToken from '../../utils/fetcherAccessToken';
import {
  MyPageMainContainer,
  MyPageProfileBox,
  ProfileFooter,
  ProfileHeader,
  ProfileWrapper,
} from './style';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function MyPage({ currentSelectedTown, currentTown }) {
  // 유저데이터
  const { data: userData, mutate: userMutate } = useSWR(
    `${BACKEND_URL}/user/profile/select`,
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
      .get(`${BACKEND_URL}/user/logout`, {
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
      .delete(`${BACKEND_URL}/user/withdrawal`, {
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

  console.log({ currentSelectedTown, currentTown });
  // swr로 데이터를 불러오는 중에는 로딩중 창을 띄운다.
  if (userData === undefined) {
    return <div>로딩중</div>;
  }

  // 유저데이터가 없으면 첫 페이지로 이동
  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  return (
    <MyPageMainContainer>
      <MyPageProfileBox>
        <ProfileHeader>
          <h1>MY</h1>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/mypage_settings.png`}
            alt="setting"
          />
        </ProfileHeader>
        <ProfileWrapper>
          <img alt="profile_img" src={userData.data.profileImg} />
          <div>
            <h1>
              <b>아이디</b> {userData.data.nickname}
            </h1>

            <h1>
              <b>내 동네</b> {currentSelectedTown}
            </h1>
          </div>
        </ProfileWrapper>
        <ProfileFooter>
          등록 : 2022년 8월 4일 {'>>>>>>>>>>>>>>>>>>>>>>>>>'}
        </ProfileFooter>
      </MyPageProfileBox>
      <h2>나의 식빵 지수</h2>
      <h2>나의 마켓</h2>
      <h2>이웃의 마켓</h2>
      <h2>관심 키워드 #식품 #반려식물</h2>
      <h2>고객센터</h2>
      <button style={{ marginLeft: '28px' }} type="submit" onClick={Logout}>
        로그아웃
      </button>

      <h2>---------- 개발용 ---------</h2>
      <h2>email : {userData.data.email}</h2>
      <h2>전화번호 : {userData.data.phoneNum}</h2>
      {logout ? <h2>로그인 중</h2> : <h2>로그인해라</h2>}

      <button style={{ marginLeft: '28px' }} type="submit" onClick={withdrawal}>
        회원탈퇴
      </button>
    </MyPageMainContainer>
  );
}

export default MyPage;
