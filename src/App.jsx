import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import TownRegistration from './pages/TownRegistration';
import TownSearch from './pages/TownSearch';
import ResetStyle from './utils/ResetStyle';
import SocialLoginCallback from './pages/SocialLoginCallback';
import Main from './pages/Main';
import Create from './pages/Create';
import MyPage from './pages/MyPage';
import Interesting from './pages/Interesting';
import Detail from './pages/Detail';

function App() {
  return (
    <>
      <ResetStyle />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/oauth/social/callback"
            element={<SocialLoginCallback />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/town" element={<TownSearch />} />
          <Route path="/town/regist" element={<TownRegistration />} />
          <Route path="/create" element={<Create />} />
          <Route path="/interesting" element={<Interesting />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
