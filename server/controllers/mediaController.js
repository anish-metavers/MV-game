const {
   catchAsync,
   httpStatusCodes,
   uploadToS3,
   awsConfig,
} = require('../helper/helper');
const mediaModel = require('../model/schema/mediaSchema');
const AWS = require('aws-sdk');
const s3 = new AWS.S3(awsConfig);
const Bucket = process.env.S3_BUCKET_NAME;
const baseUrl = `https://${process.env.S3_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/`;

const getAllUploadImages = catchAsync(async function (req, res, next) {
   const { page } = req.query;

   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Page is reuqired',
      });
   }

   const params = {
      Bucket,
      // MaxKeys: 20, // to create pagination
   };

   s3.listObjects(params, function (err, data) {
      if (err) {
         console.log('s3 list object error: ', err, err.stack);
         return res.status(httpStatusCodes.INTERNAL_SERVER).json({
            error: true,
            message: 'Internal server error',
         });
      } else {
         const images = data?.Contents.map((el) => ({ key: baseUrl + el.Key }));

         return res.status(httpStatusCodes.OK).json({
            success: true,
            error: false,
            images,
         });
      }
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

      if (imageUrl) {
         imagesUrlAr.push({ key: imageUrl });
         isStored = true;
      } else {
         isStored = false;
         break;
      }

      // const storeImageData = await mediaModel({
      //    imageUrl,
      // }).save();
      // if (storeImageData) {
      //    imagesUrlAr.push({ imageUrl, _id: storeImageData._id });
      //    isStored = true;
      // } else {
      //    isStored = false;
      //    break;
      // }
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

const deleteMediaFiles = catchAsync(async function (req, res, next) {
   const { fileName } = req.query;

   if (!fileName) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Filename is required',
      });
   }

   const splitFileName = fileName.split('/');
   const originalName = splitFileName[splitFileName.length - 1];

   const params = {
      Bucket,
      Key: `bc-games/${originalName}`,
   };

   s3.deleteObject(params, function (err, data) {
      if (err) {
         console.log('s3 list delete object error: ', err, err.stack);
         return res.status(httpStatusCodes.BAD_REQUEST).json({
            error: true,
            success: false,
            message: err?.message,
         });
      }
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         deleteObject: fileName,
      });
   });
});

module.exports = { getAllUploadImages, uploadBulkImages, deleteMediaFiles };
