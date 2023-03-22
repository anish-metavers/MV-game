import { createSelector } from '@reduxjs/toolkit';

const paymentReducerSelector = (state) => state.payment;

export const currencyMethodsSelector = createSelector(
   [paymentReducerSelector],
   (paymentSlice) => paymentSlice.currencyMethods
);
