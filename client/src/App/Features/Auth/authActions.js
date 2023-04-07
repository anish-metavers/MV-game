import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const axiosAuthInstance = axios.create({
   baseURL: process.env.REACT_APP_CLIENT_BACKEND_URL,
   headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
   },
});

export const login = createAsyncThunk(
   'auth/login',
   async ({ email, password }, { rejectWithValue }) => {
      try {
         const loginUserInfo = await axiosAuthInstance.get(
            `/auth/signIn?email=${email}&password=${password}`
         );

         if (
            loginUserInfo?.data &&
            loginUserInfo?.data?.accessToken &&
            loginUserInfo?.data?.refreshToken &&
            loginUserInfo?.data?.user
         ) {
            document.cookie = `_mv_games_access_token=${loginUserInfo?.data?.accessToken}`;
            document.cookie = `_mv_games_refresh_token=${loginUserInfo?.data?.refreshToken}`;
            document.cookie = `_mv_games_auth=${JSON.stringify(
               loginUserInfo?.data?.user
            )}`;
         }
         return loginUserInfo;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);
