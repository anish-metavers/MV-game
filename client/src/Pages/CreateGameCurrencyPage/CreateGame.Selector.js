import { createSelector } from '@reduxjs/toolkit';

const adminReducerSelector = (state) => state.admin;

export const uploadCurrencyInfoSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.uploadCurrencyInfo
);

export const uploadCurrencyLoadingSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.uploadCurrencyLoading
);

export const uploadCurrencyErrorSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.uploadCurrencyError
);

export const singleGameCurrencySelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.singleGameCurrency
);

export const singleGameCurrencyErrorSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.singleGameCurrencyError
);

export const updateGameCurrencySelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.updateGameCurrency
);

export const updateGameCurrencyLoadingSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.updateGameCurrencyLoading
);

export const updateGameCurrencyErrorSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.updateGameCurrencyError
);
