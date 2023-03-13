const gameProviderModel = require('../model/schema/gameProvidersSchema');
const gameModel = require('../model/schema/gameSchema');
const { catchAsync, httpStatusCodes, uploadToS3 } = require('../helper/helper');
const gameCategoryModel = require('../model/schema/gameCategorySchema');

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

const getTopFavoriteGames = catchAsync(async function (req, res, next) {
   const DOCUMENT_LIMIT = 3;

   const games = await gameModel.aggregate([
      {
         $addFields: {
            totalFavorites: { $size: '$favorites' },
         },
      },
      { $sort: { totalFavorites: -1 } },
      { $limit: DOCUMENT_LIMIT },
      {
         $project: {
            _id: 1,
            name: 1,
            gameImage: 1,
            totalFavorites: 1,
         },
      },
      {
         $project: {
            _id: 1,
            name: 1,
            gameImage: 1,
            totalFavorites: 1,
         },
      },
   ]);

   if (games) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         games: games,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'games not found',
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

module.exports = {
   insertNewGame,
   getSingleGameInfo,
   updateSingleGame,
   deleteSingleGame,
   getTopFavoriteGames,
};
