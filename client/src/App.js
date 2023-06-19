import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setLoginUser } from './App/Features/Auth/authSlice';
import { ConfigProvider, theme } from 'antd';

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
import NotificationPage from './Pages/NotificationPage/NotificationPage';
import PushNotificationPage from './Pages/PushNotificationPage/PushNotificationPage';
import FiatPaymentsPage from './Pages/FiatPaymentsPage/FiatPaymentsPage';
import SingleTransactionInfoPage from './Pages/SingleTransactionInfoPage/SingleTransactionInfoPage';
import PaymentFiledsPage from './Pages/PaymentFiledsPage/PaymentFiledsPage';
import CreatePaymentFieldsPage from './Pages/CreatePaymentFieldsPage/CreatePaymentFieldsPage';
import FiatWithdrawTransactionPage from './Pages/FiatWithdrawTransactionPage/FiatWithdrawTransactionPage';
import SpinDrawPage from './Pages/SpinDrawPage/SpinDrawPage';
import CreateSpinItemPage from './Pages/CreateSpinItemPage/CreateSpinItemPage';
import UploadImagesPage from './Pages/UploadImagesPage/UploadImagesPage';
import LotteryDrawPage from './Pages/LotteryDrawPage/LotteryDrawPage';
import EditLotteryPollPage from './Pages/EditLotteryPollPage/EditLotteryPollPage';
import PlayersAccountsPage from './Pages/PlayersAccountsPage/PlayersAccountsPage';
import UserStatusPage from './Pages/UserStatusPage/UserStatusPage';
import FaqCategoryPage from './Pages/FaqCategoryPage/FaqCategoryPage';
import FaqCategorySinglePage from './Pages/FaqCategorySinglePage/FaqCategorySinglePage';
import FaqPostsPage from './Pages/FaqPostsPage/FaqPostsPage';
import FaqSinglePostPage from './Pages/FaqSinglePostPage/FaqSinglePostPage';
import LiveChatPage from './Pages/LiveChatPage/LiveChatPage';

const darkTheme = createTheme({
   palette: {
      mode: 'dark',
   },
});

function App() {
   const [cookie] = useCookies();
   const dispatch = useDispatch();
   const navigation = useNavigate();
   const { darkAlgorithm } = theme;

   useEffect(() => {
      if (!!cookie && !!cookie?._mv_games_auth && cookie?._mv_games_auth?._id) {
         dispatch(setLoginUser({ auth: cookie?._mv_games_auth }));
      } else {
         navigation('/dashboard/auth/login');
      }
   }, []);

   return (
      <div className="App">
         <ConfigProvider
            theme={{
               algorithm: darkAlgorithm,
            }}
         >
            <ThemeProvider theme={darkTheme}>
               <Routes>
                  <Route path="/" element={<HomePage />}>
                     <Route path="/" element={<HomePageContainerComponent />} />
                     <Route path="/user-roles" element={<UserRolePage />} />
                     <Route path="/user-roles/create" element={<CreateUserRolePage />} />
                     <Route path="/user-roles/:id" element={<CreateUserRolePage />} />
                     <Route path="/game-currency" element={<GameCurrencyPage />} />
                     <Route path="/game-currency/create" element={<CreateGameCurrencyPage />} />
                     <Route path="/game-currency/:id" element={<CreateGameCurrencyPage />} />
                     <Route path="/games" element={<GameListPage />} />
                     <Route path="/games/create" element={<UploadGamesPage />} />
                     <Route path="/games/:id" element={<UploadGamesPage />} />
                     <Route path="/avatars" element={<UserAvatarComponent />} />
                     <Route path="/game-category" element={<GameCategoryPage />} />
                     <Route path="/export/game/data" element={<ExportGameDataPage />} />
                     <Route path="/games/providers" element={<GameProvidersPage />} />
                     <Route path="/games/providers/create" element={<CreateNewGameProviderPage />} />
                     <Route path="/games/providers/:id" element={<CreateNewGameProviderPage />} />
                     <Route path="/provider/games/:id" element={<ProvidersGamesPage />} />
                     <Route path="/game-currency-payment" element={<GameCurrencyPaymentMethodsPage />} />
                     <Route path="/game-currency-payment/create" element={<PostGameCurrencyPaymentOptionsPage />} />
                     <Route path="/game-currency-payment/edit/:id" element={<PostGameCurrencyPaymentOptionsPage />} />
                     <Route path="/notification" element={<NotificationPage />} />
                     <Route path="/notification/create" element={<PushNotificationPage />} />
                     <Route path="/notification/edit/:id" element={<PushNotificationPage />} />
                     <Route path="/fiat-deposit-payments" element={<FiatPaymentsPage />} />
                     <Route path="/order/:orderId" element={<SingleTransactionInfoPage />} />
                     <Route path="/payment-fields" element={<PaymentFiledsPage />} />
                     <Route path="/payment-fields/create" element={<CreatePaymentFieldsPage />} />
                     <Route path="/payment-fields/edit/:id" element={<CreatePaymentFieldsPage />} />
                     <Route path="/fiat/withdraw/transaction" element={<FiatWithdrawTransactionPage />} />
                     <Route path="/spin-draw" element={<SpinDrawPage />} />
                     <Route path="/create-spin-items" element={<CreateSpinItemPage />} />
                     <Route path="/spin/edit/:id" element={<CreateSpinItemPage />} />
                     <Route path="/upload-images" element={<UploadImagesPage />} />
                     <Route path="/lottery-draw" element={<LotteryDrawPage />} />
                     <Route path="/lottery-draw/edit/:id" element={<EditLotteryPollPage />} />
                     <Route path="/users" element={<UserPage />} />
                     <Route path="/players-accounts/create" element={<PlayersAccountsPage />} />
                     <Route path="/players-accounts/edit/:id" element={<PlayersAccountsPage />} />
                     <Route path="/player-status/show/:id" element={<UserStatusPage />} />
                     <Route path="/faq-category" element={<FaqCategoryPage />} />
                     <Route path="/faq-category/create" element={<FaqCategorySinglePage />} />
                     <Route path="/faq-category/edit/:id" element={<FaqCategorySinglePage />} />
                     <Route path="/faq-posts" element={<FaqPostsPage />} />
                     <Route path="/faq-post/create" element={<FaqSinglePostPage />} />
                     <Route path="/faq-post/edit/:id" element={<FaqSinglePostPage />} />
                     <Route path="/live/support" element={<LiveChatPage />} />
                  </Route>
                  <Route path="/dashboard/auth/login" element={<LoginPage />} />
               </Routes>
            </ThemeProvider>
         </ConfigProvider>
      </div>
   );
}

export default App;
