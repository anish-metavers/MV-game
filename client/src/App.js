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
import UserPage from './Pages/UserPage/UserPage';
import GameCategoryPage from './Pages/GameCategoryPage/GameCategoryPage';
import ExportGameDataPage from './Pages/ExportGameDataPage/ExportGameDataPage';
import GameProvidersPage from './Pages/GameProvidersPage/GameProvidersPage';
import CreateNewGameProviderPage from './Pages/CreateNewGameProviderPage/CreateNewGameProviderPage';
import ProvidersGamesPage from './Pages/ProvidersGamesPage/ProvidersGamesPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GameCurrencyPaymentMethodsPage from './Pages/GameCurrencyPaymentMethodsPage/GameCurrencyPaymentMethodsPage';
import PostGameCurrencyPaymentOptionsPage from './Pages/PostGameCurrencyPaymentOptionsPage/PostGameCurrencyPaymentOptionsPage';

const darkTheme = createTheme({
   palette: {
      mode: 'dark',
   },
});

function App() {
   const [cookie] = useCookies();
   const dispatch = useDispatch();
   const navigation = useNavigate();

   useEffect(() => {
      if (!!cookie && !!cookie?._mv_games_auth && cookie?._mv_games_auth?._id) {
         dispatch(setLoginUser({ auth: cookie?._mv_games_auth }));
      } else {
         navigation('/dashboard/auth/login');
      }
   }, []);

   return (
      <div className="App">
         <ThemeProvider theme={darkTheme}>
            <Routes>
               <Route path="/" element={<HomePage />}>
                  <Route path="/" element={<HomePageContainerComponent />} />
                  <Route path="/user-roles" element={<UserRolePage />} />
                  <Route
                     path="/user-roles/create"
                     element={<CreateUserRolePage />}
                  />
                  <Route
                     path="/user-roles/:id"
                     element={<CreateUserRolePage />}
                  />
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
                  <Route path="/users" element={<UserPage />} />
                  <Route path="/game-category" element={<GameCategoryPage />} />
                  <Route
                     path="/export/game/data"
                     element={<ExportGameDataPage />}
                  />
                  <Route
                     path="/games/providers"
                     element={<GameProvidersPage />}
                  />
                  <Route
                     path="/games/providers/create"
                     element={<CreateNewGameProviderPage />}
                  />
                  <Route
                     path="/games/providers/:id"
                     element={<CreateNewGameProviderPage />}
                  />
                  <Route
                     path="/provider/games/:id"
                     element={<ProvidersGamesPage />}
                  />
                  <Route
                     path="/game-currency-payment"
                     element={<GameCurrencyPaymentMethodsPage />}
                  />
                  <Route
                     path="/game-currency-payment/create"
                     element={<PostGameCurrencyPaymentOptionsPage />}
                  />
                  <Route
                     path="/game-currency-payment/edit/:id"
                     element={<PostGameCurrencyPaymentOptionsPage />}
                  />
               </Route>
               <Route path="/dashboard/auth/login" element={<LoginPage />} />
            </Routes>
         </ThemeProvider>
      </div>
   );
}

export default App;
