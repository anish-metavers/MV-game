import { createSlice } from '@reduxjs/toolkit';
import {
   insertNewCurrencyPaymentOption,
   getCurrencyPaymentOptions,
} from './paymentActions';

const INITAL_STATE = {
   insertPaymentMethodInfo: null,
   insertPaymentMethodInfoLoading: false,
   insertPaymentMethodError: null,
   currencyMethods: null,
   currencyMethodsLoading: false,
   currencyMethodsError: null,
};

const paymentSlice = createSlice({
   name: 'payment',
   initialState: INITAL_STATE,
   extraReducers: (bulder) => {
      bulder
         .addCase(insertNewCurrencyPaymentOption.pending, (state) => {
            state.insertPaymentMethodInfo = null;
            state.insertPaymentMethodInfoLoading = true;
            state.insertPaymentMethodError = null;
         })
         .addCase(insertNewCurrencyPaymentOption.rejected, (state, action) => {
            state.insertPaymentMethodInfo = null;
            state.insertPaymentMethodInfoLoading = false;
            state.insertPaymentMethodError = action.error?.message;
         })
         .addCase(insertNewCurrencyPaymentOption.fulfilled, (state, action) => {
            state.insertPaymentMethodInfo = action.payload?.data;
            state.insertPaymentMethodInfoLoading = false;
            state.insertPaymentMethodError = null;
         });

      bulder
         .addCase(getCurrencyPaymentOptions.pending, (state) => {
            state.currencyMethods = null;
            state.currencyMethodsLoading = true;
            state.currencyMethodsError = null;
         })
         .addCase(getCurrencyPaymentOptions.rejected, (state, action) => {
            state.currencyMethods = null;
            state.currencyMethodsLoading = false;
            state.currencyMethodsError = action.error?.message;
         })
         .addCase(getCurrencyPaymentOptions.fulfilled, (state, action) => {
            state.currencyMethods = action.payload?.data;
            state.currencyMethodsLoading = false;
            state.currencyMethodsError = null;
         });
   },
});

export default paymentSlice.reducer;
