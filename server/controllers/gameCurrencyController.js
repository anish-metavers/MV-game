const { catchAsync, httpStatusCodes, uploadToS3 } = require('../helper/helper');
const currencyModel = require('../model/schema/currencySchema');

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

module.exports = {
   insertGamesCurrency,
   deleteSingleGameCurrency,
   getAllGameCurrency,
   getSingleGameCurrency,
   updateSingleGameCurrency,
};