const { catchAsync, httpStatusCodes, uploadToS3 } = require('../helper/helper');
const mediaModel = require('../model/schema/mediaSchema');

const getAllUploadImages = catchAsync(async function (req, res, next) {
   const { page } = req.query;

   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Page is reuqired',
      });
   }

   const DOCUMENT_LIMIT = 1;
   const documentCount = await mediaModel.countDocuments();
   const findImages = await mediaModel
      .find({})
      .sort({ createdAt: -1 })
      .skip(page * DOCUMENT_LIMIT)
      .limit(DOCUMENT_LIMIT);

   if (findImages) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         images: findImages,
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

const uploadBulkImages = catchAsync(async function (req, res, next) {
   const files = req.files;

   if (!files) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Images is reuqired',
      });
   }

   let isStored = false;
   let imagesUrlAr = [];

   /**
    * loop over the selected images array. store images into the s3 or also in the
    * database. once all the images is successfully upload and store then send back
    * the repose.
    */

   for (let i = 0; i < files.length; i++) {
      const uploadImageData = await uploadToS3(files[i].buffer);
      const imageUrl = uploadImageData.Location;

      const storeImageData = await mediaModel({
         imageUrl,
      }).save();
      if (storeImageData) {
         imagesUrlAr.push({ imageUrl, _id: storeImageData._id });
         isStored = true;
      } else {
         isStored = false;
         break;
      }
   }

   if (isStored) {
      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         error: false,
         message: 'Images uploaded',
         images: imagesUrlAr,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: true,
      message: 'Internal server error',
   });
});

module.exports = { getAllUploadImages, uploadBulkImages };
