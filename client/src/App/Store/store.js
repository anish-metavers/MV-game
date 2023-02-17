import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../Features/Auth/authSlice';
import adminSlice from '../Features/Admin/adminSlice';

const store = configureStore({
   reducer: {
      auth: authSlice,
      admin: adminSlice,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoreActions: ['admin/getAllUserRoles'],
         },
      }),
});

export default store;
