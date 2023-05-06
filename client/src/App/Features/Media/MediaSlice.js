import { createSlice } from '@reduxjs/toolkit';
import {
   uploadBulkImages,
   getAllUploadImages,
   deleteMediaFiles,
} from './MediaActions';

const INITAL_STATE = {
   uploadBulkImagesInfo: null,
   uploadBulkImagesLoading: false,
   uploadBulkImagesError: null,
   mediaImages: null,
   mediaImagesLoading: false,
   mediaImagesError: null,
   deleteFileLoading: false,
   deleteFileError: null,
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
            state.mediaImages = {
               ...state.mediaImages,
               images: state.mediaImages?.images.concat(
                  action.payload?.data?.images,
                  state.mediaImages?.images
               ),
            };
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

      bulder
         .addCase(deleteMediaFiles.pending, (state, action) => {
            state.deleteFileLoading = true;
            state.deleteFileError = null;
         })
         .addCase(deleteMediaFiles.rejected, (state, action) => {
            state.deleteFileLoading = false;
            state.deleteFileError = action.error?.message;
         })
         .addCase(deleteMediaFiles.fulfilled, (state, action) => {
            state.mediaImages = {
               ...state.mediaImages,
               images: state.mediaImages?.images.filter(
                  (el) => el?.key !== action.payload?.data?.deleteObject
               ),
            };
            state.deleteFileLoading = false;
            state.deleteFileError = null;
         });
   },
});

export const { removeImagesInfo } = mediaSlice.actions;

export default mediaSlice.reducer;
