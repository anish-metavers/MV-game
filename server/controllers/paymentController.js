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

   const currencyPaymentOptions = await walletPaymentOptionModel
      .find({}, { name: 1, wayName: 1, min: 1, max: 1, icon: 1 })
      .limit(DOCUMENT_LIMIT)
      .skip(page * DOCUMENT_LIMIT);

   if (currencyPaymentOptions) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
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
   const { name, wayName, description, min, max, vipOnly, selectedCr } =
      req.body;

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

   const methodId = insertNewMethoInfo?._id;
   // state method id in selected currency collection.
   // find selected currency document is exists or not.
   const findCurrencyDocument = await currencyModel.findOne(
      {
         _id: selectedCr,
         paymentMethods: { $elemMatch: { paymentMethodId: methodId } },
      },
      { 'paymentMethods.$': 1 }
   );

   // if method is is already exists then send back the respose
   if (findCurrencyDocument) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Payment method information saved',
      });
   }

   // insert method in currency collection.
   const updateCurrencyDocument = await currencyModel.updateOne(
      { _id: selectedCr },
      { $push: { paymentMethods: { paymentMethodId: methodId } } }
   );

   if (updateCurrencyDocument?.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Payment method information saved',
      });
   }
});

module.exports = {
   getCurrencyPaymentOptions,
   insertNewCurrencyPaymentOption,
};
