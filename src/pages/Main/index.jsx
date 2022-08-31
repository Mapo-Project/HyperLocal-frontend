import React, { useMemo, useEffect, useCallback } from 'react';

import { useNavigate } from 'react-router';
import useSWR from 'swr';

import { MainPageContainer, MainScrollbars, MainShowNoData } from './style';

import fetcherAccessToken from '../../utils/fetcherAccessToken';
import FindTown from './components/FindTown';
import MainButton from './components/MainButton';
import Footer from './components/Footer';
import MainItems from './components/MainItemsWrapper';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function Main({
  currentSelectedTown,
  currentTown,
  onSelectCurrentTown,
  mainData,
  onClickHeart,
}) {
  const { data: userData } = useSWR(
    `${BACKEND_URL}/user/profile/select`,
    fetcherAccessToken,
  );

  const onSortByLocation = useMemo(
    () =>
      mainData.filter((data) =>
        data.itemsTownLocation?.includes(currentSelectedTown),
      ),
    [mainData, currentSelectedTown],
  );

  const onSortByDate = useMemo(
    () =>
      onSortByLocation.sort((data1, data2) => {
        return data2.itemRegistDate - data1.itemRegistDate;
      }),
    [onSortByLocation],
  );

  const navigate = useNavigate();

  const onSelectAdditionalTown = useCallback(() => {
    if (userData) {
      if (currentTown.length === 3) {
        navigate('/town/regist');
      } else {
        navigate('/town');
      }
    } else {
      navigate('/login');
    }
  }, [currentTown.length, navigate, userData]);

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
    console.log({ userData, currentSelectedTown, currentTown });
  });

  // swr로 데이터를 불러오는 중에는 로딩중 창을 띄운다.
  if (userData === undefined) {
    return <div>로딩중</div>;
  }

  return (
    <MainPageContainer>
      <FindTown
        userData={userData}
        onClickToLoginPage={onClickToLoginPage}
        onClickToMyPage={onClickToMyPage}
        currentTown={currentTown}
        currentSelectedTown={currentSelectedTown}
        onSelectAdditionalTown={onSelectAdditionalTown}
        onSelectCurrentTown={onSelectCurrentTown}
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
        {onSortByDate.length ? (
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
