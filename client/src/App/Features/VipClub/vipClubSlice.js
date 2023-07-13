import { createSlice } from '@reduxjs/toolkit';
import {
  getRewardList,
  getCurrencyList
} from './vipClubActions';

const INITAL_STATE = {
  rewardListInfo: null,
  rewardListLoading: false,
  rewardListError: null,

  currencyListInfo: null,
  currencyListLoading: false,
  currencyListError: null,
}

const vipClubSlice = createSlice({
  name: 'vipClub',
  initialState: INITAL_STATE,
  reducers: {
    resetVipClub: (state) => {
      state.rewardListInfo = null;
      state.rewardListLoading = false;
      state.rewardListError = null;

      state.currencyListInfo = null;
      state.currencyListLoading = false;
      state.currencyListError = null;
    },
    // selectedGroupHandler: (state, action) => {
    //   state.selectedGroup = action.payload;
    // },
  },
  extraReducers: (bulder) => {
    bulder
      .addCase(getRewardList.pending, (state) => {
        state.rewardListInfo = null;
        state.rewardListLoading = true;
        state.rewardListError = null;
      })
      .addCase(getRewardList.rejected, (state, action) => {
        state.rewardListInfo = null;
        state.rewardListLoading = false;
        state.rewardListError = action.error.message;
      })
      .addCase(getRewardList.fulfilled, (state, action) => {
        state.rewardListInfo = action.payload?.data;
        state.rewardListLoading = false;
        state.rewardListError = null;
      });

    bulder
      .addCase(getCurrencyList.pending, (state) => {
        state.currencyListInfo = null;
        state.currencyListLoading = true;
        state.currencyListError = null;
      })
      .addCase(getCurrencyList.rejected, (state, action) => {
        state.currencyListInfo = null;
        state.currencyListLoading = false;
        state.currencyListError = action.error.message;
      })
      .addCase(getCurrencyList.fulfilled, (state, action) => {
        state.currencyListInfo = action.payload?.data;
        state.currencyListLoading = false;
        state.currencyListError = null;
      });
  },
});

export const { resetVipClub } = vipClubSlice.actions;

export default vipClubSlice.reducer;