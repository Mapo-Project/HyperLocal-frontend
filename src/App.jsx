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
import CategorySearch from './pages/Main/components/TagSearch';

function App() {
  const [mainData, setMaindata] = useState([...mainItemsData]);
  // new Data
  const dataId = useRef(12);

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
            element={<Main mainData={mainData} onClickHeart={onClickHeart} />}
          />
          <Route path="/search" element={<CategorySearch />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/oauth/social/callback"
            element={<SocialLoginCallback />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/town" element={<TownSearch />} />
          <Route path="/town/regist" element={<TownRegistration />} />
          <Route
            path="/create"
            element={<Create dataId={dataId} setMaindata={setMaindata} />}
          />
          <Route
            path="/interesting"
            element={<Interesting mainData={mainData} />}
          />
          <Route path="/mypage" element={<MyPage />} />
          <Route
            path="/detail/:currentItemId"
            element={<Detail mainData={mainData} onClickHeart={onClickHeart} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
