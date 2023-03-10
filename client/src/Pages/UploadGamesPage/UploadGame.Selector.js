import { createSelector } from '@reduxjs/toolkit';

const adminReducerSelector = (state) => state.admin;

export const gameProvidersListSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.gameProvidersList
);

export const gameProvidersLoadingSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.gameProvidersLoading
);

export const gameProvidersErrorSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.gameProvidersError
);

export const insertGameInfoSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.insertGameInfo
);

export const insertGameLoadingSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.insertGameLoading
);

export const insertGameErrorSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.insertGameError
);

export const updateGameinfoSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.updateGameinfo
);

export const updateGameLoadingSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.updateGameLoading
);

export const updateGameErrorSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.updateGameError
);

export const allGamesCategorysSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.allGamesCategorys
);

export const allGamesCategorysLoadingSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.allGamesCategorysLoading
);

export const allGamesCategorysErrorSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.allGamesCategorysError
);
