import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../Services/AxiosInstance';

export const getAllUserRoles = createAsyncThunk(
   'admin/getAllUserRoles',
   async ({ page }, { rejectWithValue }) => {
      try {
         const userRolesInfo = await axiosInstance.get(
            `/user-role/get-all-user-rools?page=${page}`
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
            `/user-role/delete-single-role?roleId=${roleId}`
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
            '/user-role/insert-new-user-role',
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
            `/user-role/get-single-user-role?roleId=${roleId}`
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
            '/user-role/update-single-role',
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
            `/games/get-games?page=${page}`
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
            `/games/get-single-game?gameId=${gameId}`
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
            `/games/update-single-game?gameId=${gameId}`,
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
            `/games/delete-single-game?gameId=${gameId}`
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

export const getAllUsers = createAsyncThunk(
   'admin/getAllUsers',
   async ({ page }, { rejectWithValue }) => {
      try {
         const usersResponse = await axiosInstance.get(
            `/admin/get-all-login-users?page=${page}`
         );
         return usersResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const postNewGameCategory = createAsyncThunk(
   'admin/postNewGameCategory',
   async (data, { rejectWithValue }) => {
      try {
         const categoryRespose = await axiosInstance.post(
            '/admin/post-new-game-category',
            data
         );
         return categoryRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const updateGameCategory = createAsyncThunk(
   'admin/updateGameCategory',
   async (data, { rejectWithValue }) => {
      try {
         const gameResponse = await axiosInstance.patch(
            '/admin/update-game-category',
            data
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

export const getAllProductsCategory = createAsyncThunk(
   'admin/getAllProductsCategory',
   async ({ page }, { rejectWithValue }) => {
      try {
         const allGamesCategory = await axiosInstance.get(
            `/admin/get-all-games-category?page=${page}`
         );
         return allGamesCategory;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const getSinglegameCategory = createAsyncThunk(
   'admin/getSinglegameCategor',
   async ({ gameCategoryId }, { rejectWithValue }) => {
      try {
         const singleCategoryRespose = await axiosInstance.get(
            `/admin/get-single-game-category?categoryId=${gameCategoryId}`
         );
         return singleCategoryRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const deleteSingleGameCategory = createAsyncThunk(
   'admin/deleteSinglegameCategory',
   async ({ gameCategoryId }, { rejectWithValue }) => {
      try {
         const deleteCategory = await axiosInstance.delete(
            `/admin/delete-single-game-categroy?gameCategoryId=${gameCategoryId}`
         );
         return deleteCategory;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const getAllGamesCategroy = createAsyncThunk(
   'admin/getAllGamesCategroy',
   async (_, { rejectWithValue }) => {
      try {
         const categoryRespose = await axiosInstance.get(
            '/admin/get-games-all-category'
         );
         return categoryRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const getGamesUploadResult = createAsyncThunk(
   'admin/getGamesUploadResult',
   async (_, { rejectWithValue }) => {
      try {
         const gamesUploadResultRespose = await axiosInstance.get(
            '/admin/get-games-upload-result'
         );

         return gamesUploadResultRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const filterGameUploadDataResult = createAsyncThunk(
   'admin/filterGameUploadDataResult',
   async ({ filter }, { rejectWithValue }) => {
      try {
         const filterGameResultResponse = await axiosInstance.get(
            `/admin/get-games-result-filter-data?filter=${filter}`
         );
         return filterGameResultResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);

export const getUserLoginResults = createAsyncThunk(
   'admin/getUserLoginResults',
   async (_, { rejectWithValue }) => {
      try {
         const userInfoRespose = await axiosInstance.get(
            '/admin/get-user-login-results'
         );
         return userInfoRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.respose.data);
      }
   }
);
