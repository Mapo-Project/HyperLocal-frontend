import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import TownRegistration from './pages/TownRegistration';
import ResetStyle from './utils/ResetStyle';
import SocialLoginCallback from './pages/SocialLoginCallback';
import Main from './pages/Main';
import Create from './pages/Create';
import MyPage from './pages/MyPage';
import Interesting from './pages/Interesting';
import Detail from './pages/Detail';
import TownSearch from './pages/TownSearch';

function App() {
  const [currentTown, setCurrentTown] = useState([]);
  const [currentSelectedTown, setCurrentSelectedTown] = useState('');
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
