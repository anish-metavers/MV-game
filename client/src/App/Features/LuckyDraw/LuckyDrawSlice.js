import { createSlice } from '@reduxjs/toolkit';
import {
   createNewLuckyDraw,
   getAllLuckyDraw,
   getSingleLuckyDraw,
   updateSpinLuckyDraw,
   getAllLotteryPoll,
   getSingleLuckyDrawPoll,
   updateLuckyDrawPollResult,
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
   allLotteryPoll: null,
   allLotteryPollLoading: false,
   allLotteryPollError: null,
   singleLotteryPoll: null,
   singleLotteryPollLoading: false,
   singleLotteryPollError: null,
   lotteryPollUpdatedInfo: null,
   lotteryPollUpdateLoading: false,
   lotteryPollUpdateError: null,
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

      bulder
         .addCase(getAllLotteryPoll.pending, (state) => {
            state.allLotteryPoll = null;
            state.allLotteryPollLoading = true;
            state.allLotteryPollError = null;
         })
         .addCase(getAllLotteryPoll.rejected, (state, action) => {
            state.allLotteryPoll = null;
            state.allLotteryPollLoading = false;
            state.allLotteryPollError = action.error?.message;
         })
         .addCase(getAllLotteryPoll.fulfilled, (state, action) => {
            state.allLotteryPoll = action.payload?.data;
            state.allLotteryPollLoading = false;
            state.allLotteryPollError = null;
         });

      bulder
         .addCase(getSingleLuckyDrawPoll.pending, (state) => {
            state.singleLotteryPoll = null;
            state.singleLotteryPollLoading = true;
            state.singleLotteryPollError = null;
         })
         .addCase(getSingleLuckyDrawPoll.rejected, (state, action) => {
            state.singleLotteryPoll = null;
            state.singleLotteryPollLoading = false;
            state.singleLotteryPollError = action.error?.message;
         })
         .addCase(getSingleLuckyDrawPoll.fulfilled, (state, action) => {
            state.singleLotteryPoll = action.payload?.data;
            state.singleLotteryPollLoading = false;
            state.singleLotteryPollError = null;
         });

      bulder
         .addCase(updateLuckyDrawPollResult.pending, (state) => {
            state.lotteryPollUpdatedInfo = null;
            state.lotteryPollUpdateLoading = true;
            state.lotteryPollUpdateError = null;
         })
         .addCase(updateLuckyDrawPollResult.rejected, (state, action) => {
            state.lotteryPollUpdatedInfo = null;
            state.lotteryPollUpdateLoading = false;
            state.lotteryPollUpdateError = action.error?.message;
         })
         .addCase(updateLuckyDrawPollResult.fulfilled, (state, action) => {
            state.lotteryPollUpdatedInfo = action.payload?.data;
            state.lotteryPollUpdateLoading = false;
            state.lotteryPollUpdateError = null;
         });
   },
});

export const { removeSingleDrawInfo } = luckyDrawSlice.actions;

export default luckyDrawSlice.reducer;
