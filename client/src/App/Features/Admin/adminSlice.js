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
   getGameProvidersList,
   insertNewGame,
   getGamesLists,
   updateSingleGame,
   deleteSingleGame,
   uploadGameAvatar,
   getAllAvatars,
   deleteSingleAvatar,
   getAllUsers,
   postNewGameCategory,
   getAllProductsCategory,
   getSinglegameCategory,
   updateGameCategory,
   deleteSingleGameCategory,
   getAllGamesCategroy,
   createNewGameProvider,
   getAllGameProviders,
   updateGameProvider,
   blockSingleGameProvider,
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
   gameProvidersList: null,
   gameProvidersLoading: false,
   gameProvidersError: null,
   insertGameInfo: null,
   insertGameLoading: false,
   insertGameError: null,
   gameListInfo: null,
   gameListLoading: false,
   gameListInfoError: null,
   updateGameinfo: null,
   updateGameLoading: false,
   updateGameError: null,
   deleteGameLoading: false,
   deleteGameError: null,
   gameAvatarUploadInfo: null,
   gameAvatarUploadLoading: false,
   gameAvatarUploadError: null,
   gameAvatar: null,
   gameAvatarLoading: false,
   gameAvatarError: null,
   deleteSingleAvatarLoading: false,
   deleteSingleAvatarError: null,
   users: null,
   userLoading: false,
   userErrors: null,
   newGameCategory: null,
   newGameCategoryLoading: false,
   newGameCategoryError: null,
   allCategoryInfo: null,
   getAllCategoryInfoLoading: false,
   getAllCategoryInfoError: null,
   singleGameCategory: null,
   singleGameCategoryLoading: false,
   singleGameCategoryError: null,
   updateGameCategoryLoading: false,
   updateGameCategoryError: null,
   deleteSingelGameCategoryError: null,
   deleteSingleGameCategoryLoading: false,
   allGamesCategorys: null,
   allGamesCategorysLoading: false,
   allGamesCategorysError: null,
   postNewGameProviderInfo: null,
   postNewGameProviderLoading: false,
   postNewGameProviderError: null,
   postNewGameProviderInvalidErrors: [],
   gameProviders: null,
   gameProvidersLoading: false,
   gameProvidersError: null,
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
         state.uploadCurrencyInfo = null;
      },
      removeGameInfo: (state) => {
         state.insertGameInfo = null;
         state.insertGameError = null;
         state.updateGameinfo = null;
         state.updateGameError = null;
      },
      removeAvatarInfo: (state) => {
         state.gameAvatarUploadInfo = null;
         state.gameAvatarUploadError = null;
      },
      removeProviderErros: (state) => {
         state.postNewGameProviderInfo = null;
         state.postNewGameProviderError = null;
         state.postNewGameProviderInvalidErrors = [];
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

      bulder
         .addCase(getGameProvidersList.pending, (state) => {
            state.gameProvidersList = null;
            state.gameProvidersLoading = true;
            state.gameProvidersError = null;
         })
         .addCase(getGameProvidersList.rejected, (state, action) => {
            state.gameProvidersList = null;
            state.gameProvidersLoading = false;
            state.gameProvidersError = action.error.message;
         })
         .addCase(getGameProvidersList.fulfilled, (state, action) => {
            state.gameProvidersList = action.payload.data;
            state.gameProvidersLoading = false;
            state.gameProvidersError = null;
         });

      bulder
         .addCase(insertNewGame.pending, (state) => {
            state.insertGameInfo = null;
            state.insertGameLoading = true;
            state.insertGameError = null;
         })
         .addCase(insertNewGame.rejected, (state, action) => {
            state.insertGameInfo = null;
            state.insertGameLoading = false;
            state.insertGameError = action.error.message;
         })
         .addCase(insertNewGame.fulfilled, (state, action) => {
            state.insertGameInfo = action.payload.data;
            state.insertGameLoading = false;
            state.insertGameError = null;
         });

      bulder
         .addCase(getGamesLists.pending, (state) => {
            state.gameListInfo = null;
            state.gameListLoading = true;
            state.gameListInfoError = null;
         })
         .addCase(getGamesLists.rejected, (state, action) => {
            state.gameListInfo = null;
            state.gameListLoading = false;
            state.gameListInfoError = action.error.message;
         })
         .addCase(getGamesLists.fulfilled, (state, action) => {
            state.gameListInfo = action.payload.data;
            state.gameListLoading = false;
            state.gameListInfoError = null;
         });

      bulder
         .addCase(updateSingleGame.pending, (state) => {
            state.updateGameinfo = null;
            state.updateGameLoading = true;
            state.updateGameError = null;
         })
         .addCase(updateSingleGame.rejected, (state, action) => {
            state.updateGameinfo = null;
            state.updateGameLoading = false;
            state.updateGameError = action.error.message;
         })
         .addCase(updateSingleGame.fulfilled, (state, action) => {
            state.updateGameinfo = action.payload.data;
            state.updateGameLoading = false;
            state.updateGameError = null;
         });

      bulder
         .addCase(deleteSingleGame.pending, (state) => {
            state.deleteGameLoading = true;
            state.deleteGameError = null;
         })
         .addCase(deleteSingleGame.rejected, (state, action) => {
            state.deleteGameLoading = false;
            state.deleteGameError = action.error.message;
         })
         .addCase(deleteSingleGame.fulfilled, (state, action) => {
            state.deleteGameLoading = false;
            state.deleteGameError = null;
            state.gameListInfo = {
               ...state.gameListInfo,
               games: state.gameListInfo?.games.filter(
                  (el) => el?._id !== action.payload?.data?.gameId
               ),
            };
         });

      bulder
         .addCase(getAllAvatars.pending, (state) => {
            state.gameAvatar = null;
            state.gameAvatarLoading = true;
            state.gameAvatarError = null;
         })
         .addCase(getAllAvatars.rejected, (state, action) => {
            state.gameAvatar = null;
            state.gameAvatarLoading = false;
            state.gameAvatarError = action.error.message;
         })
         .addCase(getAllAvatars.fulfilled, (state, action) => {
            state.gameAvatar = action.payload.data;
            state.gameAvatarLoading = false;
            state.gameAvatarError = null;
         });

      bulder
         .addCase(uploadGameAvatar.pending, (state) => {
            state.gameAvatarUploadInfo = null;
            state.gameAvatarUploadLoading = true;
            state.gameAvatarUploadError = null;
         })
         .addCase(uploadGameAvatar.rejected, (state, action) => {
            state.gameAvatarUploadInfo = null;
            state.gameAvatarUploadLoading = false;
            state.gameAvatarUploadError = action.error.message;
         })
         .addCase(uploadGameAvatar.fulfilled, (state, action) => {
            state.gameAvatarUploadInfo = action.payload.data;
            state.gameAvatarUploadLoading = false;
            state.gameAvatarUploadError = null;
            state.gameAvatar = {
               ...state.gameAvatar,
               avatars: [
                  action.payload?.data?.avatar,
                  ...state.gameAvatar?.avatars,
               ],
            };
         });

      bulder
         .addCase(deleteSingleAvatar.pending, (state) => {
            state.deleteSingleAvatarLoading = true;
            state.deleteSingleAvatarError = null;
         })
         .addCase(deleteSingleAvatar.rejected, (state, action) => {
            state.deleteSingleAvatarLoading = false;
            state.deleteSingleAvatarError = null;
         })
         .addCase(deleteSingleAvatar.fulfilled, (state, action) => {
            state.deleteSingleAvatarLoading = false;
            state.deleteSingleAvatarError = null;
            state.gameAvatar = {
               ...state.gameAvatar,
               avatars: state.gameAvatar?.avatars.filter(
                  (el) => el._id !== action.payload?.data?.id
               ),
            };
         });

      bulder
         .addCase(getAllUsers.pending, (state) => {
            state.users = null;
            state.userLoading = true;
            state.userErrors = null;
         })
         .addCase(getAllUsers.rejected, (state, action) => {
            state.users = action.error.message;
            state.userLoading = false;
            state.userErrors = null;
         })
         .addCase(getAllUsers.fulfilled, (state, action) => {
            state.users = action.payload?.data;
            state.userLoading = false;
            state.userErrors = null;
         });

      bulder
         .addCase(postNewGameCategory.pending, (state) => {
            state.newGameCategory = null;
            state.newGameCategoryLoading = true;
            state.newGameCategoryError = null;
         })
         .addCase(postNewGameCategory.rejected, (state, action) => {
            state.newGameCategory = null;
            state.newGameCategoryLoading = false;
            state.newGameCategoryError = action.error.message;
         })
         .addCase(postNewGameCategory.fulfilled, (state, action) => {
            state.allCategoryInfo = action.payload?.data?.category?._id
               ? {
                    ...state.allCategoryInfo,
                    categorys: [
                       ...state.allCategoryInfo?.categorys,
                       {
                          _id: action.payload?.data?.category?._id,
                          name: action.payload?.data?.category?.name,
                          status: action.payload?.data?.category?.status,
                       },
                    ],
                 }
               : state.allCategoryInfo;
            state.newGameCategory = action.payload?.data?.message;
            state.newGameCategoryLoading = false;
            state.newGameCategoryError = null;
         });

      bulder
         .addCase(getAllProductsCategory.pending, (state) => {
            state.allCategoryInfo = null;
            state.getAllCategoryInfoLoading = true;
            state.getAllCategoryInfoError = null;
         })
         .addCase(getAllProductsCategory.rejected, (state, action) => {
            state.allCategoryInfo = null;
            state.getAllCategoryInfoLoading = false;
            state.getAllCategoryInfoError = action.error.message;
         })
         .addCase(getAllProductsCategory.fulfilled, (state, action) => {
            state.allCategoryInfo = action.payload?.data;
            state.getAllCategoryInfoLoading = false;
            state.getAllCategoryInfoError = null;
         });

      bulder
         .addCase(getSinglegameCategory.pending, (state) => {
            state.singleGameCategory = null;
            state.singleGameCategoryLoading = true;
            state.singleGameCategoryError = null;
         })
         .addCase(getSinglegameCategory.rejected, (state, action) => {
            state.singleGameCategory = null;
            state.singleGameCategoryLoading = false;
            state.singleGameCategoryError = action.error.message;
         })
         .addCase(getSinglegameCategory.fulfilled, (state, action) => {
            state.singleGameCategory = action.payload?.data;
            state.singleGameCategoryLoading = false;
            state.singleGameCategoryError = null;
         });

      bulder
         .addCase(updateGameCategory.pending, (state) => {
            state.newGameCategory = null;
            state.updateGameCategoryLoading = true;
            state.updateGameCategoryError = null;
         })
         .addCase(updateGameCategory.rejected, (state, action) => {
            state.newGameCategory = null;
            state.updateGameCategoryLoading = false;
            state.updateGameCategoryError = action.error.message;
         })
         .addCase(updateGameCategory.fulfilled, (state, action) => {
            if (action.payload?.data?._id) {
               const updateObject = action.payload?.data;

               state.allCategoryInfo = {
                  ...state.allCategoryInfo,
                  categorys: state.allCategoryInfo?.categorys.map((el) =>
                     el?._id?._id === updateObject?._id
                        ? {
                             ...el,
                             _id: {
                                ...el?._id,
                                name: updateObject?.name,
                                status: updateObject?.status,
                             },
                          }
                        : el
                  ),
               };
            }

            state.newGameCategory = action.payload?.data?.message;
            state.updateGameCategoryLoading = false;
            state.updateGameCategoryError = null;
         });

      bulder
         .addCase(deleteSingleGameCategory.pending, (state) => {
            state.deleteSingelGameCategoryError = null;
            state.deleteSingleGameCategoryLoading = true;
         })
         .addCase(deleteSingleGameCategory.rejected, (state, action) => {
            state.deleteSingelGameCategoryError = null;
            state.deleteSingleGameCategoryLoading = false;
         })
         .addCase(deleteSingleGameCategory.fulfilled, (state, action) => {
            if (!!action.payload?.data?.categoryId) {
               state.allCategoryInfo = {
                  ...state.allCategoryInfo,
                  categorys: state.allCategoryInfo?.categorys.filter(
                     (el) => el?._id !== action.payload?.data?.categoryId
                  ),
               };
            }
            state.deleteSingelGameCategoryError = null;
            state.deleteSingleGameCategoryLoading = false;
         });

      bulder
         .addCase(getAllGamesCategroy.pending, (state) => {
            state.allGamesCategorys = null;
            state.allGamesCategorysLoading = true;
            state.allGamesCategorysError = null;
         })
         .addCase(getAllGamesCategroy.rejected, (state, action) => {
            state.allGamesCategorys = null;
            state.allGamesCategorysLoading = false;
            state.allGamesCategorysError = action.error.message;
         })
         .addCase(getAllGamesCategroy.fulfilled, (state, action) => {
            state.allGamesCategorys = action.payload?.data;
            state.allGamesCategorysLoading = false;
            state.allGamesCategorysError = null;
         });

      bulder
         .addCase(createNewGameProvider.pending, (state) => {
            state.postNewGameProviderInfo = null;
            state.postNewGameProviderLoading = true;
            state.postNewGameProviderError = null;
            state.postNewGameProviderInvalidErrors = [];
         })
         .addCase(createNewGameProvider.rejected, (state, action) => {
            state.postNewGameProviderInfo = null;
            state.postNewGameProviderLoading = false;
            state.postNewGameProviderError = action.error.message;
            state.postNewGameProviderInvalidErrors = [];
         })
         .addCase(createNewGameProvider.fulfilled, (state, action) => {
            if (action.payload?.data?.status === 422) {
               state.postNewGameProviderInfo = null;
               state.postNewGameProviderLoading = false;
               state.postNewGameProviderError = null;
               state.postNewGameProviderInvalidErrors = action.payload?.data;
            } else {
               state.postNewGameProviderInfo = action.payload?.data;
               state.postNewGameProviderLoading = false;
               state.postNewGameProviderError = null;
               state.postNewGameProviderInvalidErrors = [];
            }
         });

      bulder
         .addCase(getAllGameProviders.pending, (state) => {
            state.gameProviders = null;
            state.gameProvidersLoading = true;
            state.gameProvidersError = null;
         })
         .addCase(getAllGameProviders.rejected, (state, action) => {
            state.gameProviders = null;
            state.gameProvidersLoading = false;
            state.gameProvidersError = action.error.message;
         })
         .addCase(getAllGameProviders.fulfilled, (state, action) => {
            state.gameProviders = action.payload?.data;
            state.gameProvidersLoading = false;
            state.gameProvidersError = null;
         });

      bulder
         .addCase(updateGameProvider.pending, (state) => {
            state.postNewGameProviderInfo = null;
            state.postNewGameProviderLoading = true;
            state.postNewGameProviderError = null;
            state.postNewGameProviderInvalidErrors = [];
         })
         .addCase(updateGameProvider.rejected, (state, action) => {
            state.postNewGameProviderInfo = null;
            state.postNewGameProviderLoading = false;
            state.postNewGameProviderError = action.error.message;
            state.postNewGameProviderInvalidErrors = [];
         })
         .addCase(updateGameProvider.fulfilled, (state, action) => {
            if (action.payload?.data?.status === 422) {
               state.postNewGameProviderInfo = null;
               state.postNewGameProviderLoading = false;
               state.postNewGameProviderError = null;
               state.postNewGameProviderInvalidErrors = action.payload?.data;
            } else {
               state.postNewGameProviderInfo = action.payload?.data;
               state.postNewGameProviderLoading = false;
               state.postNewGameProviderError = null;
               state.postNewGameProviderInvalidErrors = [];
            }
         });

      bulder
         .addCase(blockSingleGameProvider.pending, (state) => {
            state.gameProvidersLoading = true;
            state.gameProvidersError = null;
         })
         .addCase(blockSingleGameProvider.rejected, (state, action) => {
            state.gameProvidersLoading = false;
            state.gameProvidersError = action.error.message;
         })
         .addCase(blockSingleGameProvider.fulfilled, (state, action) => {
            const data = action.payload?.data;

            state.gameProviders = {
               ...state.gameProviders,
               providers:
                  data?.providerId && !!data?.providerId
                     ? state.gameProviders?.providers.map((el) =>
                          el?._id === data?.providerId
                             ? { ...el, status: data?.gameStatus }
                             : el
                       )
                     : state.gameProviders?.providers,
            };
            state.gameProvidersLoading = false;
            state.gameProvidersError = null;
         });
   },
});

export const {
   removeSingleRoleInfo,
   removeCurrencyInfo,
   removeGameInfo,
   removeAvatarInfo,
   removeProviderErros,
} = adminSlice.actions;

export default adminSlice.reducer;
