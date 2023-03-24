const { default: mongoose } = require('mongoose');
const { catchAsync, httpStatusCodes, uploadToS3 } = require('../helper/helper');
const walletPaymentOptionModel = require('../model/schema/walletPaymentOptionsSchema');
const currencyModel = require('../model/schema/currencySchema');

const getCurrencyPaymentOptions = catchAsync(async function (req, res, next) {
   const { page } = req.query;

   const DOCUMENT_LIMIT = 3;

   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Page id is requried',
      });
   }

   // get total documents
   const totalDocuments = await walletPaymentOptionModel.countDocuments();

   const currencyPaymentOptions = await walletPaymentOptionModel
      .find({}, { name: 1, wayName: 1, min: 1, max: 1, icon: 1 })
      .limit(DOCUMENT_LIMIT)
      .skip(page * DOCUMENT_LIMIT);

   if (currencyPaymentOptions) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         totalPages: Math.ceil(totalDocuments / DOCUMENT_LIMIT - 1),
         page: +page,
         totalDocuments: totalDocuments,
         methods: currencyPaymentOptions,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      message: 'Internal server error',
   });
});

const insertNewCurrencyPaymentOption = catchAsync(async function (
   req,
   res,
   next
) {
   const { name, wayName, description, min, max, vipOnly } = req.body;

   let icon;

   //uplod payment icon
   if (req.file) {
      const uploadData = await uploadToS3(req.file.buffer);
      icon = uploadData.Location;
   }

   // insert new payment method
   const insertNewMethoInfo = await walletPaymentOptionModel({
      name,
      wayName,
      description,
      min: mongoose.Types.Decimal128.fromString(min),
      max: mongoose.Types.Decimal128.fromString(max),
      vipOnly,
      icon,
   }).save();

   if (!insertNewMethoInfo) {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: 'Internal server error',
      });
   }

   // const methodId = insertNewMethoInfo?._id;
   // state method id in selected currency collection.
   // find selected currency document is exists or not.
   // const findCurrencyDocument = await currencyModel.findOne(
   //    {
   //       _id: selectedCr,
   //       paymentMethods: { $elemMatch: { paymentMethodId: methodId } },
   //    },
   //    { 'paymentMethods.$': 1 }
   // );

   // if method is is already exists then send back the respose
   // if (findCurrencyDocument) {
   //    return res.status(httpStatusCodes.OK).json({
   //       success: true,
   //       error: false,
   //       message: 'Payment method information saved',
   //    });
   // }

   return res.status(httpStatusCodes.OK).json({
      success: true,
      error: false,
      message: 'Payment method information saved',
   });

   // insert method in currency collection.
   // const updateCurrencyDocument = await currencyModel.updateOne(
   //    { _id: selectedCr },
   //    { $push: { paymentMethods: { paymentMethodId: methodId } } }
   // );

   // if (updateCurrencyDocument?.modifiedCount) {
   //    return res.status(httpStatusCodes.OK).json({
   //       success: true,
   //       error: false,
   //       message: 'Payment method information saved',
   //    });
   // }
});

const getSinglePaymentCurrencyOption = catchAsync(async function (
   req,
   res,
   next
) {
   const { optionId } = req.query;

   if (!optionId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Options id is required',
      });
   }

   // find single currency payment option.
   const singlePaymentWalletOption = await walletPaymentOptionModel.findOne(
      {
         _id: optionId,
      },
      { createdAt: 0, updatedAt: 0, _id: 0, __v: 0 }
   );

   if (singlePaymentWalletOption) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         method: singlePaymentWalletOption,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Method not found',
   });
});

const updatePaymentOption = catchAsync(async function (req, res, next) {
   const { optionId } = req.query;

   if (!optionId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Options id is required',
      });
   }

   const { name, wayName, description, min, max, vipOnly } = req.body;

   let icon;

   //uplod payment icon
   if (req.file) {
      const uploadData = await uploadToS3(req.file.buffer);
      icon = uploadData.Location;
   }

   // find payment options and update document.
   const findDocumentAndUpdate = await walletPaymentOptionModel.updateOne(
      {
         _id: optionId,
      },
      {
         $set: {
            name,
            wayName,
            description,
            min: mongoose.Types.Decimal128.fromString(min),
            max: mongoose.Types.Decimal128.fromString(max),
            vipOnly,
            icon,
         },
      }
   );

   if (!!findDocumentAndUpdate.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Payment option updated',
      });
   }

   return res.state(httpStatusCodes.OK).json({
      success: false,
      error: true,
      message: 'Old and new values are same',
   });
});

const getAllPaymentOptionList = catchAsync(async function (req, res, next) {
   const findAllPaymentOptions = await walletPaymentOptionModel.find(
      {},
      { name: 1 }
   );

   if (findAllPaymentOptions) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         items: findAllPaymentOptions,
      });
   }

   return res.state(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: true,
      message: 'Internal server error',
   });
});

module.exports = {
   getCurrencyPaymentOptions,
   insertNewCurrencyPaymentOption,
   getSinglePaymentCurrencyOption,
   updatePaymentOption,
   getAllPaymentOptionList,
};
