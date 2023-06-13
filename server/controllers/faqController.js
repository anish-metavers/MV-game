const { catchAsync, httpStatusCodes } = require('../helper/helper');

const faqPostCategoryModel = require('../model/schema/faqPostCategorySchema');

const getAllFaqCategories = catchAsync(async function (req, res, next) {
   const { page } = req.query;

   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Page is required',
      });
   }

   const DOCUMENT_LIMIT = 2;
   const documentCount = await faqPostCategoryModel.countDocuments();
   const allFaqCategory = await faqPostCategoryModel.aggregate([
      { $skip: page * DOCUMENT_LIMIT },
      { $limit: DOCUMENT_LIMIT },
      { $sort: { createdAt: -1 } },
      { $project: { heading: 1, isShow: 1, createdAt: 1 } },
   ]);

   if (allFaqCategory) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         totalPages: Math.ceil(documentCount / DOCUMENT_LIMIT - 1),
         page: +page,
         totalDocuments: documentCount,
         categories: allFaqCategory,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'categories not found!',
   });
});

const createNewFaqCategory = catchAsync(async function (req, res, next) {
   const { heading, isShow, metaData } = req.body;

   const storeData = await faqPostCategoryModel({
      heading,
      isShow,
      metaData,
   }).save();

   if (storeData) {
      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         errror: false,
         message: 'Saved',
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      errror: true,
      message: 'Internal server errror',
   });
});

module.exports = { getAllFaqCategories, createNewFaqCategory };
