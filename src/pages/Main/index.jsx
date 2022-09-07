import React, { useEffect, useCallback } from 'react';

import { useNavigate } from 'react-router';
import useSWR from 'swr';

import { MainPageContainer, MainScrollbars, MainShowNoData } from './style';

import fetcherAccessToken from '../../utils/fetcherAccessToken';
import FindTown from './components/FindTown';
import MainButton from './components/MainButton';
import Footer from '../../layout/Footer';
import MainItems from './components/MainItemsWrapper';
import axiosInstance from '../../utils/axiosConfig';

function Main({ mainData, nonMemberTown }) {
  const { data: userData } = useSWR(
    `/user/profile/select`,
    fetcherAccessToken,
    { dedupingInterval: 500 },
  );

  const { data: townData, mutate: townMutate } = useSWR(
    `/user/neighborhood/select`,
    fetcherAccessToken,
    { dedupingInterval: 500 },
  );

  const navigate = useNavigate();

  // 동네 기본값이 성산동(nonMemberTown)
  useEffect(() => {
    if (townData?.count === '0') {
      axiosInstance
        .post(`/user/neighborhood/registration/${nonMemberTown}`, null)

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
      : mainData.filter((data) =>
          data.itemsTownLocation.includes(nonMemberTown),
        );

  const onSortByDate = onSortByLocation.sort((data1, data2) => {
    return data2.itemRegistDate - data1.itemRegistDate;
  });

  // 페이지 변경
  const onSelectAdditionalTown = useCallback(() => {
    navigate('/town/regist');
  }, [navigate]);

  const onClickToCreatePage = useCallback(() => {
    navigate('/create');
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
    console.log({ userData, townData, onSortByLocation, nonMemberTown });
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
        nonMemberTown={nonMemberTown}
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

      <MainButton
        onClickToCreatePage={onClickToCreatePage}
        userData={userData}
        onClickToLoginPage={onClickToLoginPage}
      />

      <Footer page="main" />
    </MainPageContainer>
  );
}

export default Main;
