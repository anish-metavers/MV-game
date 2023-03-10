import { createSelector } from '@reduxjs/toolkit';

const adminReducerSelector = (state) => state.admin;

export const usersSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.users
);

export const userLoadingSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.userLoading
);

export const userErrorsSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.userErrors
);
