import { createSlice } from '@reduxjs/toolkit';
import {
   insertNewCurrencyPaymentOption,
   getCurrencyPaymentOptions,
   updatePaymentOption,
   getAllPaymentOptionList,
} from './paymentActions';

const INITAL_STATE = {
   insertPaymentMethodInfo: null,
   insertPaymentMethodInfoLoading: false,
   insertPaymentMethodError: null,
   currencyMethods: null,
   currencyMethodsLoading: false,
   currencyMethodsError: null,
   updatePaymentOptionInfo: null,
   updatePaymentOptionLoading: false,
   updatePaymentOptionError: null,
   paymentOptionsList: null,
   paymentOptionsListLoading: false,
   paymentOptionsListError: null,
};

const paymentSlice = createSlice({
   name: 'payment',
   initialState: INITAL_STATE,
   reducers: {
      removeUpdatePaymentOptionInfo: (state) => {
         state.updatePaymentOptionInfo = null;
         state.updatePaymentOptionError = null;
      },
   },
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

      bulder
         .addCase(updatePaymentOption.pending, (state) => {
            state.updatePaymentOptionInfo = null;
            state.updatePaymentOptionLoading = true;
            state.updatePaymentOptionError = null;
         })
         .addCase(updatePaymentOption.rejected, (state, action) => {
            state.updatePaymentOptionInfo = null;
            state.updatePaymentOptionLoading = false;
            state.updatePaymentOptionError = action.error?.message;
         })
         .addCase(updatePaymentOption.fulfilled, (state, action) => {
            state.updatePaymentOptionInfo = action.payload?.data;
            state.updatePaymentOptionLoading = false;
            state.updatePaymentOptionError = null;
         });

      bulder
         .addCase(getAllPaymentOptionList.pending, (state) => {
            state.paymentOptionsList = null;
            state.paymentOptionsListLoading = true;
            state.paymentOptionsListError = null;
         })
         .addCase(getAllPaymentOptionList.rejected, (state, action) => {
            state.paymentOptionsList = null;
            state.paymentOptionsListLoading = false;
            state.paymentOptionsListError = action.error?.message;
         })
         .addCase(getAllPaymentOptionList.fulfilled, (state, action) => {
            state.paymentOptionsList = action.payload?.data;
            state.paymentOptionsListLoading = false;
            state.paymentOptionsListError = null;
         });
   },
});

export const { removeUpdatePaymentOptionInfo } = paymentSlice.actions;

export default paymentSlice.reducer;
