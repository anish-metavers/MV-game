import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../Services/AxiosInstance';

export const getTopFavoriteGames = createAsyncThunk(
   'games/getTopFavoriteGames',
   async (_, { rejectWithValue }) => {
      try {
         const gameResponse = await axiosInstance.get(
            '/games/get-top-favorite-games'
         );
         return gameResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const getGameCurrencysList = createAsyncThunk(
   'games/getGameCurrencysList',
   async ({ page }, { rejectWithValue }) => {
      try {
         const gameCurrencyList = await axiosInstance.get(
            `/game-currency/get-game-currency?page=${page}`
         );

         return gameCurrencyList;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const inertNewGameCurrency = createAsyncThunk(
   'games/inertNewGameCurrency',
   async ({ formData }, { rejectWithValue }) => {
      try {
         const insertGameCurrencyResponse = await axiosInstance.post(
            '/game-currency/insert-currency',
            formData,
            {
               headers: {
                  'Content-type': 'multipart/form-data',
               },
            }
         );

         return insertGameCurrencyResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const deleteSingleGameCurrency = createAsyncThunk(
   'games/deleteSingleGameCurrency',
   async ({ id }, { rejectWithValue }) => {
      try {
         const deleteSingleGameCurrencyResponse = await axiosInstance.delete(
            `/game-currency/delete-single-game-currency?id=${id}`
         );

         return deleteSingleGameCurrencyResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const getSingleGameCurrency = createAsyncThunk(
   'games/getSingleGameCurrency',
   async ({ id }, { rejectWithValue }) => {
      try {
         const currencyResponse = await axiosInstance.get(
            `/game-currency/get-single-game-currency?id=${id}`
         );
         return currencyResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const updateSingleGameCurrency = createAsyncThunk(
   'games/updateSingleGameCurrency',
   async ({ id, formData }, { rejectWithValue }) => {
      try {
         const updateCurrencyResponse = await axiosInstance.patch(
            `/game-currency/update-single-currency?id=${id}`,
            formData,
            {
               headers: {
                  'Content-type': 'multipart/form-data',
               },
            }
         );

         return updateCurrencyResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);
