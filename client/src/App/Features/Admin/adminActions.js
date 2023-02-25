import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../Services/AxiosInstance';

export const getAllUserRoles = createAsyncThunk(
   'admin/getAllUserRoles',
   async ({ page }, { rejectWithValue }) => {
      try {
         const userRolesInfo = await axiosInstance.get(
            `/admin/get-all-user-rools?page=${page}`
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

export const getSingleUserRole = createAsyncThunk(
   'admin/getSingleUserRole',
   async ({ roleId }, { rejectWithValue }) => {
      try {
         const singleRoleResponse = await axiosInstance.get(
            `/admin/get-single-user-role?roleId=${roleId}`
         );
         return singleRoleResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const updateSingleRole = createAsyncThunk(
   'admin/updateSingleRole',
   async (data, { rejectWithValue }) => {
      try {
         const updateRoleRespose = await axiosInstance.patch(
            '/admin/update-single-role',
            data
         );
         return updateRoleRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const getGameCurrencysList = createAsyncThunk(
   'admin/getGameCurrencysList',
   async ({ page }, { rejectWithValue }) => {
      try {
         const gameCurrencyList = await axiosInstance.get(
            `/admin/get-game-currency?page=${page}`
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
   'admin/inertNewGameCurrency',
   async ({ formData }, { rejectWithValue }) => {
      try {
         const insertGameCurrencyResponse = await axiosInstance.post(
            '/admin/insert-currency',
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
   'admin/deleteSingleGameCurrency',
   async ({ id }, { rejectWithValue }) => {
      try {
         const deleteSingleGameCurrencyResponse = await axiosInstance.delete(
            `/admin/delete-single-game-currency?id=${id}`
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
   'admin/getSingleGameCurrency',
   async ({ id }, { rejectWithValue }) => {
      try {
         const currencyResponse = await axiosInstance.get(
            `/admin/get-single-game-currency?id=${id}`
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
   'admin/updateSingleGameCurrency',
   async ({ id, formData }, { rejectWithValue }) => {
      try {
         const updateCurrencyResponse = await axiosInstance.patch(
            `/admin/update-single-currency?id=${id}`,
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

export const getGameProvidersList = createAsyncThunk(
   'admin/getGameProvidersList',
   async () => {
      try {
         const providerResponse = await axiosInstance.get(
            '/admin/get-games-providers-lists'
         );

         return providerResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
      }
   }
);

export const insertNewGame = createAsyncThunk(
   'admin/insertNewGame',
   async ({ formData }, { rejectWithValue }) => {
      try {
         const insertNewGameResponse = await axiosInstance.post(
            '/admin/insert-new-game',
            formData,
            {
               headers: {
                  'Content-type': 'multipart/form-data',
               },
            }
         );

         return insertNewGameResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const getGamesLists = createAsyncThunk(
   'admin/getGamesLists',
   async ({ page }, { rejectWithValue }) => {
      try {
         const gameListResponse = await axiosInstance.get(
            `/admin/get-games?page=${page}`
         );
         return gameListResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const getSingleGameInfo = createAsyncThunk(
   'admin/getSingleGameInfo',
   async ({ gameId }, { rejectWithValue }) => {
      try {
         const gameResponse = await axiosInstance.get(
            `/admin/get-single-game?gameId=${gameId}`
         );
         return gameResponse;
      } catch (err) {
         if (err) {
            console.log(err);
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const updateSingleGame = createAsyncThunk(
   'admin/updateSingleGame',
   async ({ gameId, formData }, { rejectWithValue }) => {
      try {
         const updateGameInfo = await axiosInstance.patch(
            `/admin/update-single-game?gameId=${gameId}`,
            formData,
            {
               headers: {
                  'Content-type': 'multipart/form-data',
               },
            }
         );

         return updateGameInfo;
      } catch (err) {
         if (err) {
            console.log(err);
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const deleteSingleGame = createAsyncThunk(
   'admin/deleteSingleGame',
   async ({ gameId }, { rejectWithValue }) => {
      try {
         const deleteGameResponse = await axiosInstance.delete(
            `/admin/delete-single-game?gameId=${gameId}`
         );
         return deleteGameResponse;
      } catch (err) {
         if (err) {
            console.log(err);
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const uploadGameAvatar = createAsyncThunk(
   'admin/uploadGameAvatar',
   async ({ formData }, { rejectWithValue }) => {
      try {
         const avatarRespose = await axiosInstance.post(
            '/admin/insert-new-game-avatar',
            formData,
            {
               headers: {
                  'Content-type': 'multipart/form-data',
               },
            }
         );

         return avatarRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const getAllAvatars = createAsyncThunk(
   'admin/getAllAvatars',
   async (_, { rejectWithValue }) => {
      try {
         const avatarLists = await axiosInstance.get('/admin/get-avatars');
         return avatarLists;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const deleteSingleAvatar = createAsyncThunk(
   'admin/deleteSingleAvatar',
   async ({ avatarId }, { rejectWithValue }) => {
      try {
         const deleteAvatarResponse = await axiosInstance.delete(
            `/admin/delete-single-avatar?avatarId=${avatarId}`
         );
         return deleteAvatarResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);
