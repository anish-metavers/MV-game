import { createSlice } from '@reduxjs/toolkit';
import {
   getAllUserRoles,
   deleteUserRole,
   createUserRole,
   getSingleUserRole,
   updateSingleRole,
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
};

const adminSlice = createSlice({
   name: 'admin',
   initialState: INITAL_STATE,
   reducers: {
      removeSingleRoleInfo: (state) => {
         state.updateSingleRoleInfo = null;
         state.singleRole = null;
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
   },
});

export const { removeSingleRoleInfo } = adminSlice.actions;

export default adminSlice.reducer;
