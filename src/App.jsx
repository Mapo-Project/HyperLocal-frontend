import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React, { lazy, Suspense, useCallback, useRef, useState } from 'react';
// import loadable from '@loadable/component';
// import pMinDelay from 'p-min-delay';
import ResetStyle from './utils/ResetStyle';
import { mainItemsData } from './utils/dummyData/mainPageData';
// import Loading from './components/Loading';

// code spliting

// lazy
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const TownRegistration = lazy(() => import('./pages/TownRegistration'));
const SocialLoginCallback = lazy(() => import('./pages/SocialLoginCallback'));
const Main = lazy(() => import('./pages/Main'));
const Create = lazy(() => import('./pages/Create'));
const Interesting = lazy(() => import('./pages/Interesting'));
const Detail = lazy(() => import('./pages/Detail'));
const TownSearch = lazy(() => import('./pages/TownSearch'));
const MyPage = lazy(() => import('./pages/MyPage'));
const Chat = lazy(() => import('./pages/Chat'));
const Test = lazy(() => import('./pages/Test'));
const CategorySearch = lazy(() => import('./pages/Main/components/TagSearch'));

// loadable
// const Login = loadable(() => import('./pages/Login'));
// const SignUp = loadable(() => import('./pages/SignUp'));
// const TownRegistration = loadable(() => import('./pages/TownRegistration'));
// const SocialLoginCallback = loadable(() =>
//   import('./pages/SocialLoginCallback'),
// );
// const Main = loadable(() => import('./pages/Main'));
// const Create = loadable(() => import('./pages/Create'));
// const Interesting = loadable(() => import('./pages/Interesting'));
// const Detail = loadable(() => import('./pages/Detail'));
// const TownSearch = loadable(() => import('./pages/TownSearch'));
// const MyPage = loadable(() => import('./pages/MyPage'));
// const Chat = loadable(() => import('./pages/Chat'));
// const Test = loadable(() => import('./pages/Test'));
// const CategorySearch = loadable(() =>
//   import('./pages/Main/components/TagSearch'),
// );

// loading 추가한 것
// const Login = loadable(() => pMinDelay(import('./pages/Login'), 500), {
//   fallback: <Loading />,
// });
// const SignUp = loadable(() => pMinDelay(import('./pages/SignUp'), 500), {
//   fallback: <Loading />,
// });
// const TownRegistration = loadable(
//   () => pMinDelay(import('./pages/TownRegistration'), 500),
//   {
//     fallback: <Loading />,
//   },
// );
// const SocialLoginCallback = loadable(
//   () => pMinDelay(import('./pages/SocialLoginCallback'), 500),
//   {
//     fallback: <Loading />,
//   },
// );
// const Main = loadable(() => pMinDelay(import('./pages/Main'), 500), {
//   fallback: <Loading />,
// });
// const Create = loadable(() => pMinDelay(import('./pages/Create'), 500), {
//   fallback: <Loading />,
// });
// const Interesting = loadable(
//   () => pMinDelay(import('./pages/Interesting'), 500),
//   {
//     fallback: <Loading />,
//   },
// );
// const Detail = loadable(() => pMinDelay(import('./pages/Detail'), 500), {
//   fallback: <Loading />,
// });
// const TownSearch = loadable(
//   () => pMinDelay(import('./pages/TownSearch'), 500),
//   {
//     fallback: <Loading />,
//   },
// );
// const MyPage = loadable(() => pMinDelay(import('./pages/MyPage'), 500), {
//   fallback: <Loading />,
// });
// const Chat = loadable(() => pMinDelay(import('./pages/Chat'), 500), {
//   fallback: <Loading />,
// });
// const Test = loadable(() => import('./pages/Test'), {
//   fallback: <Loading />,
// });
// const CategorySearch = loadable(
//   () => pMinDelay(import('./pages/Main/components/TagSearch'), 500),
//   { fallback: <Loading /> },
// );

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
        <Suspense>
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
              element={
                <Detail mainData={mainData} onClickHeart={onClickHeart} />
              }
            />
            <Route path="/test" element={<Test />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
