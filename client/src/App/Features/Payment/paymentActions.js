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

export const getSinglePaymentCurrencyOption = createAsyncThunk(
   'payment/getSinglePaymentCurrencyOption',
   async ({ _id }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/payment/get-single-currency-payment-method?optionId=${_id}`
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

export const updatePaymentOption = createAsyncThunk(
   'payment/updatePaymentOption',
   async ({ formData, _id }, { rejectWithValue }) => {
      try {
         const updateResponse = await axiosInstance.patch(
            `/payment/update-single-payment-option?optionId=${_id}`,
            formData
         );
         return updateResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getAllPaymentOptionList = createAsyncThunk(
   'payment/getAllPaymentOptionList',
   async (_, { rejectWithValue }) => {
      try {
         const paymentOptionsResposne = await axiosInstance.get(
            '/payment/get-all-payment-option-list'
         );
         return paymentOptionsResposne;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);
