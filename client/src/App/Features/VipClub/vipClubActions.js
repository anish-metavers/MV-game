import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../Services/AxiosInstance";


export const getRewardList = createAsyncThunk(
  'vipClub/getRewardList',
  async ( { rejectWithValue }) => {
     try {
        const response = await axiosInstance.get(`/vip-club/get-all`);
        return response;
     } catch (err) {
        if (err) {
           throw err;
        }
        return rejectWithValue(err.response.data);
     }
  }
);