import { createSelector } from '@reduxjs/toolkit';

const adminReducerSelector = (state) => state.admin;

export const gameCurrencyListInfoSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.gameCurrencyListInfo
);

export const gameCurrencyListLoadingSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.gameCurrencyListLoading
);

export const gameCurrencyListErrorSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.gameCurrencyListError
);
