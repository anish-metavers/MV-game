import { createSelector } from '@reduxjs/toolkit';

const adminReducerSelector = (state) => state.admin;

export const allCategoryInfoSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.allCategoryInfo
);

export const getAllCategoryInfoLoadingSelector = createSelector(
   [adminReducerSelector],
   (adminSice) => adminSice.getAllCategoryInfoLoading
);

export const getAllCategoryInfoErrorSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.getAllCategoryInfoError
);
