const { default: mongoose } = require('mongoose');
const {
   catchAsync,
   httpStatusCodes,
   checkIsValidId,
} = require('../helper/helper');
const luckySpinModel = require('../model/schema/luckySpinSchema');

const createNewLuckyDraw = catchAsync(async function (req, res, next) {
   const { spinName, spinItems } = req.body;

   if (!spinName) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Spin name is reuqired',
      });
   }

   // check draw is already exists or not.
   const findDraw = await luckySpinModel.findOne({ spinName }, { _id: 1 });

   if (findDraw) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Draw already exists.',
      });
   }

   const saveNewDraw = await luckySpinModel({
      spinName,
      spinItems,
   }).save();

   if (saveNewDraw) {
      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         error: false,
         message: 'Lucky draw saved',
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: true,
      message: 'Internal server error',
   });
});

const updateSpinLuckyDraw = catchAsync(async function (req, res, next) {
   const { id } = req.query;
   const { spinName, spinItems } = req.body;

   if (!id) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Id is reuqired',
      });
   }

   const isValidId = checkIsValidId(id, res);

   if (!isValidId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Selected is not valid id please check.',
      });
   }

   const updateSpinItem = await luckySpinModel.updateOne(
      { _id: id },
      { $set: { spinName, spinItems } }
   );

   if (updateSpinItem.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Updated',
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'No changes',
   });
});

const getAllLuckyDraw = catchAsync(async function (req, res, next) {
   const { page } = req.query;

   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Page number is reuqired',
      });
   }

   const DOCUMENT_LIMIT = 10;

   const documentCount = await luckySpinModel.countDocuments({});
   const findLuckySpin = await luckySpinModel
      .find({}, { spinItems: 0 })
      .sort({ createdAt: -1 })
      .skip(page * DOCUMENT_LIMIT)
      .limit(DOCUMENT_LIMIT);

   if (findLuckySpin) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         totalDocuments: documentCount,
         totalPages: Math.ceil(documentCount / DOCUMENT_LIMIT - 1),
         page: +page,
         item: findLuckySpin,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'No document found!',
   });
});

const getSingleLuckyDraw = catchAsync(async function (req, res, next) {
   const { id } = req.query;

   if (!id) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Lucky draw id is reuqired',
      });
   }

   const isValidId = checkIsValidId(id, res);

   if (!isValidId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Selected is not valid id please check.',
      });
   }

   const findLuckySpin = await luckySpinModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(id) } },
      { $unwind: '$spinItems' },
      {
         $project: {
            _id: 1,
            spinName: 1,
            createdAt: 1,
            spinItems: {
               name: 1,
               icon: 1,
               level: { $convert: { input: '$spinItems.level', to: 'string' } },
               price: {
                  $convert: { input: '$spinItems.price', to: 'string' },
               },
               _id: 1,
            },
         },
      },
      {
         $group: {
            _id: {
               _id: '$_id',
               spinName: '$spinName',
               createdAt: '$createdAt',
            },
            spinItems: { $push: '$spinItems' },
         },
      },
      {
         $project: {
            _id: 0,
            item: '$_id',
            spinItems: '$spinItems',
         },
      },
   ]);

   const item = findLuckySpin?.[0];

   if (item) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         item: item,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'No document found!',
   });
});

module.exports = {
   createNewLuckyDraw,
   updateSpinLuckyDraw,
   getAllLuckyDraw,
   getSingleLuckyDraw,
};
