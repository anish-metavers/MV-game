import { createSlice } from '@reduxjs/toolkit';
import {
   insertNewCurrencyPaymentOption,
   getCurrencyPaymentOptions,
   updatePaymentOption,
   getAllPaymentOptionList,
   getAllFiatTransactions,
   getSingleOrderInfo,
   getAllPaymentOptionFields,
   deletePaymentOptionsFiled,
   getAllPaymentOptionFieldsList,
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
   fiatTransactions: null,
   fiatTransactionsLoading: false,
   fiatTransactionsError: null,
   singleOrder: null,
   singleOrderLoading: false,
   singleOrderError: null,
   paymentOptionsFields: null,
   paymentOptionsFieldsLoading: false,
   paymentOptionsFieldsError: null,
   deletePaymentOptionsFiledError: null,
   deletePaymentOptionsFiledLoading: false,
   paymentFields: null,
   paymentFieldsLoading: false,
   paymentFieldsError: null,
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

      bulder
         .addCase(getAllFiatTransactions.pending, (state) => {
            state.fiatTransactions = null;
            state.fiatTransactionsLoading = true;
            state.fiatTransactionsError = null;
         })
         .addCase(getAllFiatTransactions.rejected, (state, action) => {
            state.fiatTransactions = null;
            state.fiatTransactionsLoading = false;
            state.fiatTransactionsError = action.error?.message;
         })
         .addCase(getAllFiatTransactions.fulfilled, (state, action) => {
            state.fiatTransactions = action.payload?.data;
            state.fiatTransactionsLoading = false;
            state.fiatTransactionsError = null;
         });

      bulder
         .addCase(getSingleOrderInfo.pending, (state) => {
            state.singleOrder = null;
            state.singleOrderLoading = true;
            state.singleOrderError = null;
         })
         .addCase(getSingleOrderInfo.rejected, (state, action) => {
            state.singleOrder = null;
            state.singleOrderLoading = false;
            state.singleOrderError = action.error?.message;
         })
         .addCase(getSingleOrderInfo.fulfilled, (state, action) => {
            state.singleOrder = action.payload?.data;
            state.singleOrderLoading = false;
            state.singleOrderError = null;
         });

      bulder
         .addCase(getAllPaymentOptionFields.pending, (state) => {
            state.paymentOptionsFields = null;
            state.paymentOptionsFieldsLoading = true;
            state.paymentOptionsFieldsError = null;
         })
         .addCase(getAllPaymentOptionFields.rejected, (state, action) => {
            state.paymentOptionsFields = null;
            state.paymentOptionsFieldsLoading = false;
            state.paymentOptionsFieldsError = action.error?.message;
         })
         .addCase(getAllPaymentOptionFields.fulfilled, (state, action) => {
            state.paymentOptionsFields = action.payload?.data;
            state.paymentOptionsFieldsLoading = false;
            state.paymentOptionsFieldsError = null;
         });

      bulder
         .addCase(getAllPaymentOptionFieldsList.pending, (state) => {
            state.paymentFields = null;
            state.paymentFieldsLoading = true;
            state.paymentFieldsError = null;
         })
         .addCase(getAllPaymentOptionFieldsList.rejected, (state, action) => {
            state.paymentFields = null;
            state.paymentFieldsLoading = false;
            state.paymentFieldsError = action.error?.message;
         })
         .addCase(getAllPaymentOptionFieldsList.fulfilled, (state, action) => {
            state.paymentFields = action.payload?.data;
            state.paymentFieldsLoading = false;
            state.paymentFieldsError = null;
         });

      bulder
         .addCase(deletePaymentOptionsFiled.pending, (state) => {
            state.deletePaymentOptionsFiledError = null;
            state.deletePaymentOptionsFiledLoading = true;
         })
         .addCase(deletePaymentOptionsFiled.rejected, (state, action) => {
            state.deletePaymentOptionsFiledError = action.error?.message;
            state.deletePaymentOptionsFiledLoading = false;
         })
         .addCase(deletePaymentOptionsFiled.fulfilled, (state, action) => {
            state.deletePaymentOptionsFiledError = null;
            state.deletePaymentOptionsFiledLoading = false;
            state.paymentOptionsFields = {
               ...state.paymentOptionsFields,
               items: state.paymentOptionsFields?.items.filter(
                  (el) => el?._id !== action.payload?.data?.fieldId
               ),
            };
         });
   },
});

export const { removeUpdatePaymentOptionInfo } = paymentSlice.actions;

export default paymentSlice.reducer;
