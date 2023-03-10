const { catchAsync, httpStatusCodes, uploadToS3 } = require('../helper/helper');
const currencyModel = require('../model/schema/currencySchema');
const roleModel = require('../model/schema/roleSchema');
const gameModel = require('../model/schema/gameSchema');
const gameProviderModel = require('../model/schema/gameProvidersSchema');
const avatarModel = require('../model/schema/avatarSchema');
const authModel = require('../model/schema/authSchema');
const gameCategoryModel = require('../model/schema/gameCategorySchema');
const { default: mongoose } = require('mongoose');

// insert game curencey.
const insertGamesCurrency = catchAsync(async function (req, res, next) {
   const { currencyName, locked, description, metaDescription } = req.body;

   // first check currency name is already exists in database or not.
   // if the currency is already exists then send back the false response
   // other store the new currency in database.
   const findCurrencyIsExists = await currencyModel.findOne({ currencyName });

   if (findCurrencyIsExists) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         message: 'Currency is already exists',
      });
   }

   // database inserted data object.
   const insertData = {
      currencyName,
      locked,
      description,
      metaDescription,
   };

   // if user send the file then wait for the s3 upload.
   if (req.file) {
      const uploadData = await uploadToS3(req.file.buffer);
      // file url.
      insertData.icon = uploadData.Location;
   }

   const insertNewCurrency = await currencyModel(insertData).save();

   if (insertNewCurrency) {
      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         error: false,
         currency: insertNewCurrency,
         message: 'Currency saved',
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      error: true,
      message: 'Internal server error',
   });
});

// delete single game currency
const deleteSingleGameCurrency = catchAsync(async function (req, res, next) {
   const { id } = req.query;

   const findAndDeleteDocument = await currencyModel.deleteOne({ _id: id });

   if (!!findAndDeleteDocument?.deletedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         id,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      error: true,
      message: 'Internal server error',
   });
});

const getAllGameCurrency = catchAsync(async function (req, res, next) {
   // page number is required if we want to make a pagination.
   const { page } = req.query;
   const DOCUMENT_LIMIT = 10;

   const documentCount = await currencyModel.countDocuments();
   const findAllgamesCurrency = await currencyModel
      .find({}, { metaDescription: 0 })
      .skip(page * DOCUMENT_LIMIT)
      .limit(DOCUMENT_LIMIT);

   if (findAllgamesCurrency) {
      return res.status(httpStatusCodes.OK).json({
         error: false,
         success: true,
         totalDocuments: documentCount,
         totalPages: Math.ceil(documentCount / DOCUMENT_LIMIT - 1),
         page: +page,
         currency: findAllgamesCurrency,
      });
   }
   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      error: true,
      message: 'Internal server error',
   });
});

const getSingleGameCurrency = catchAsync(async function (req, res, next) {
   const { id } = req.query;

   if (!id) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Currency id is required',
      });
   }

   const findCurrencyDocument = await currencyModel.findOne({ _id: id });

   if (findCurrencyDocument) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         currency: findCurrencyDocument,
      });
   }

   return res.status(httpStatusCodes.NOT_FOUND).json({
      success: false,
      error: true,
      message: 'Currency is not found',
   });
});

// insert user roles.
const insertNewUsersRole = catchAsync(async function (req, res, next) {
   const { roleName, description } = req.body;

   if (!roleName) {
      return res.status(httpStatusCodes.INVALID_INPUT).json({
         error: true,
         message: 'user role name is required!',
      });
   }

   // check the user role is already exists or not.
   // if not then create new role
   const findUserRoleAlreadyExists = await roleModel.findOne({
      roleName,
   });

   if (findUserRoleAlreadyExists) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         error: true,
         message: 'User role already exists',
      });
   }

   const insertNewRole = await roleModel({
      roleName,
      description,
   }).save();

   if (insertNewRole) {
      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         error: false,
         role: insertNewRole,
         message: 'user role is created',
      });
   }
});

const getAllUserRoles = catchAsync(async function (req, res, next) {
   /**
    * @param findAllRoles find all user roles from database.
    * @param DOCUMENT_LIMIT how many document we want to return back
    */
   const { page } = req.query;

   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         error: true,
         success: false,
         message: 'page number is required!',
      });
   }

   const DOCUMENT_LIMIT = 10;
   const documentCount = await roleModel.countDocuments();
   const findAllRoles = await roleModel
      .find({})
      .skip(page * DOCUMENT_LIMIT)
      .limit(DOCUMENT_LIMIT);

   if (findAllRoles) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         totalPages: Math.ceil(documentCount / DOCUMENT_LIMIT - 1),
         page: +page,
         totalDocuments: documentCount,
         roles: findAllRoles,
      });
   }
});

const deleteUserSingleRole = catchAsync(async function (req, res, next) {
   const { roleId } = req.query;

   if (!roleId) {
      return res.status(httpStatusCodes.INVALID_INPUT).json({
         error: true,
         success: false,
         message: 'Role id is required',
      });
   }

   // find the role and then delete
   // if the role id is invalid then send back the error respose.
   const findRoleAndRemove = await roleModel.deleteOne({ _id: roleId });

   if (!!findRoleAndRemove.deletedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         roleId,
         message: 'user role is removed',
      });
   } else {
      return res.status(httpStatusCodes.INVALID_INPUT).json({
         success: false,
         error: true,
         message: 'Role is not found',
      });
   }
});

const getSingleUserRole = catchAsync(async function (req, res, next) {
   const { roleId } = req.query;

   if (!roleId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'user role id is required!',
      });
   }

   const findSingleRole = await roleModel.findOne({ _id: roleId });

   if (findSingleRole) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         role: findSingleRole,
      });
   }

   return res.status(httpStatusCodes.NOT_FOUND).json({
      success: false,
      error: true,
      message: 'single role is not found',
   });
});

const updateSingleGameCurrency = catchAsync(async function (req, res, next) {
   const { id } = req.query;
   const { currencyName, locked, description, metaDescription } = req.body;

   if (!id) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'currency id is required!',
      });
   }

   // check currency is exists.
   const findCurrencyDocument = await currencyModel.findOne({ id });

   if (!findCurrencyDocument) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Currency is not exists',
      });
   }

   if (findCurrencyDocument?.currencyName !== currencyName) {
      // check currency name is already exists
      const checkCurrencyAlreadyExists = await currencyModel.findOne({
         currencyName,
      });

      if (checkCurrencyAlreadyExists) {
         return res.status(httpStatusCodes.OK).json({
            success: false,
            message: 'Game currency already exists',
         });
      }
   }

   // database inserted data object.
   const insertData = {
      currencyName,
      locked,
      description,
      metaDescription,
   };

   // if user send the file then wait for the s3 upload.
   if (req.file) {
      const uploadData = await uploadToS3(req.file.buffer);
      // file url.
      insertData.icon = uploadData.Location;
   }

   const findAndUpdateDocument = await currencyModel.updateOne(
      { _id: id },
      { $set: req.body }
   );

   if (!!findAndUpdateDocument?.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Currency updated',
      });
   }

   return res.status(httpStatusCodes.OK).json({
      success: false,
      message: 'No changes',
   });
});

const updateSingleRole = catchAsync(async function (req, res, next) {
   const { roleId, roleName, description } = req.body;

   if (!roleId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'user role id is required!',
      });
   }

   // check role is exists or not.
   const findRoleDocument = await roleModel.findOne({ _id: roleId });

   if (!findRoleDocument) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Role is not exists',
      });
   }

   if (findRoleDocument?.roleName !== roleName) {
      const checkRoleAlreadyExists = await roleModel.findOne({ roleName });

      if (checkRoleAlreadyExists) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            error: false,
            message: 'user already exists',
         });
      }
   }

   const findUserRoleAndUpdate = await roleModel.updateOne(
      { _id: roleId },
      {
         $set: {
            roleName,
            description,
         },
      }
   );

   if (!!findUserRoleAndUpdate?.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'user role is updated',
      });
   } else {
      return res.status(httpStatusCodes.OK).json({
         error: false,
         success: false,
         message: 'No filed changes.',
      });
   }
});

const getGameProvidersList = catchAsync(async function (req, res, next) {
   const findAllGamesProviders = await gameProviderModel.find(
      { status: { $eq: 'Publish' } },
      { _id: 1, providerName: 1, logo: 1 }
   );

   if (findAllGamesProviders) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         response: findAllGamesProviders,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      error: true,
      message: 'Internal server error',
   });
});

const insertNewGame = catchAsync(async function (req, res, next) {
   const {
      name,
      by,
      description,
      aboutGame,
      gameProvider,
      url,
      gameStatus,
      gameCategory,
   } = req.body;

   // check the games is already exists or not.
   const findGameIsAlreadyExists = await gameModel.findOne({ name });

   if (findGameIsAlreadyExists) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         error: true,
         message: 'Game is already exists',
      });
   }

   const uploadObject = {
      name,
      by,
      description,
      aboutGame,
      gameProvider,
      url,
      gameStatus,
   };

   if (!!gameCategory) {
      uploadObject.gameCategory = gameCategory;
   }

   // keep track if user upload games images, like preview images
   // or games slides images.
   if (req.files) {
      let gameMainImage = req.files.find(
         (el) => el.fieldname === 'gameMainImage'
      );

      // find game main image is exists or not in req.
      if (gameMainImage) {
         const uploadData = await uploadToS3(gameMainImage.buffer);
         uploadObject.gameImage = uploadData.Location;
      }
   }

   // store all the data in database game collections.
   const storeGame = await gameModel(uploadObject).save();

   if (storeGame) {
      // store game id in game category collection.
      if (!!gameCategory) {
         await gameCategoryModel.updateOne(
            { _id: gameCategory },
            {
               $push: {
                  games: {
                     gameId: storeGame?._id,
                  },
               },
            }
         );
      }

      // store game id in provider collection.
      if (!!gameProvider) {
         await gameProviderModel.updateOne(
            { _id: gameProvider },
            {
               $push: {
                  games: {
                     gameId: storeGame?._id,
                  },
               },
            }
         );
      }

      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         error: false,
         message: 'Game upload',
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      error: true,
      message: 'Internal server error',
   });
});

const getGames = catchAsync(async function (req, res, next) {
   const { page } = req.query;

   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Game page number is required',
      });
   }

   const DOCUMENT_LIMIT = 10;
   const documentCount = await gameModel.countDocuments();
   const findGamesLists = await gameModel.find(
      {},
      {
         name: 1,
         by: 1,
         description: 1,
         gameImage: 1,
         gameProvider: 1,
         gameStatus: 1,
      }
   );

   if (findGamesLists) {
      return res.status(httpStatusCodes.OK).json({
         error: false,
         success: true,
         games: findGamesLists,
         totalDocuments: documentCount,
         totalPages: Math.ceil(documentCount / DOCUMENT_LIMIT - 1),
         page: +page,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      error: true,
      message: 'Internal server error',
   });
});

const getSingleGameInfo = catchAsync(async function (req, res, next) {
   const { gameId } = req.query;

   if (!gameId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'game id is required!',
      });
   }

   // find game in database
   const findGame = await gameModel.findOne(
      { _id: gameId },
      { likes: 0, favorites: 0, comments: 0 }
   );

   if (findGame) {
      return res.status(httpStatusCodes.OK).json({
         error: false,
         success: true,
         game: findGame,
      });
   }

   return res.status(httpStatusCodes.NOT_FOUND).json({
      error: false,
      success: false,
      message: 'Not found',
   });
});

const updateSingleGame = catchAsync(async function (req, res, next) {
   const { gameId } = req.query;
   if (!gameId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'game id is required!',
      });
   }

   const uploadObject = {
      name: req.body?.name,
      by: req.body?.by,
      description: req.body?.description,
      aboutGame: req.body?.aboutGame,
      url: req.body?.url,
      gameStatus: req.body?.gameStatus,
   };

   // check game is already exists or not.
   const findGame = await gameModel.findOne({ _id: gameId });

   if (!findGame) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Game is not exists',
      });
   }

   if (findGame?.name !== uploadObject?.name) {
      // check the updated game name is already exists or not.
      const checkGameNameIsExists = await gameModel.findOne({
         name: uploadObject?.name,
      });

      if (checkGameNameIsExists) {
         return res.status(httpStatusCodes.OK).json({
            error: true,
            success: false,
            message: 'Game name is already exists',
         });
      }
   }

   // first check game category id already exits in game collection. or also check game category id
   // is diffrent or not. if diffrent then remove older id from game collection or category collection
   // aslo and store new game id or game category id. same for the game provider.

   // find game collection .
   const gameCollection = await gameModel.findOne(
      { _id: gameId },
      { gameProvider: 1, gameCategory: 1 }
   );

   // keep track user selecte or send the category id or game provier id.
   const gameCategoryId = req.body?.gameCategory;
   const gameProvider = req.body?.gameProvider;

   // if user select the game category.
   if (
      gameCategoryId &&
      gameCollection?.gameCategory.valueOf() !== gameCategoryId
   ) {
      const checkIdIsExistsInCategory = await gameCategoryModel.findOne(
         {
            _id: gameCollection.gameCategory,
            games: { $elemMatch: { gameId } },
         },
         { 'games.$': 1 }
      );

      if (checkIdIsExistsInCategory) {
         // first remove game id from the category collection then store game id into the another category
         // collection.
         await gameCategoryModel.updateOne(
            { _id: gameCollection.gameCategory },
            {
               $pull: {
                  games: {
                     gameId: gameId,
                  },
               },
            }
         );
      }

      // check category collection have already game id or not. if not then store game id.
      const checkIdIsExists = await gameCategoryModel.findOne(
         {
            _id: gameCategoryId,
            games: { $elemMatch: { gameId } },
         },
         { 'games.$': 1 }
      );

      if (!checkIdIsExists) {
         const updateGameCategoryDocument = await gameCategoryModel.updateOne(
            { _id: gameCategoryId },
            {
               $push: {
                  games: {
                     gameId: gameId,
                  },
               },
            }
         );

         // add filed into the update object.
         if (!!updateGameCategoryDocument?.modifiedCount) {
            uploadObject.gameCategory = gameCategoryId;
         }
      }
   }

   // check user selecte the game provider or not.
   if (
      !!gameProvider &&
      gameCollection?.gameProvider.valueOf() !== gameProvider
   ) {
      const checkIdIsExistsInProviderCl = await gameProviderModel.findOne(
         {
            _id: gameCollection.gameProvider,
            games: { $elemMatch: { gameId } },
         },
         { 'games.$': 1 }
      );

      if (checkIdIsExistsInProviderCl) {
         await gameProviderModel.updateOne(
            { _id: gameCollection.gameProvider },
            {
               $pull: {
                  games: {
                     gameId: gameId,
                  },
               },
            }
         );

         // also check game provider has already game id ot not. if not then store the game id inside
         // the game provider collection.
         const updateGameProviderDocument = await gameProviderModel.updateOne(
            { _id: gameProvider },
            {
               $push: {
                  games: {
                     gameId: gameId,
                  },
               },
            }
         );

         // add filed into the update object.
         if (!!updateGameProviderDocument?.modifiedCount) {
            uploadObject.gameProvider = gameProvider;
         }
      }
   }

   // keep track if user upload games images, like preview images
   // or games slides images.
   if (req.files) {
      let gameMainImage = req.files.find(
         (el) => el.fieldname === 'gameMainImage'
      );

      // find game main image is exists or not in req.
      if (gameMainImage) {
         const uploadData = await uploadToS3(gameMainImage.buffer);
         uploadObject.gameImage = uploadData.Location;
      }
   }

   const updateDocument = await gameModel.updateOne(
      { _id: gameId },
      { $set: uploadObject }
   );

   if (!!updateDocument?.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         error: false,
         success: true,
         message: 'Game information updated',
      });
   }

   return res.status(httpStatusCodes.OK).json({
      error: true,
      success: false,
      message: 'Old and new values are same',
   });
});

const deleteSingleGame = catchAsync(async function (req, res, next) {
   const { gameId } = req.query;

   if (!gameId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'game id is required!',
      });
   }

   const findAndDelete = await gameModel.deleteOne({ _id: gameId });

   if (!!findAndDelete.deletedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Game Deleted',
         gameId,
      });
   }

   return res.status(httpStatusCodes.NOT_FOUND).json({
      success: false,
      error: true,
      message: 'Not found',
   });
});

const getUsersAvatars = catchAsync(async function (req, res, next) {
   const findAllAvatar = await avatarModel.find({}).sort({ createdAt: -1 });

   if (findAllAvatar) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         avatars: findAllAvatar,
      });
   }

   return res.status(httpStatusCodes.NOT_FOUND).json({
      success: false,
      error: true,
      message: 'Not found',
   });
});

const insertGameAvatar = catchAsync(async function (req, res, next) {
   const { description } = req.body;

   const uploadObject = {
      description,
   };

   // if user send the file then wait for the s3 upload.
   if (req.file) {
      const uploadData = await uploadToS3(req.file.buffer);
      // file url.
      uploadObject.url = uploadData.Location;
   }

   const uploadAvatar = await avatarModel(uploadObject).save();

   if (uploadAvatar) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Avatar uploded',
         avatar: uploadAvatar,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      error: true,
      message: 'Internal server error',
   });
});

const deleteSingleAvatar = catchAsync(async function (req, res, next) {
   const { avatarId } = req.query;

   if (!avatarId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         error: true,
         message: 'Avatar id is reuqired',
      });
   }

   const findAndDelete = await avatarModel.deleteOne({ _id: avatarId });

   if (!!findAndDelete.deletedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         id: avatarId,
         message: 'Avatar deleted',
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: true,
      message: 'Internal server error',
   });
});

const getAllUsers = catchAsync(async function (req, res, next) {
   const { page } = req.query;
   const DOCUMENT_LIMIT = 10;
   const documentCount = await authModel.countDocuments();

   const findDocuments = await authModel
      .find(
         {},
         {
            password: 0,
            wallet: 0,
            userRole: 0,
            otp: 0,
            friendRequests: 0,
            addFriendRequests: 0,
            friends: 0,
            blockedUsers: 0,
            likes: 0,
            medals: 0,
         }
      )
      .sort({ createdAt: -1 })
      .skip(page * DOCUMENT_LIMIT)
      .limit(DOCUMENT_LIMIT);

   if (findDocuments) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         totalDocuments: documentCount,
         totalPages: Math.ceil(documentCount / DOCUMENT_LIMIT - 1),
         page: +page,
         users: findDocuments,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'No document found!',
   });
});

const postNewGameCategory = catchAsync(async function (req, res, next) {
   const { name, description, status } = req.body;

   if (!name) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Game category name is requried',
      });
   }

   // find the game category is already exists or not. if the game category is already exists
   // then send back the error respose. or store the game category.

   const findGameCategory = await gameCategoryModel.findOne({ name });

   if (findGameCategory) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         error: true,
         message: 'Game category is already exists',
      });
   } else {
      const storeGameCategory = await gameCategoryModel({
         name,
         description,
         status,
      }).save();

      if (storeGameCategory) {
         return res.status(httpStatusCodes.CREATED).json({
            success: true,
            error: false,
            category: {
               name: storeGameCategory?.name,
               _id: storeGameCategory?._id,
               status: storeGameCategory?.status,
            },
            message: 'category saved',
         });
      }

      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         error: true,
         message: 'Internal server error',
      });
   }
});

const getAllGameCategory = catchAsync(async function (req, res, next) {
   const { page } = req.query;

   if (!page || page === 'undefined' || page === 'null') {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: false,
         message: 'page number is reuqired',
      });
   }

   // const countDocuments = await gameCategoryModel.countDocuments();
   // const DOCUMENT_LIMIT = 50;

   const findDocuments = await gameCategoryModel.aggregate([
      {
         $addFields: {
            totalsGames: { $size: '$games' },
         },
      },
      {
         $unwind: {
            path: '$games',
            preserveNullAndEmptyArrays: true,
         },
      },

      {
         $lookup: {
            from: 'games',
            localField: 'games.gameId',
            foreignField: '_id',
            as: 'games.game',
         },
      },
      {
         $unwind: {
            path: '$games.game',
            preserveNullAndEmptyArrays: true,
         },
      },
      {
         $project: {
            name: 1,
            status: 1,
            totalsGames: 1,
            games: {
               gameId: 1,
               _id: 1,
               name: '$games.game.name',
            },
         },
      },
      {
         $group: {
            _id: {
               _id: '$_id',
               name: '$name',
               status: '$status',
               totalsGames: '$totalsGames',
            },
            games: {
               $push: '$games',
            },
         },
      },
   ]);

   if (findDocuments) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         // totalDocuments: countDocuments,
         // totalPages: Math.ceil(countDocuments / DOCUMENT_LIMIT - 1),
         // page: +page,
         categorys: findDocuments,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'No document found!',
   });
});

const getSinglegameCategory = catchAsync(async function (req, res, next) {
   const { categoryId } = req.query;

   if (!categoryId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: false,
         message: 'category id is reuqired',
      });
   }

   const findCategory = await gameCategoryModel.findOne(
      { _id: categoryId },
      { name: 1, description: 1, status: 1 }
   );

   if (findCategory) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         category: findCategory,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'No game category found!',
   });
});

const updateGameCategory = catchAsync(async function (req, res, next) {
   const { name, status, description, categoryId } = req.body;

   if (!categoryId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'category id is required',
      });
   }

   // check category is exists or not.
   const findGameCategory = await gameCategoryModel.findOne({
      _id: categoryId,
   });

   if (!findGameCategory) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Game category is not found',
      });
   }

   // check update name is already exists or not.
   if (findGameCategory?.name !== name) {
      const checkCategoryNameIsExists = await gameCategoryModel.findOne({
         name,
      });

      if (checkCategoryNameIsExists) {
         return res.status(httpStatusCodes.OK).json({
            success: false,
            error: true,
            message: 'Category name is already exists',
         });
      }
   }

   const findAndUpdateDocument = await gameCategoryModel.updateOne(
      {
         _id: categoryId,
      },
      {
         $set: {
            name,
            status,
            description,
         },
      }
   );

   if (!!findAndUpdateDocument?.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Category updated',
         name,
         status,
         _id: categoryId,
      });
   }

   return res.status(httpStatusCodes.OK).json({
      success: false,
      error: true,
      message: 'No Changes',
   });
});

const deleteSingleGameCategory = catchAsync(async function (req, res, next) {
   const { gameCategoryId } = req.query;

   if (!gameCategoryId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'category id is required',
      });
   }

   const findAndDeleteCategory = await gameCategoryModel.deleteOne({
      _id: gameCategoryId,
   });

   if (!!findAndDeleteCategory?.deletedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         categoryId: gameCategoryId,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'No game category found!',
   });
});

const getAllGamesCategroy = catchAsync(async function (req, res, next) {
   const findAllGameCategory = await gameCategoryModel.find(
      { status: 'Publish' },
      { name: 1 }
   );

   if (findAllGameCategory) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         categorys: findAllGameCategory,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: true,
      message: 'Internal server error',
   });
});

const createNewGameProvider = catchAsync(async function (req, res, next) {
   const { providerName, email, phoneNumber, description, status } = req.body;

   if (!providerName && !email) {
      return res.status(httpStatusCodes.INVALID_INPUT).json({
         success: false,
         error: false,
         message: 'Provider name and provider email is required',
      });
   }

   // check provider name is already used
   const findProvierName = await gameProviderModel.findOne({ providerName });

   if (findProvierName) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         error: true,
         message: 'Provider name is already exists',
      });
   }

   // check provider email is already used
   const findProvierEmail = await gameProviderModel.findOne({ email });

   if (findProvierEmail) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         error: true,
         message: 'Provider email is already exists',
      });
   }

   const insertObject = {
      providerName,
      email,
      phoneNumber,
      description,
      status,
   };

   if (req.file) {
      const uploadData = await uploadToS3(req.file.buffer);
      // file url.
      insertObject.logo = uploadData.Location;
   }

   const storeProviderDetails = await gameProviderModel(insertObject).save();

   if (storeProviderDetails) {
      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         error: false,
         message: 'Game provider saved',
      });
   }
});

const getAllGameProviders = catchAsync(async function (req, res, next) {
   const { page } = req.query;
   const DOCUMENT_LIMIT = 30;

   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         error: true,
         success: false,
         message: 'page number is required',
      });
   }

   const documentCount = await gameProviderModel.countDocuments();

   const findAllGamesProviders = await gameProviderModel
      .find({}, { games: 0 })
      .skip(page * DOCUMENT_LIMIT)
      .limit(DOCUMENT_LIMIT);

   if (findAllGamesProviders) {
      return res.status(httpStatusCodes.OK).json({
         error: false,
         success: true,
         totalDocuments: documentCount,
         totalPages: Math.ceil(documentCount / DOCUMENT_LIMIT - 1),
         page: +page,
         providers: findAllGamesProviders,
      });
   }
   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      error: true,
      message: 'Internal server error',
   });
});

const getSingleGameProvider = catchAsync(async function (req, res, next) {
   const { gameProviderId } = req.query;

   if (!gameProviderId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         error: true,
         success: false,
         message: 'Game provider id is required',
      });
   }

   const gameProvider = await gameProviderModel.findOne(
      { _id: gameProviderId },
      { games: 0, createdAt: 0 }
   );

   if (gameProvider) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         provider: gameProvider,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      error: true,
      message: 'Internal server error',
   });
});

const updateGameProvider = catchAsync(async function (req, res, next) {
   const { providerName, email, phoneNumber, description, status, _id } =
      req.body;

   if (!providerName && !email) {
      return res.status(httpStatusCodes.INVALID_INPUT).json({
         success: false,
         error: false,
         message: 'Provider name and provider email is required',
      });
   }

   // check provider is exists or not.
   const findDocument = await gameProviderModel.findOne({ _id });

   if (!findDocument) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Game provider is not exists',
      });
   }

   if (findDocument?.providerName !== providerName) {
      // check provider name is already used
      const findProvierName = await gameProviderModel.findOne({
         providerName,
      });

      if (findProvierName) {
         return res.status(httpStatusCodes.OK).json({
            success: false,
            error: true,
            message: 'Provider name is already exists',
         });
      }
   }

   if (findDocument?.email !== email) {
      // check provider email is already used
      const findProvierEmail = await gameProviderModel.findOne({ email });

      if (findProvierEmail) {
         return res.status(httpStatusCodes.OK).json({
            success: false,
            error: true,
            message: 'Provider email is already exists',
         });
      }
   }

   const updateObject = {
      providerName,
      email,
      phoneNumber,
      description,
      status,
   };

   if (req.file) {
      const uploadData = await uploadToS3(req.file.buffer);
      // file url.
      updateObject.logo = uploadData.Location;
   }

   // update game provider collection document
   const updateGameProvider = await gameProviderModel.updateOne(
      { _id },
      {
         $set: updateObject,
      }
   );

   if (!!updateGameProvider?.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Game provider updated',
      });
   }

   return res.status(httpStatusCodes.OK).json({
      success: false,
      error: true,
      message: 'No changes',
   });
});

const blockSingleGameProvider = catchAsync(async function (req, res, next) {
   const { providerId } = req.body;

   if (!providerId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: false,
         message: 'Provider id is required',
      });
   }

   // find the provider document.
   const blockProviderAccount = await gameProviderModel.updateOne(
      {
         _id: providerId,
      },
      { $set: { status: 'Blocked' } }
   );

   if (blockProviderAccount?.modifiedCount) {
      await gameModel.updateMany(
         {
            gameProvider: providerId,
         },
         { $set: { gameStatus: 'Blocked' } }
      );

      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Game provider account blocked!',
         providerId,
         gameStatus: 'Blocked',
      });
   }

   return res.status(httpStatusCodes.OK).json({
      success: false,
      error: true,
      message: 'No changes',
   });
});

const unblockSingleGameProvider = catchAsync(async function (req, res, next) {
   const { providerId } = req.body;

   if (!providerId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: false,
         message: 'Provider id is required',
      });
   }

   // find the provider document.
   const unblockProviderAccount = await gameProviderModel.updateOne(
      {
         _id: providerId,
      },
      { $set: { status: 'Publish' } }
   );

   if (unblockProviderAccount?.modifiedCount) {
      await gameModel.updateMany(
         {
            gameProvider: providerId,
         },
         { $set: { gameStatus: 'Publish' } }
      );

      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Game provider account unblocked',
         providerId,
         gameStatus: 'Publish',
      });
   }

   return res.status(httpStatusCodes.OK).json({
      success: false,
      error: true,
      message: 'No changes',
   });
});

module.exports = {
   insertGamesCurrency,
   deleteSingleGameCurrency,
   getAllGameCurrency,
   getSingleGameCurrency,
   updateSingleGameCurrency,
   insertNewUsersRole,
   getAllUserRoles,
   deleteUserSingleRole,
   getSingleUserRole,
   updateSingleRole,
   getGameProvidersList,
   insertNewGame,
   getGames,
   getSingleGameInfo,
   updateSingleGame,
   deleteSingleGame,
   getUsersAvatars,
   insertGameAvatar,
   deleteSingleAvatar,
   getAllUsers,
   postNewGameCategory,
   getAllGameCategory,
   getSinglegameCategory,
   updateGameCategory,
   deleteSingleGameCategory,
   getAllGamesCategroy,
   createNewGameProvider,
   getAllGameProviders,
   getSingleGameProvider,
   updateGameProvider,
   blockSingleGameProvider,
   unblockSingleGameProvider,
};
