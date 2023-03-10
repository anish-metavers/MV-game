import { createSelector } from '@reduxjs/toolkit';

const adminReducerSelector = (state) => state.admin;

export const gameProvidersSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.gameProviders
);

export const gameProvidersLoadingSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.gameProvidersLoading
);

export const gameProvidersErrorSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.gameProvidersError
);
