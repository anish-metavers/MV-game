const { catchAsync, httpStatusCodes, uploadToS3 } = require('../helper/helper');
const currencyModel = require('../model/schema/currencySchema');
const roleModel = require('../model/schema/roleSchema');
const gameModel = require('../model/schema/gameSchema');
const gameProviderModel = require('../model/schema/gameProvidersSchema');

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

   if (!id) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'currency id is required!',
      });
   }

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

const insertGamesProvider = catchAsync(async function (req, res, next) {
   const { providerName, email, phoneNumber, description, logo } = req.body;

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

   const storeProviderDetails = await gameProviderModel({
      providerName,
      email,
      phoneNumber,
      description,
      logo,
   }).save();

   if (storeProviderDetails) {
      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         error: false,
         provider: storeProviderDetails,
      });
   }
});

const getGameProvidersList = catchAsync(async function (req, res, next) {
   const findAllGamesProviders = await gameProviderModel.find(
      {},
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
   const { name, by, description, aboutGame, gameProvider, url } = req.body;

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
   };

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
      { name: 1, by: 1, description: 1, gameImage: 1, gameProvider: 1 }
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
      gameProvider: req.body?.gameProvider,
      url: req.body?.url,
   };

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
   insertGamesProvider,
   insertNewGame,
   getGames,
   getSingleGameInfo,
   updateSingleGame,
   deleteSingleGame,
};
