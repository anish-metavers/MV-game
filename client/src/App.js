import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setLoginUser } from './App/Features/Auth/authSlice';
import { ConfigProvider, theme } from 'antd';

// components
import HomePageContainerComponent from './Components/HomePageContainerComponent/HomePageContainerComponent';
import ProtectedRoute from './utils/ProtectedRoute';

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
import SupportApprovalPage from './Pages/SupportApprovalPage/SupportApprovalPage';
import SupportTeamPage from './Pages/SupportTeamPage/SupportTeamPage';
import SupportUserDetailsPage from './Pages/SupportUserDetailsPage/SupportUserDetailsPage';
import SupportTeamQueryChatsPage from './Pages/SupportTeamQueryChatsPage/SupportTeamQueryChatsPage';

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
                     <Route
                        path="/user-roles"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <UserRolePage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/user-roles/create"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <CreateUserRolePage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/user-roles/:id"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <CreateUserRolePage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/game-currency"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <GameCurrencyPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/game-currency/create"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <CreateGameCurrencyPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/game-currency/:id"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <CreateGameCurrencyPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/games"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <GameListPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/games/create"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <UploadGamesPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/games/:id"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <UploadGamesPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/avatars"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <UserAvatarComponent />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/game-category"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <GameCategoryPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/export/game/data"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <ExportGameDataPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/games/providers"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <GameProvidersPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/games/providers/create"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <CreateNewGameProviderPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/games/providers/:id"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <CreateNewGameProviderPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/provider/games/:id"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <ProvidersGamesPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/game-currency-payment"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <GameCurrencyPaymentMethodsPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/game-currency-payment/create"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <PostGameCurrencyPaymentOptionsPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/game-currency-payment/edit/:id"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <PostGameCurrencyPaymentOptionsPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/notification"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <NotificationPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/notification/create"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <PushNotificationPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/notification/edit/:id"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <PushNotificationPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/fiat-deposit-payments"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <FiatPaymentsPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/order/:orderId"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <SingleTransactionInfoPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/payment-fields"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <PaymentFiledsPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/payment-fields/create"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <CreatePaymentFieldsPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/payment-fields/edit/:id"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <CreatePaymentFieldsPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/fiat/withdraw/transaction"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <FiatWithdrawTransactionPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/spin-draw"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <SpinDrawPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/create-spin-items"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <CreateSpinItemPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/spin/edit/:id"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <CreateSpinItemPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/upload-images"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <UploadImagesPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/lottery-draw"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <LotteryDrawPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/lottery-draw/edit/:id"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <EditLotteryPollPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/users"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <UserPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/players-accounts/create"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <PlayersAccountsPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/players-accounts/edit/:id"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <PlayersAccountsPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/player-status/show/:id"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <UserStatusPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/faq-category"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <FaqCategoryPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/faq-category/create"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <FaqCategorySinglePage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/faq-category/edit/:id"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <FaqCategorySinglePage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/faq-posts"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <FaqPostsPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/faq-post/create"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <FaqSinglePostPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/faq-post/edit/:id"
                        element={
                           <ProtectedRoute allowedRoles={['admin']}>
                              <FaqSinglePostPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/support/approval"
                        element={
                           <ProtectedRoute allowedRoles={['admin', 'support']}>
                              <SupportApprovalPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/live/support"
                        element={
                           <ProtectedRoute allowedRoles={['support']}>
                              <LiveChatPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/support/team"
                        element={
                           <ProtectedRoute allowedRoles={['admin', 'subAdmin']}>
                              <SupportTeamPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/support/team/:id"
                        element={
                           <ProtectedRoute allowedRoles={['admin', 'subAdmin']}>
                              <SupportUserDetailsPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/support/team/feedback/:queryId"
                        element={
                           <ProtectedRoute allowedRoles={['admin', 'subAdmin']}>
                              <SupportTeamQueryChatsPage />
                           </ProtectedRoute>
                        }
                     />
                  </Route>
                  <Route path="/dashboard/auth/login" element={<LoginPage />} />
               </Routes>
            </ThemeProvider>
         </ConfigProvider>
      </div>
   );
}

export default App;
