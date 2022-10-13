import React, { useCallback } from 'react';
import useSWR from 'swr';

import { Navigate, useNavigate } from 'react-router';
import fetcherAccessToken from '../../utils/fetcherAccessToken';
import axiosInstance from '../../utils/axiosConfig';

import {
  MyPageMainContainer,
  MyPageProfileBox,
  ProfileFooter,
  ProfileHeader,
  ProfileWrapper,
} from './style';
import Footer from '../../layout/Footer';

function MyPage() {
  // 유저데이터
  const { data: userData, mutate: userMutate } = useSWR(
    `/user/profile/select`,
    fetcherAccessToken,
    { dedupingInterval: 500 },
  );

  const { data: townData } = useSWR(
    `/user/neighborhood/select`,
    fetcherAccessToken,
    { dedupingInterval: 500 },
  );
  const navigate = useNavigate();

  /**
   * 로그아웃
   * 성공 시 로컬스토리지 비우고 swr데이터(유저 데이터) 초기화한다.
   */
  const Logout = useCallback(() => {
    // setLogout(false);
    axiosInstance
      .get(`/user/logout`)
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
    navigate('/');
  }, [userMutate, navigate]);

  /**
   * 회원탈퇴
   * 성공 시 로컬스토리지 비우고 swr데이터(유저 데이터) 초기화한다.
   */
  const withdrawal = useCallback(() => {
    axiosInstance
      .delete(`/user/withdrawal`)
      .then((response) => {
        console.log(response);
        // 탈퇴 후 로컬스토리지 비우고 swr데이터들을 초기화한다.
        window.localStorage.clear();
        userMutate();
      })
      .catch((error) => {
        console.log(error);
      });
    navigate('/');
  }, [userMutate, navigate]);

  if (!userData) {
    return <Navigate replace to="/" />;
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
          {'>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'}
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

      <button style={{ marginLeft: '28px' }} type="submit" onClick={withdrawal}>
        회원탈퇴
      </button>
      <Footer page="mypage" />
    </MyPageMainContainer>
  );
}

export default MyPage;
