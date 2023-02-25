import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setLoginUser } from './App/Features/Auth/authSlice';

// components
import HomePageContainerComponent from './Components/HomePageContainerComponent/HomePageContainerComponent';

// pages
import LoginPage from './Pages/LoginPage/LoginPage';
import HomePage from './Pages/HomePage/HomePage';
import UserRolePage from './Pages/UserRolePage/UserRolePage';
import CreateUserRolePage from './Pages/CreateUserRolePage/CreateUserRolePage';
import GameCurrencyPage from './Pages/GameCurrencyPage/GameCurrencyPage';
import CreateGameCurrencyPage from './Pages/CreateGameCurrencyPage/CreateGameCurrencyPage';
import GameListPage from './Pages/GameListPage/GameListPage';
import UploadGamesPage from './Pages/UploadGamesPage/UploadGamesPage';
import UserAvatarComponent from './Pages/UserAvatarComponent/UserAvatarComponent';

function App() {
   const [cookie] = useCookies();
   const dispatch = useDispatch();
   const navigation = useNavigate();

   useEffect(() => {
      if (cookie && cookie?._mv_games_auth) {
         dispatch(setLoginUser({ auth: cookie?._mv_games_auth }));
      } else {
         navigation('/dashboard/auth/login');
      }
   }, []);

   return (
      <div className="App">
         <Routes>
            <Route path="/" element={<HomePage />}>
               <Route path="/" element={<HomePageContainerComponent />} />
               <Route path="/user-roles" element={<UserRolePage />} />
               <Route
                  path="/user-roles/create"
                  element={<CreateUserRolePage />}
               />
               <Route path="/user-roles/:id" element={<CreateUserRolePage />} />
               <Route path="/game-currency" element={<GameCurrencyPage />} />
               <Route
                  path="/game-currency/create"
                  element={<CreateGameCurrencyPage />}
               />
               <Route
                  path="/game-currency/:id"
                  element={<CreateGameCurrencyPage />}
               />
               <Route path="/games" element={<GameListPage />} />
               <Route path="/games/create" element={<UploadGamesPage />} />
               <Route path="/games/:id" element={<UploadGamesPage />} />
               <Route path="/avatars" element={<UserAvatarComponent />} />
            </Route>
            <Route path="/dashboard/auth/login" element={<LoginPage />} />
         </Routes>
      </div>
   );
}

export default App;
