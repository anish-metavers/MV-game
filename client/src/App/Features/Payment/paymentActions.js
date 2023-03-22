import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../Services/AxiosInstance';

export const getCurrencyPaymentOptions = createAsyncThunk(
   'payment/getCurrencyPaymentOptions',
   async ({ page }, { rejectWithValue }) => {
      try {
         const currencyResponse = await axiosInstance.get(
            `/payment/get-currency-payment-options?page=${page}`
         );
         return currencyResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const insertNewCurrencyPaymentOption = createAsyncThunk(
   'payment/insertNewCurrencyPaymentOption',
   async ({ formData }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            '/payment/insert-new-currency-payment-options',
            formData
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
