import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Main from './pages/Main';
import SignUp from './pages/SignUp';
import TownRegistration from './pages/TownRegistration';
import TownSearch from './pages/TownSearch';
import ResetStyle from './utils/ResetStyle';
import SocialLoginCallback from './pages/SocialLoginCallback';

function App() {
  return (
    <>
      <ResetStyle />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/oauth/social/callback"
            element={<SocialLoginCallback />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/town/search" element={<TownSearch />} />
          <Route path="/town/registration" element={<TownRegistration />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
