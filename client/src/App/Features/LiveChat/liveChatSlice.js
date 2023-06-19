import { createSlice } from '@reduxjs/toolkit';

const INITAL_STATE = {};

const liveChatSlice = createSlice({
   name: 'liveChat',
   initialState: INITAL_STATE,
});

export default liveChatSlice.reducer;
