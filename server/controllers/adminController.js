const { catchAsync, httpStatusCodes, uploadToS3 } = require('../helper/helper');
const currencyModel = require('../model/schema/currencySchema');
const roleModel = require('../model/schema/roleSchema');
const gameModel = require('../model/schema/gameSchema');
const gameProviderModel = require('../model/schema/gameProvidersSchema');
const avatarModel = require('../model/schema/avatarSchema');
const authModel = require('../model/schema/authSchema');
const gameCategoryModel = require('../model/schema/gameCategorySchema');
const { default: mongoose } = require('mongoose');

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

const getGamesUploadResult = catchAsync(async function (req, res, next) {
   const countDocuments = await gameModel.countDocuments();

   const findGamesdata = await gameModel.aggregate([
      {
         $group: {
            _id: {
               $dateToString: {
                  format: '%d %m %Y',
                  date: '$createdAt',
               },
            },
            games: { $sum: 1 },
         },
      },
      { $sort: { _id: 1 } },
   ]);

   if (findGamesdata) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         result: findGamesdata,
         totalsGames: countDocuments,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: true,
      message: 'Internal server error',
   });
});

const filterGameUploadDataResult = catchAsync(async function (req, res, next) {
   const { filter } = req.query;

   if (!filter || filter === 'undefined' || filter === 'null') {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'filter is required',
      });
   }

   const filterValue = filter.split('%20').join(' ');

   const findGamesdata = await gameModel.aggregate([
      {
         $group: {
            _id: {
               $dateToString: {
                  format: filterValue,
                  date: '$createdAt',
               },
            },
            games: { $sum: 1 },
         },
      },
      { $sort: { _id: 1 } },
   ]);

   if (findGamesdata) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         result: findGamesdata,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'Document not found',
   });
});

const getUserLoginResults = catchAsync(async function (req, res, next) {
   const userInfo = await authModel.aggregate([
      {
         $group: {
            _id: {
               $dateToString: {
                  format: '%d %m %Y',
                  date: '$createdAt',
               },
            },
            user: { $sum: 1 },
         },
      },
   ]);

   if (userInfo) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         result: userInfo,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: true,
      message: 'Internal server error',
   });
});

module.exports = {
   getGameProvidersList,
   getGames,
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
   getGamesUploadResult,
   filterGameUploadDataResult,
   getUserLoginResults,
};
