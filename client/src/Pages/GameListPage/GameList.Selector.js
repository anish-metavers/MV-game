import { createSelector } from '@reduxjs/toolkit';

const adminReducerSelector = (state) => state.admin;

export const gameListInfoSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.gameListInfo
);

export const gameListLoadingSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.gameListLoading
);

export const gameListInfoErrorSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.gameListInfoError
);
