import { createSlice } from '@reduxjs/toolkit';
import { uploadBulkImages, getAllUploadImages } from './MediaActions';

const INITAL_STATE = {
   uploadBulkImagesInfo: null,
   uploadBulkImagesLoading: false,
   uploadBulkImagesError: null,
   mediaImages: null,
   mediaImagesLoading: false,
   mediaImagesError: null,
};

const mediaSlice = createSlice({
   name: 'media',
   initialState: INITAL_STATE,
   reducers: {
      removeImagesInfo: (state, action) => {
         state.uploadBulkImagesInfo = null;
         state.uploadBulkImagesLoading = false;
         state.uploadBulkImagesError = null;
      },
   },
   extraReducers: (bulder) => {
      bulder
         .addCase(uploadBulkImages.pending, (state, action) => {
            state.uploadBulkImagesInfo = null;
            state.uploadBulkImagesLoading = true;
            state.uploadBulkImagesError = null;
         })
         .addCase(uploadBulkImages.rejected, (state, action) => {
            state.uploadBulkImagesInfo = null;
            state.uploadBulkImagesLoading = false;
            state.uploadBulkImagesError = action.error?.message;
         })
         .addCase(uploadBulkImages.fulfilled, (state, action) => {
            state.uploadBulkImagesInfo = action.payload?.data;
            state.uploadBulkImagesLoading = false;
            state.uploadBulkImagesError = null;
         });

      bulder
         .addCase(getAllUploadImages.pending, (state, action) => {
            state.mediaImages = null;
            state.mediaImagesLoading = true;
            state.mediaImagesError = null;
         })
         .addCase(getAllUploadImages.rejected, (state, action) => {
            state.mediaImages = null;
            state.mediaImagesLoading = false;
            state.mediaImagesError = action.error?.message;
         })
         .addCase(getAllUploadImages.fulfilled, (state, action) => {
            state.mediaImages = action.payload?.data;
            state.mediaImagesLoading = false;
            state.mediaImagesError = null;
         });
   },
});

export const { removeImagesInfo } = mediaSlice.actions;

export default mediaSlice.reducer;
