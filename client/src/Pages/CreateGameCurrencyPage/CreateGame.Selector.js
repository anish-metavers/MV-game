import { createSelector } from '@reduxjs/toolkit';

const gamesReducerSelector = (state) => state.games;

export const uploadCurrencyInfoSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.uploadCurrencyInfo
);

export const uploadCurrencyLoadingSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.uploadCurrencyLoading
);

export const uploadCurrencyErrorSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.uploadCurrencyError
);

export const singleGameCurrencySelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.singleGameCurrency
);

export const singleGameCurrencyErrorSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.singleGameCurrencyError
);

export const updateGameCurrencySelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.updateGameCurrency
);

export const updateGameCurrencyLoadingSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.updateGameCurrencyLoading
);

export const updateGameCurrencyErrorSelector = createSelector(
   [gamesReducerSelector],
   (gamesSlice) => gamesSlice.updateGameCurrencyError
);
