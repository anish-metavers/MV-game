import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../Services/AxiosInstance';

export const createNewLuckyDraw = createAsyncThunk(
   'luckyDraw/createNewLuckyDraw',
   async (data, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            '/lucky-draw/create-new-lucky-draw',
            data
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

export const updateSpinLuckyDraw = createAsyncThunk(
   'luckyDraw/updateSpinItem',
   async ({ data, id }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.patch(
            `/lucky-draw/update-lucky-draw?id=${id}`,
            data
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

export const getAllLuckyDraw = createAsyncThunk(
   'luckyDraw/getAllLuckyDraw',
   async ({ page }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/lucky-draw/get-all-lucky-draw?page=${page}`
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

export const getSingleLuckyDraw = createAsyncThunk(
   'luckyDraw/getSingleLuckyDraw',
   async ({ id }, { rejectWithValue }) => {
      try {
         const singleLuckyDrawResponse = await axiosInstance.get(
            `/lucky-draw/get-single-lucky-draw?id=${id}`
         );
         return singleLuckyDrawResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);
