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
import Chat from './pages/Chat';

// 비회원의 초기 동네 설정

if (!sessionStorage.nonMemberTown) {
  sessionStorage.setItem('nonMemberTown', '성산동');
}

function App() {
  const [mainData, setMaindata] = useState([...mainItemsData]);

  const [nonMemberTown, setNonMemberTown] = useState(
    sessionStorage.nonMemberTown,
  );

  const [tempTown, setTempTown] = useState('');

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
            element={
              <Main
                mainData={mainData}
                onClickHeart={onClickHeart}
                nonMemberTown={nonMemberTown}
              />
            }
          />
          <Route path="/search" element={<CategorySearch />} />
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
                nonMemberTown={nonMemberTown}
                setNonMemberTown={setNonMemberTown}
                tempTown={tempTown}
              />
            }
          />
          <Route
            path="/town/regist"
            element={
              <TownRegistration
                nonMemberTown={nonMemberTown}
                setTempTown={setTempTown}
              />
            }
          />
          <Route
            path="/create"
            element={<Create dataId={dataId} setMaindata={setMaindata} />}
          />
          <Route
            path="/interesting"
            element={<Interesting mainData={mainData} />}
          />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/chat" element={<Chat />} />
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
