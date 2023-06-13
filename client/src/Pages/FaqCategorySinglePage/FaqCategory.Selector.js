import { createSelector } from '@reduxjs/toolkit';

const faqReducer = (state) => state.faq;

export const newFaqCategorySelector = createSelector([faqReducer], (faqSlice) => faqSlice.newFaqCategory);

export const newFaqCategoryLoadingSelector = createSelector([faqReducer], (faqSlice) => faqSlice.newFaqCategoryLoading);

export const newFaqCategoryErrorSelector = createSelector([faqReducer], (faqSlice) => faqSlice.newFaqCategoryError);
