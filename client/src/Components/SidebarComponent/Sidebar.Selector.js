import { createSelector } from '@reduxjs/toolkit';

const authReducerSelector = (state) => state.auth;

export const authSelector = createSelector(
   [authReducerSelector],
   (authSlice) => authSlice.auth
);
