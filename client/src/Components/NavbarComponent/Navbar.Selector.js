import { createSelector } from '@reduxjs/toolkit';

const mediaReducer = (state) => state.media;

export const showPickerPopUpSelector = createSelector([mediaReducer], (mediaSlice) => mediaSlice.showPickerPopUp);
