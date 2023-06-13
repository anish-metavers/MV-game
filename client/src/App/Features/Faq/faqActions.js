import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../Services/AxiosInstance';

export const getAllFaqCategories = createAsyncThunk('faq/getAllFaqCategories', async ({ page }, { rejectWithValue }) => {
   try {
      const response = await axiosInstance.get(`/faq/get-all-faq-categories?page=${page}`);
      return response;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const createNewFaqCategory = createAsyncThunk('faq/createNewFaqCategory', async (data, { rejectWithValue }) => {
   try {
      const response = await axiosInstance.post('/faq/create-new-faq-category', data);
      return response;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});
