import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../Services/AxiosInstance';

export const getAllUserRoles = createAsyncThunk(
   'admin/getAllUserRoles',
   async (_, { rejectWithValue }) => {
      try {
         const userRolesInfo = await axiosInstance.get(
            '/admin/get-all-user-rools'
         );
         return userRolesInfo;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const deleteUserRole = createAsyncThunk(
   'admin/deleteUserRole',
   async ({ roleId }, { rejectWithValue }) => {
      try {
         const deleteRoleResponse = await axiosInstance.delete(
            `/admin/delete-single-role?roleId=${roleId}`
         );
         return deleteRoleResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const createUserRole = createAsyncThunk(
   'admin/createUserRole',
   async ({ roleName, description }, { rejectWithValue }) => {
      try {
         const insertNewRoleRes = await axiosInstance.post(
            '/admin/insert-new-user-role',
            { roleName, description },
            {
               validateStatus: false,
            }
         );

         return insertNewRoleRes;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);
