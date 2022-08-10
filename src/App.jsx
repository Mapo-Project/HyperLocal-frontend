import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import TownRegistration from './pages/TownRegistration';
import TownSearch from './pages/TownSearch';
import ResetStyle from './utils/ResetStyle';
import SocialLoginCallback from './pages/SocialLoginCallback';
import Main from './pages/Main';

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
          <Route path="/town/search" element={<TownSearch />} />
          <Route path="/town/registration" element={<TownRegistration />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
