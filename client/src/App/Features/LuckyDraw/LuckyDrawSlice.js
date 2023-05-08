import { createSlice } from '@reduxjs/toolkit';
import {
   createNewLuckyDraw,
   getAllLuckyDraw,
   getSingleLuckyDraw,
   updateSpinLuckyDraw,
} from './LuckyDrawActions';

const INIATAL_STATE = {
   createNewLuckyDrawInfo: null,
   createNewLuckyDrawLoading: false,
   createNewLuckyDrawError: null,
   luckyDraws: null,
   luckyDrawLoading: false,
   luckyDrawError: null,
   singleDrawInfo: null,
   singleDrawLoading: false,
   singleDrawError: null,
   updateSingleDrawInfo: null,
   updateSingleDrawInfoLoading: false,
   updateSpinLuckyDrawError: null,
};

const luckyDrawSlice = createSlice({
   name: 'luckyDraw',
   initialState: INIATAL_STATE,
   reducers: {
      removeSingleDrawInfo: (state) => {
         state.singleDrawInfo = null;
         state.singleDrawError = null;
      },
   },
   extraReducers: (bulder) => {
      bulder
         .addCase(createNewLuckyDraw.pending, (state) => {
            state.createNewLuckyDrawInfo = null;
            state.createNewLuckyDrawLoading = true;
            state.createNewLuckyDrawError = null;
         })
         .addCase(createNewLuckyDraw.rejected, (state, action) => {
            state.createNewLuckyDrawInfo = null;
            state.createNewLuckyDrawLoading = false;
            state.createNewLuckyDrawError = action.error?.message;
         })
         .addCase(createNewLuckyDraw.fulfilled, (state, action) => {
            state.createNewLuckyDrawInfo = action.payload?.data;
            state.createNewLuckyDrawLoading = false;
            state.createNewLuckyDrawError = null;
         });

      bulder
         .addCase(getAllLuckyDraw.pending, (state) => {
            state.luckyDraws = null;
            state.luckyDrawLoading = true;
            state.luckyDrawError = null;
         })
         .addCase(getAllLuckyDraw.rejected, (state, action) => {
            state.luckyDraws = null;
            state.luckyDrawLoading = false;
            state.luckyDrawError = action.error?.message;
         })
         .addCase(getAllLuckyDraw.fulfilled, (state, action) => {
            state.luckyDraws = action.payload?.data;
            state.luckyDrawLoading = false;
            state.luckyDrawError = null;
         });

      bulder
         .addCase(getSingleLuckyDraw.pending, (state) => {
            state.singleDrawInfo = null;
            state.singleDrawLoading = true;
            state.singleDrawError = null;
         })
         .addCase(getSingleLuckyDraw.rejected, (state, action) => {
            state.singleDrawInfo = null;
            state.singleDrawLoading = false;
            state.singleDrawError = action.error?.message;
         })
         .addCase(getSingleLuckyDraw.fulfilled, (state, action) => {
            state.singleDrawInfo = action.payload?.data;
            state.singleDrawLoading = false;
            state.singleDrawError = null;
         });

      bulder
         .addCase(updateSpinLuckyDraw.pending, (state) => {
            state.updateSingleDrawInfo = null;
            state.updateSingleDrawInfoLoading = true;
            state.updateSpinLuckyDrawError = null;
         })
         .addCase(updateSpinLuckyDraw.rejected, (state, action) => {
            state.updateSingleDrawInfo = null;
            state.updateSingleDrawInfoLoading = false;
            state.updateSpinLuckyDrawError = action.error?.message;
         })
         .addCase(updateSpinLuckyDraw.fulfilled, (state, action) => {
            state.updateSingleDrawInfo = action.payload?.data;
            state.updateSingleDrawInfoLoading = false;
            state.updateSpinLuckyDrawError = null;
         });
   },
});

export const { removeSingleDrawInfo } = luckyDrawSlice.actions;

export default luckyDrawSlice.reducer;
