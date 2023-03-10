import { createSelector } from '@reduxjs/toolkit';

const adminReducerSelector = (state) => state.admin;

export const newGameCategorySelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.newGameCategory
);

export const newGameCategoryLoadingSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.newGameCategoryLoading
);

export const newGameCategoryErrorSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.newGameCategoryError
);

export const singleGameCategorySelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.singleGameCategory
);

export const singleGameCategoryLoadingSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.singleGameCategoryLoading
);

export const singleGameCategoryErrorSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.singleGameCategoryError
);

export const updateGameCategoryLoadingSelector = createSelector(
   [adminReducerSelector],
   (adminSlice) => adminSlice.updateGameCategoryLoading
);
