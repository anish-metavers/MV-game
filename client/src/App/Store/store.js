import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../Features/Auth/authSlice';

const store = configureStore({
   reducer: {
      auth: authSlice,
   },
});

export default store;
