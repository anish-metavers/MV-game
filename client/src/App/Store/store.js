import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../Features/Auth/authSlice';
import adminSlice from '../Features/Admin/adminSlice';
import adminToolsSlice from '../Features/Tools/adminToolsSlice';
import gameProvidersSlice from '../Features/GameProviders/GameProvidersSlice';
import GameSlice from '../Features/Games/GameSlice';
import paymentSlice from '../Features/Payment/paymentSlice';

const store = configureStore({
   reducer: {
      auth: authSlice,
      admin: adminSlice,
      adminTools: adminToolsSlice,
      gameProviders: gameProvidersSlice,
      games: GameSlice,
      payment: paymentSlice,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoreActions: ['admin/getAllUserRoles'],
         },
      }),
});

export default store;
