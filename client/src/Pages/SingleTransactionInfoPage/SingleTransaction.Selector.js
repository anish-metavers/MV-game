import { createSelector } from '@reduxjs/toolkit';

const paymentReducer = (state) => state.payment;

export const singleOrderSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.singleOrder
);

export const singleOrderLoadingSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.singleOrderLoading
);

export const singleOrderErrorSelector = createSelector(
   [paymentReducer],
   (paymentSlice) => paymentSlice.singleOrderError
);
