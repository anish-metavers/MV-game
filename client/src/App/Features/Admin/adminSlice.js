import { createSlice } from '@reduxjs/toolkit';
import {
   getAllUserRoles,
   deleteUserRole,
   createUserRole,
   getSingleUserRole,
   updateSingleRole,
   getGameCurrencysList,
   inertNewGameCurrency,
   deleteSingleGameCurrency,
   getSingleGameCurrency,
   updateSingleGameCurrency,
} from './adminActions';

const INITAL_STATE = {
   roles: null,
   getRolesLoading: false,
   getRolesError: null,
   deleteSingleRoleError: null,
   deleteSingleRoleLoading: false,
   newRoleInsertInfo: null,
   newRoleInsertLoading: false,
   newRoleInsertError: null,
   newRoleInsertInvalidErrors: null,
   singleRole: null,
   singleRoleLoading: false,
   singleRoleError: null,
   updateSingleRoleInfo: null,
   updateSinglRoleLoading: false,
   updateSingleRoleError: null,
   gameCurrencyListInfo: null,
   gameCurrencyListLoading: false,
   gameCurrencyListError: null,
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
};

const adminSlice = createSlice({
   name: 'admin',
   initialState: INITAL_STATE,
   reducers: {
      removeSingleRoleInfo: (state) => {
         state.updateSingleRoleInfo = null;
         state.singleRole = null;
         state.newRoleInsertInfo = null;
      },
      removeCurrencyInfo: (state) => {
         state.updateGameCurrency = null;
         state.singleGameCurrency = null;
      },
   },
   extraReducers: (bulder) => {
      bulder
         .addCase(getAllUserRoles.pending, (state) => {
            state.roles = null;
            state.getRolesLoading = true;
            state.getRolesError = null;
         })
         .addCase(getAllUserRoles.rejected, (state, action) => {
            state.roles = null;
            state.getRolesLoading = false;
            state.getRolesError = action.error.message;
         })
         .addCase(getAllUserRoles.fulfilled, (state, action) => {
            state.roles = action.payload.data;
            state.getRolesLoading = false;
            state.getRolesError = null;
         });

      bulder
         .addCase(deleteUserRole.pending, (state) => {
            state.deleteSingleRoleError = null;
            state.deleteSingleRoleLoading = true;
         })
         .addCase(deleteUserRole.rejected, (state, action) => {
            state.deleteSingleRoleError = action.error.message;
            state.deleteSingleRoleLoading = false;
         })
         .addCase(deleteUserRole.fulfilled, (state, action) => {
            state.deleteSingleRoleError = null;
            state.deleteSingleRoleLoading = false;
            state.roles = {
               ...state.roles,
               roles: state.roles?.roles.filter(
                  (el) => el._id !== action.payload?.data?.roleId
               ),
            };
         });

      bulder
         .addCase(createUserRole.pending, (state) => {
            state.newRoleInsertInfo = null;
            state.newRoleInsertLoading = true;
            state.newRoleInsertError = null;
         })
         .addCase(createUserRole.rejected, (state, action) => {
            state.newRoleInsertInfo = null;
            state.newRoleInsertLoading = false;
            state.newRoleInsertError = action.error.message;
         })
         .addCase(createUserRole.fulfilled, (state, action) => {
            if (action.payload?.data?.status === 422) {
               state.newRoleInsertLoading = false;
               state.newRoleInsertInvalidErrors = action.payload?.data;
            } else {
               state.newRoleInsertInfo = action.payload.data;
               state.newRoleInsertLoading = false;
               state.newRoleInsertError = null;
               state.newRoleInsertInvalidErrors = null;
            }
         });

      bulder
         .addCase(getSingleUserRole.pending, (state) => {
            state.singleRole = null;
            state.singleRoleLoading = true;
            state.singleRoleError = null;
         })
         .addCase(getSingleUserRole.rejected, (state, action) => {
            state.singleRole = null;
            state.singleRoleLoading = false;
            state.singleRoleError = action.error.message;
         })
         .addCase(getSingleUserRole.fulfilled, (state, action) => {
            state.singleRole = action.payload.data;
            state.singleRoleLoading = false;
            state.singleRoleError = null;
         });

      bulder
         .addCase(updateSingleRole.pending, (state) => {
            state.updateSingleRoleInfo = null;
            state.updateSinglRoleLoading = true;
            state.updateSingleRoleError = null;
         })
         .addCase(updateSingleRole.rejected, (state, action) => {
            state.updateSingleRoleInfo = null;
            state.updateSinglRoleLoading = false;
            state.updateSingleRoleError = action.error.message;
         })
         .addCase(updateSingleRole.fulfilled, (state, action) => {
            state.updateSingleRoleInfo = action.payload.data;
            state.updateSinglRoleLoading = false;
            state.updateSingleRoleError = null;
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
   },
});

export const { removeSingleRoleInfo, removeCurrencyInfo } = adminSlice.actions;

export default adminSlice.reducer;
