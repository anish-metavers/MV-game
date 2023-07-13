import { createSlice } from '@reduxjs/toolkit';
import {
  getRewardList,
} from './vipClubActions';

const INITAL_STATE = {
  rewardListInfo: null,
  rewardListLoading: false,
  rewardListError: null,
}

const vipClubSlice = createSlice({
  name: 'vipClub',
  initialState: INITAL_STATE,
  reducers: {
    resetVipClub: (state) => {
      state.rewardListInfo = null;
      state.rewardListLoading = false;
      state.rewardListError = null;
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
  },
});

export const { resetVipClub } = vipClubSlice.actions;

export default vipClubSlice.reducer;