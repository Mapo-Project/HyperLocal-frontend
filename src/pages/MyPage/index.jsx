import React, { useCallback, useState } from 'react';

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
import Footer from '../../layout/Footer';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function MyPage() {
  // 유저데이터
  const { data: userData, mutate: userMutate } = useSWR(
    `${BACKEND_URL}/user/profile/select`,
    fetcherAccessToken,
  );

  const { data: townData } = useSWR(
    `${BACKEND_URL}/user/neighborhood/select`,
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

  // swr로 데이터를 불러오는 중에는 로딩중 창을 띄운다.
  if (userData === undefined) {
    return <div>로딩중</div>;
  }

  return (
    <MyPageMainContainer>
      <MyPageProfileBox>
        <ProfileHeader>
          <h1>MY</h1>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/settings.png`}
            alt="setting"
          />
        </ProfileHeader>
        <ProfileWrapper>
          {userData ? (
            <img alt="profile_img" src={userData.data.profileImg} />
          ) : (
            <img
              alt="dummy_img"
              src={`${process.env.PUBLIC_URL}/assets/images/main_thumbnail.png`}
            />
          )}
          <div>
            <h1>
              <b>아이디</b> {userData ? userData.data.nickname : '-'}
            </h1>

            <h1>
              <b>내 동네</b>{' '}
              {userData
                ? townData?.data.filter((town) => town.choiceYN === 'Y')[0]
                    .neighborhoodName
                : '-'}
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
      <h2>email : {userData ? userData.data.email : '-'}</h2>
      <h2>전화번호 : {userData ? userData.data.phoneNum : '-'}</h2>
      {logout ? <h2>로그인 중</h2> : <h2>로그인해라</h2>}

      <button style={{ marginLeft: '28px' }} type="submit" onClick={withdrawal}>
        회원탈퇴
      </button>
      <Footer page="mypage" />
    </MyPageMainContainer>
  );
}

export default MyPage;
