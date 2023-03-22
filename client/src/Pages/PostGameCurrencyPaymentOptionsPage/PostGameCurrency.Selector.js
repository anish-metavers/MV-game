import { createSelector } from '@reduxjs/toolkit';

const paymentReducerSelector = (state) => state.payment;

const gameReducerSelector = (state) => state.games;

export const currencyListSelector = createSelector(
   [gameReducerSelector],
   (gameSlice) => gameSlice.currencyList
);

export const currencyListLoadingSelector = createSelector(
   [gameReducerSelector],
   (gameSlice) => gameSlice.currencyListLoading
);

export const currencyListErrorSelector = createSelector(
   [gameReducerSelector],
   (gameSlice) => gameSlice.currencyListError
);

export const insertPaymentMethodInfoSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.insertPaymentMethodInfo
);

export const insertPaymentMethodInfoLoadingSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.insertPaymentMethodInfoLoading
);

export const insertPaymentMethodErrorSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.insertPaymentMethodError
);
