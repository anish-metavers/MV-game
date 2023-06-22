import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { axiosClientInstance } from '../../../Services/AxiosInstance';

export const getAllQueryUserLists = createAsyncThunk(
   'liveSupport/getAllQueryUserLists',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/support/get-all-query-users-list');
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getQueryUserChats = createAsyncThunk(
   'liveSupport/getQueryUserChats',
   async ({ userId, page, chatFrom }, { rejectWithValue }) => {
      try {
         const response = await axiosClientInstance.get(
            `/chatBot/get-chats?userId=${userId}&page=${page}&chatFrom=${chatFrom}`
         );
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getQueryUsersLists = createAsyncThunk(
   'liveSupport/getQueryUserLists',
   async ({ page }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/support/get-query-users-lists?page=${page}`);
         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const updatedUserQuery = createAsyncThunk('liveSupport/updatedUserQuery', async (data, { rejectWithValue }) => {
   try {
      const response = await axiosInstance.patch(`/support/updated-user-query`, data);
      return response;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});
