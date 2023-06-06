import { createSlice } from '@reduxjs/toolkit';
import {
   createPlayerAccount,
   getUserSingleAccount,
   setPlayerAccountPassword,
   updatePlayerAccount,
} from './userManagementActions';

const INITAL_STATE = {
   createPlayerAccountInfo: null,
   createPlayerAccountLoading: false,
   createPlayerAccountError: null,
   createPlayerAccountInvalidErrors: null,
   singleUserAccountInfo: null,
   singleUserAccountLoading: false,
   singleUserAccountError: null,
   accountPasswordChangeLoading: false,
   accountPasswordChangeError: null,
};

const userManagementSlice = createSlice({
   name: 'userManagement',
   initialState: INITAL_STATE,
   reducers: {
      removeAccountErrors: (state) => {
         state.createPlayerAccountError = null;
         state.createPlayerAccountInvalidErrors = null;
         state.createPlayerAccountInfo = null;
         state.singleUserAccountInfo = null;
         state.singleUserAccountLoading = false;
         state.singleUserAccountError = null;
      },
   },
   extraReducers: (bulder) => {
      bulder
         .addCase(createPlayerAccount.pending, (state) => {
            state.createPlayerAccountInfo = null;
            state.createPlayerAccountLoading = true;
            state.createPlayerAccountError = null;
            state.createPlayerAccountInvalidErrors = null;
         })
         .addCase(createPlayerAccount.rejected, (state, action) => {
            state.createPlayerAccountInfo = null;
            state.createPlayerAccountLoading = false;
            state.createPlayerAccountError = action.error.message;
            state.createPlayerAccountInvalidErrors = null;
         })
         .addCase(createPlayerAccount.fulfilled, (state, action) => {
            if (action.payload?.data?.status === 422) {
               state.createPlayerAccountInfo = null;
               state.createPlayerAccountLoading = false;
               state.createPlayerAccountError = null;
               state.createPlayerAccountInvalidErrors = action.payload?.data;
            } else {
               state.createPlayerAccountInfo = action.payload?.data;
               state.createPlayerAccountLoading = false;
               state.createPlayerAccountError = null;
               state.createPlayerAccountInvalidErrors = null;
            }
         });

      bulder
         .addCase(updatePlayerAccount.pending, (state) => {
            state.createPlayerAccountInfo = null;
            state.createPlayerAccountLoading = true;
            state.createPlayerAccountError = null;
            state.createPlayerAccountInvalidErrors = null;
         })
         .addCase(updatePlayerAccount.rejected, (state, action) => {
            state.createPlayerAccountInfo = null;
            state.createPlayerAccountLoading = false;
            state.createPlayerAccountError = action.error.message;
            state.createPlayerAccountInvalidErrors = null;
         })
         .addCase(updatePlayerAccount.fulfilled, (state, action) => {
            if (action.payload?.data?.status === 422) {
               state.createPlayerAccountInfo = null;
               state.createPlayerAccountLoading = false;
               state.createPlayerAccountError = null;
               state.createPlayerAccountInvalidErrors = action.payload?.data;
            } else {
               state.createPlayerAccountInfo = action.payload?.data;
               state.createPlayerAccountLoading = false;
               state.createPlayerAccountError = null;
               state.createPlayerAccountInvalidErrors = null;
            }
         });

      bulder
         .addCase(getUserSingleAccount.pending, (state) => {
            state.singleUserAccountInfo = null;
            state.singleUserAccountLoading = true;
            state.singleUserAccountError = null;
         })
         .addCase(getUserSingleAccount.rejected, (state, action) => {
            state.singleUserAccountInfo = null;
            state.singleUserAccountLoading = false;
            state.singleUserAccountError = action.error?.message;
         })
         .addCase(getUserSingleAccount.fulfilled, (state, action) => {
            state.singleUserAccountInfo = action.payload?.data;
            state.singleUserAccountLoading = false;
            state.singleUserAccountError = null;
         });

      bulder
         .addCase(setPlayerAccountPassword.pending, (state) => {
            state.accountPasswordChangeLoading = true;
            state.accountPasswordChangeError = null;
         })
         .addCase(setPlayerAccountPassword.rejected, (state, action) => {
            state.accountPasswordChangeLoading = false;
            state.accountPasswordChangeError = action.error?.message;
         })
         .addCase(setPlayerAccountPassword.fulfilled, (state, action) => {
            state.accountPasswordChangeLoading = false;
            state.accountPasswordChangeError = null;
         });
   },
});

export const { removeAccountErrors } = userManagementSlice.actions;

export default userManagementSlice.reducer;
