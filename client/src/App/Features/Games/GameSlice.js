import { createSlice } from '@reduxjs/toolkit';
import {
   getTopFavoriteGames,
   getGameCurrencysList,
   inertNewGameCurrency,
   deleteSingleGameCurrency,
   getSingleGameCurrency,
   updateSingleGameCurrency,
} from './GameActions';

const INITAL_STATE = {
   topFavoriteGames: null,
   topFavoriteGamesLoading: false,
   topFavoriteGamesError: null,
   uploadCurrencyInfo: null,
   uploadCurrencyLoading: false,
   uploadCurrencyError: null,
   deleteSingleGameCurrencyError: null,
   deleteSingleGameCurrencyLoading: false,
   singleGameCurrency: null,
   singleGameCurrencyLoading: false,
   singleGameCurrencyError: null,
   updateGameCurrency: null,
   updateGameCurrencyLoading: false,
   updateGameCurrencyError: null,
   gameCurrencyListInfo: null,
   gameCurrencyListLoading: false,
   gameCurrencyListError: null,
};

const gameSlice = createSlice({
   name: 'games',
   initialState: INITAL_STATE,
   extraReducers: (bulder) => {
      bulder
         .addCase(getTopFavoriteGames.pending, (state) => {
            state.topFavoriteGames = null;
            state.topFavoriteGamesLoading = true;
            state.topFavoriteGamesError = null;
         })
         .addCase(getTopFavoriteGames.rejected, (state, action) => {
            state.topFavoriteGames = null;
            state.topFavoriteGamesLoading = false;
            state.topFavoriteGamesError = action.error.message;
         })
         .addCase(getTopFavoriteGames.fulfilled, (state, action) => {
            state.topFavoriteGames = action.payload?.data;
            state.topFavoriteGamesLoading = false;
            state.topFavoriteGamesError = null;
         });

      bulder
         .addCase(inertNewGameCurrency.pending, (state) => {
            state.uploadCurrencyInfo = null;
            state.uploadCurrencyLoading = true;
            state.uploadCurrencyError = null;
         })
         .addCase(inertNewGameCurrency.rejected, (state, action) => {
            state.uploadCurrencyInfo = null;
            state.uploadCurrencyLoading = false;
            state.uploadCurrencyError = action.error.message;
         })
         .addCase(inertNewGameCurrency.fulfilled, (state, action) => {
            state.uploadCurrencyInfo = action.payload.data;
            state.uploadCurrencyLoading = false;
            state.uploadCurrencyError = null;
         });

      bulder
         .addCase(deleteSingleGameCurrency.pending, (state) => {
            state.deleteSingleGameCurrencyError = null;
            state.deleteSingleGameCurrencyLoading = true;
         })
         .addCase(deleteSingleGameCurrency.rejected, (state, action) => {
            state.deleteSingleGameCurrencyError = action.error.message;
            state.deleteSingleGameCurrencyLoading = false;
         })
         .addCase(deleteSingleGameCurrency.fulfilled, (state, action) => {
            state.deleteSingleGameCurrencyError = null;
            state.deleteSingleGameCurrencyLoading = false;
            state.gameCurrencyListInfo = {
               ...state.gameCurrencyListInfo,
               currency: state.gameCurrencyListInfo.currency.filter(
                  (el) => el._id !== action.payload?.data?.id
               ),
            };
         });

      bulder
         .addCase(getSingleGameCurrency.pending, (state) => {
            state.singleGameCurrency = null;
            state.singleGameCurrencyLoading = true;
            state.singleGameCurrencyError = null;
         })
         .addCase(getSingleGameCurrency.rejected, (state, action) => {
            state.singleGameCurrency = null;
            state.singleGameCurrencyLoading = false;
            state.singleGameCurrencyError = action.error.message;
         })
         .addCase(getSingleGameCurrency.fulfilled, (state, action) => {
            state.singleGameCurrency = action.payload.data;
            state.singleGameCurrencyLoading = false;
            state.singleGameCurrencyError = null;
         });

      bulder
         .addCase(updateSingleGameCurrency.pending, (state) => {
            state.updateGameCurrency = null;
            state.updateGameCurrencyLoading = true;
            state.updateGameCurrencyError = null;
         })
         .addCase(updateSingleGameCurrency.rejected, (state, action) => {
            state.updateGameCurrency = null;
            state.updateGameCurrencyLoading = false;
            state.updateGameCurrencyError = action.error.message;
         })
         .addCase(updateSingleGameCurrency.fulfilled, (state, action) => {
            state.updateGameCurrency = action.payload.data;
            state.updateGameCurrencyLoading = false;
            state.updateGameCurrencyError = null;
         });

      bulder
         .addCase(getGameCurrencysList.pending, (state) => {
            state.gameCurrencyListInfo = null;
            state.gameCurrencyListLoading = true;
            state.gameCurrencyListError = null;
         })
         .addCase(getGameCurrencysList.rejected, (state, action) => {
            state.gameCurrencyListInfo = null;
            state.gameCurrencyListLoading = false;
            state.gameCurrencyListError = action.error.message;
         })
         .addCase(getGameCurrencysList.fulfilled, (state, action) => {
            state.gameCurrencyListInfo = action.payload.data;
            state.gameCurrencyListLoading = false;
            state.gameCurrencyListError = null;
         });
   },
});

export default gameSlice.reducer;
