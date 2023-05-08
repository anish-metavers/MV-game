import { createSelector } from '@reduxjs/toolkit';

const mediaReducer = (state) => state.media;

const luckyDrawReducer = (state) => state.LuckyDraw;

export const showPickerPopUpSelector = createSelector(
   [mediaReducer],
   (mediaSlice) => mediaSlice.showPickerPopUp
);

export const pickedImageSelector = createSelector(
   [mediaReducer],
   (mediaSlice) => mediaSlice.pickedImage
);

export const createNewLuckyDrawLoadingSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.createNewLuckyDrawLoading
);

export const singleDrawInfoSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.singleDrawInfo
);

export const updateSingleDrawInfoLoadingSelector = createSelector(
   [luckyDrawReducer],
   (luckyDrawSlice) => luckyDrawSlice.updateSingleDrawInfoLoading
);
