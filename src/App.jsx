import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React, { useCallback, useRef, useState } from 'react';
import loadable from '@loadable/component';

import ResetStyle from './utils/ResetStyle';
import { mainItemsData } from './utils/dummyData/mainPageData';

// code spliting
const Login = loadable(() => import('./pages/Login'), {
  fallback: <div>로딩중...</div>,
});
const SignUp = loadable(() => import('./pages/SignUp'), {
  fallback: <div>로딩중...</div>,
});
const TownRegistration = loadable(() => import('./pages/TownRegistration'), {
  fallback: <div>로딩중...</div>,
});
const SocialLoginCallback = loadable(
  () => import('./pages/SocialLoginCallback'),
  {
    fallback: <div>로딩중...</div>,
  },
);
const Main = loadable(() => import('./pages/Main'), {
  fallback: <div>로딩중...</div>,
});
const Create = loadable(() => import('./pages/Create'), {
  fallback: <div>로딩중...</div>,
});
const Interesting = loadable(() => import('./pages/Interesting'), {
  fallback: <div>로딩중...</div>,
});
const Detail = loadable(() => import('./pages/Detail'), {
  fallback: <div>로딩중...</div>,
});
const TownSearch = loadable(() => import('./pages/TownSearch'), {
  fallback: <div>로딩중...</div>,
});
const MyPage = loadable(() => import('./pages/MyPage'), {
  fallback: <div>로딩중...</div>,
});
const Chat = loadable(() => import('./pages/Chat'), {
  fallback: <div>로딩중...</div>,
});
const Test = loadable(() => import('./pages/Test'), {
  fallback: <div>로딩중...</div>,
});
const CategorySearch = loadable(
  () => import('./pages/Main/components/TagSearch'),
  { fallback: <div>로딩중...</div> },
);

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
                setTempTown={setTempTown}
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
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
