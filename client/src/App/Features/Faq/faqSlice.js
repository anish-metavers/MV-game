import { createSlice } from '@reduxjs/toolkit';
import { createNewFaqCategory, getAllFaqCategories } from './faqActions';

const INITAL_STATE = {
   newFaqCategory: null,
   newFaqCategoryLoading: false,
   newFaqCategoryError: null,
   allFaqCategories: null,
   allFaqCategoriesLoading: false,
   allFaqCategoriesError: null,
};

const faqSlice = createSlice({
   name: 'faq',
   initialState: INITAL_STATE,
   extraReducers: (bulder) => {
      bulder
         .addCase(createNewFaqCategory.pending, (state) => {
            state.newFaqCategory = null;
            state.newFaqCategoryLoading = true;
            state.newFaqCategoryError = null;
         })
         .addCase(createNewFaqCategory.rejected, (state, action) => {
            state.newFaqCategory = null;
            state.newFaqCategoryLoading = false;
            state.newFaqCategoryError = action.error.message;
         })
         .addCase(createNewFaqCategory.fulfilled, (state, action) => {
            state.newFaqCategory = action.payload.data;
            state.newFaqCategoryLoading = false;
            state.newFaqCategoryError = null;
         });

      bulder
         .addCase(getAllFaqCategories.pending, (state) => {
            state.allFaqCategories = null;
            state.allFaqCategoriesLoading = true;
            state.allFaqCategoriesError = null;
         })
         .addCase(getAllFaqCategories.rejected, (state, action) => {
            state.allFaqCategories = null;
            state.allFaqCategoriesLoading = false;
            state.allFaqCategoriesError = action.error.message;
         })
         .addCase(getAllFaqCategories.fulfilled, (state, action) => {
            state.allFaqCategories = action.payload.data;
            state.allFaqCategoriesLoading = false;
            state.allFaqCategoriesError = null;
         });
   },
});

export default faqSlice.reducer;
