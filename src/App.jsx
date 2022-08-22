import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React, { useCallback, useRef, useState } from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import TownRegistration from './pages/TownRegistration';
import ResetStyle from './utils/ResetStyle';
import SocialLoginCallback from './pages/SocialLoginCallback';
import Main from './pages/Main';
import Create from './pages/Create';
import Interesting from './pages/Interesting';
import Detail from './pages/Detail';
import TownSearch from './pages/TownSearch';
import MyPage from './pages/MyPage';
import { mainItemsData } from './utils/dummyData/mainPageData';

function App() {
  const [currentTown, setCurrentTown] = useState([]);
  const [currentSelectedTown, setCurrentSelectedTown] = useState('성산동');
  const townId = useRef(0);
  const onSelectTown = (newTown) => {
    setCurrentTown((currentVal) => [
      ...currentVal,
      { town: newTown, townId: townId.current++ },
    ]);
  };
  const onDeleteTown = (id) => {
    setCurrentTown((currentVal) => [
      ...currentVal.filter((townValue) => id !== townValue.townId),
    ]);
  };

  const onSelectCurrentTown = (curTown) => {
    setCurrentSelectedTown(curTown);
  };

  const [mainData, setMaindata] = useState([...mainItemsData]);
  // new Data
  const dataId = useRef(20);

  // const onDetailItem = useCallback((id) => {
  //   setMaindata((prov) => prov.filter((data) => `${data.itemId}` === id));
  // }, []);

  // 하트
  const onClickHeart = useCallback((id) => {
    setMaindata((prov) =>
      prov.map((data) =>
        data.itemId === id
          ? {
              ...data,
              isHeartEmpty: !data.isHeartEmpty,

              itemsHeartCount: !data.isHeartEmpty
                ? data.itemsHeartCount + 1
                : data.itemsHeartCount - 1,
            }
          : data,
      ),
    );
  }, []);

  return (
    <>
      <ResetStyle />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                currentSelectedTown={currentSelectedTown}
                currentTown={currentTown}
                onSelectCurrentTown={onSelectCurrentTown}
                mainData={mainData}
                setMaindata={setMaindata}
                onClickHeart={onClickHeart}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/oauth/social/callback"
            element={<SocialLoginCallback />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/town"
            element={
              <TownSearch
                currentTown={currentTown}
                onSelectTown={onSelectTown}
                onSelectCurrentTown={onSelectCurrentTown}
              />
            }
          />
          <Route
            path="/town/regist"
            element={
              <TownRegistration
                currentTown={currentTown}
                onDeleteTown={onDeleteTown}
                currentSelectedTown={currentSelectedTown}
                onSelectCurrentTown={onSelectCurrentTown}
              />
            }
          />
          <Route
            path="/create"
            element={
              <Create
                currentSelectedTown={currentSelectedTown}
                dataId={dataId}
                setMaindata={setMaindata}
              />
            }
          />
          <Route path="/interesting" element={<Interesting />} />
          <Route
            path="/mypage"
            element={
              <MyPage
                currentSelectedTown={currentSelectedTown}
                currentTown={currentTown}
                onSelectCurrentTown={onSelectCurrentTown}
              />
            }
          />
          <Route
            path="/detail/:currentItemId"
            element={
              <Detail
                mainData={mainData}
                // onDetailItem={onDetailItem}
                onClickHeart={onClickHeart}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
