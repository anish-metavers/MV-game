import { createSelector } from '@reduxjs/toolkit';

const adminReducerSelector = (state) => state.admin;

export const postNewGameProviderInfoSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.postNewGameProviderInfo
);

export const postNewGameProviderLoadingSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.postNewGameProviderLoading
);

export const postNewGameProviderErrorSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.postNewGameProviderError
);

export const postNewGameProviderInvalidErrorsSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.postNewGameProviderInvalidErrors
);
