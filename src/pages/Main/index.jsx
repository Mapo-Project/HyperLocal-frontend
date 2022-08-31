import React, { useEffect, useCallback } from 'react';

import { useNavigate } from 'react-router';
import useSWR from 'swr';

import axios from 'axios';
import { MainPageContainer, MainScrollbars, MainShowNoData } from './style';

import fetcherAccessToken from '../../utils/fetcherAccessToken';
import FindTown from './components/FindTown';
import MainButton from './components/MainButton';
import Footer from './components/Footer';
import MainItems from './components/MainItemsWrapper';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function Main({ mainData, onClickHeart }) {
  const { data: userData } = useSWR(
    `${BACKEND_URL}/user/profile/select`,
    fetcherAccessToken,
  );

  const { data: townData, mutate: townMutate } = useSWR(
    `${BACKEND_URL}/user/neighborhood/select`,
    fetcherAccessToken,
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (townData?.count === '0') {
      axios
        .post(
          `${BACKEND_URL}/user/neighborhood/registration/${'성산동'}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${localStorage.accessToken}`,
            },
          },
        )

        .then((res) => {
          console.log(res.data);
          townMutate();
        })
        .catch((error) => {
          console.log(error.response.data.message);
          alert(error.response.data.message);
          return new Error(`요청이 실패했습니다.`);
        });
    }
  });

  // 상태로 두고 변경해야 하는걸까?
  const onSortByLocation =
    userData && townData && townData?.count !== '0'
      ? mainData.filter((data) =>
          data.itemsTownLocation.includes(
            // 현재 동네
            townData?.data
              .filter((towns) => towns.choiceYN === 'Y')[0]
              // 현재 동네에서 앞 세글자
              ?.neighborhoodName.slice(0, 3)
              .includes('동')
              ? townData?.data
                  .filter((towns) => towns.choiceYN === 'Y')[0]
                  ?.neighborhoodName.slice(0, 2)
              : townData?.data
                  .filter((towns) => towns.choiceYN === 'Y')[0]
                  ?.neighborhoodName.slice(0, 3),
          ),
        )
      : mainData.filter((data) => data.itemsTownLocation.includes('성산동'));

  const onSortByDate = onSortByLocation.sort((data1, data2) => {
    return data2.itemRegistDate - data1.itemRegistDate;
  });

  const onSelectAdditionalTown = useCallback(() => {
    if (userData) {
      navigate('/town/regist');
    } else {
      navigate('/login');
    }
  }, [navigate, userData]);

  const onClickToCreatePage = useCallback(() => {
    navigate('/create');
  }, [navigate]);

  const onClickToInterestingPage = useCallback(() => {
    navigate('/interesting');
  }, [navigate]);

  // const onClickToCategorySearchPage = () => {
  //   navigate('/search');
  // };

  const onClickToDetailPage = useCallback(
    (id) => {
      navigate(`/detail/${id}`);
    },
    [navigate],
  );
  const onClickToLoginPage = useCallback(() => {
    navigate('/login');
  }, [navigate]);
  const onClickToMyPage = useCallback(() => {
    navigate('/mypage');
  }, [navigate]);

  useEffect(() => {
    console.log({ userData, townData, onSortByLocation });
  });

  // swr로 데이터를 불러오는 중에는 로딩중 창을 띄운다.
  if (userData === undefined && !townData) {
    return <div>로딩중</div>;
  }

  return (
    <MainPageContainer>
      <FindTown
        userData={userData}
        onClickToLoginPage={onClickToLoginPage}
        onClickToMyPage={onClickToMyPage}
        onSelectAdditionalTown={onSelectAdditionalTown}
      />

      <MainScrollbars
        autoHide
        style={{
          height: '665px',
          position: 'absolute',
          top: '54px',
          zIndex: 0,
          backgroundColor: '#f5f5f5',
        }}
      >
        {onSortByDate?.length ? (
          <>
            <img
              className="main_banner"
              src={`${process.env.PUBLIC_URL}/assets/images/main_banner.jpg`}
              alt="banner"
            />
            {onSortByDate?.map((data) => (
              <MainItems
                key={data.itemId}
                {...data}
                onClickHeart={onClickHeart}
                onClickToDetailPage={onClickToDetailPage}
              />
            ))}
          </>
        ) : (
          <MainShowNoData>
            <h1>
              찾고있는 공동구매가 없나요?
              <br /> 직접 마켓을 열어 공동구매를
              <br /> 함께 할 이웃을 찾아보세요!
            </h1>
            <img
              alt="no_data_img"
              src={`${process.env.PUBLIC_URL}/assets/images/search.png`}
            />
          </MainShowNoData>
        )}
      </MainScrollbars>

      <MainButton onClickToCreatePage={onClickToCreatePage} />
      <Footer
        onClickToInterestingPage={onClickToInterestingPage}
        onClickToMyPage={onClickToMyPage}
        userData={userData}
      />
    </MainPageContainer>
  );
}

export default Main;
