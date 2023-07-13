import { createSelector } from "@reduxjs/toolkit";

const rewardsReducerSelector = (state) => state.vipClub;

export const currencySelector = createSelector([rewardsReducerSelector], (rewardsSlice) => rewardsSlice.currencyListInfo);

export const currencyLoadingSelector = createSelector([rewardsReducerSelector], (rewardsSlice) => rewardsSlice.currencyListLoading);

export const currencyErrorsSelector = createSelector([rewardsReducerSelector], (rewardsSlice) => rewardsSlice.currencyListError);