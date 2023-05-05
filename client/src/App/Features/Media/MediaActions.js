import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../Services/AxiosInstance';

export const uploadBulkImages = createAsyncThunk(
   'media/uploadBulkImages',
   async (data, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            '/media/upload-bulk-images',
            data
         );

         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const getAllUploadImages = createAsyncThunk(
   'media/getAllUploadImages',
   async ({ page }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/media/get-all-uploded-images?page=${page}`
         );

         return response;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);
