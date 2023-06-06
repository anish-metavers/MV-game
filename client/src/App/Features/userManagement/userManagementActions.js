import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../Services/AxiosInstance';

export const getUserSingleAccount = createAsyncThunk(
   'userManagement/getUserSingleAccount',
   async ({ userId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/userManagement/get-single-user-account?userId=${userId}`);
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const updatePlayerAccount = createAsyncThunk('userManagement/updatePlayerAccount', async (data, { rejectWithValue }) => {
   try {
      const response = await axiosInstance.patch('/userManagement/update-player-account', data, { validateStatus: false });
      return response;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const createPlayerAccount = createAsyncThunk('userManagement/createPlayerAccount', async (data, { rejectWithValue }) => {
   try {
      const response = await axiosInstance.post('userManagement/create-player-account', data, { validateStatus: false });
      return response;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const setPlayerAccountPassword = createAsyncThunk(
   'userManagement/setPlayerAccountPassword',
   async (data, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.patch('/userManagement/set-account-password', data);
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);
