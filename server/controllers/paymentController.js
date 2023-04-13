const { default: mongoose } = require('mongoose');
const { catchAsync, httpStatusCodes, uploadToS3 } = require('../helper/helper');
const walletPaymentOptionModel = require('../model/schema/walletPaymentOptionsSchema');
const currencyModel = require('../model/schema/currencySchema');
const transactionsModel = require('../model/schema/transactionSchema');
const paymentOptionsFieldModel = require('../model/schema/paymentOptionsFieldSchema');

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
      .find({}, { name: 1, min: 1, max: 1, icon: 1 })
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
   const { name, description, min, max, vipOnly, paymentFields } = req.body;
   const fields = JSON.parse(paymentFields);
   const selectedFields = fields.map((el) => ({ fieldId: el?._id }));

   let icon;

   //uplod payment icon
   if (req.file) {
      const uploadData = await uploadToS3(req.file.buffer);
      icon = uploadData.Location;
   }

   // insert new payment method
   const insertNewMethoInfo = await walletPaymentOptionModel({
      name,
      description,
      min: mongoose.Types.Decimal128.fromString(min),
      max: mongoose.Types.Decimal128.fromString(max),
      vipOnly,
      icon,
      paymentFields: selectedFields,
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
   const singlePaymentWalletOption = await walletPaymentOptionModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(optionId) } },
      {
         $unwind: {
            path: '$paymentFields',
            preserveNullAndEmptyArrays: true,
         },
      },
      {
         $lookup: {
            from: 'paymentoptionsfields',
            localField: 'paymentFields.fieldId',
            foreignField: '_id',
            as: 'paymentFields.field',
         },
      },
      {
         $unwind: {
            path: '$paymentFields.field',
            preserveNullAndEmptyArrays: true,
         },
      },
      {
         $project: {
            name: 1,
            description: 1,
            min: {
               $convert: {
                  input: '$min',
                  to: 'string',
               },
            },
            max: {
               $convert: {
                  input: '$max',
                  to: 'string',
               },
            },
            vipOnly: 1,
            icon: 1,
            updatedAt: 1,
            'paymentFields._id': '$paymentFields.field._id',
            'paymentFields.label': '$paymentFields.field.label',
         },
      },
      {
         $group: {
            _id: {
               _id: '$_id',
               name: '$name',
               description: '$description',
               vipOnly: '$vipOnly',
               icon: '$icon',
               updatedAt: '$updatedAt',
               min: '$min',
               max: '$max',
            },
            paymentFields: { $push: '$paymentFields' },
         },
      },
   ]);

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

   const { name, description, min, max, vipOnly, paymentFields } = req.body;

   const fields = JSON.parse(paymentFields);
   const selectedFields = fields.map((el) => ({ fieldId: el?._id }));

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
            description,
            min: mongoose.Types.Decimal128.fromString(min),
            max: mongoose.Types.Decimal128.fromString(max),
            vipOnly,
            icon,
            paymentFields: selectedFields,
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

const getAllFiatTransactions = catchAsync(async function (req, res, next) {
   const { page } = req.query;

   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Page number is required',
      });
   }

   const DOCUMENT_LIMIT = 30;

   const totalDocuments = await transactionsModel.countDocuments();

   const allTransaction = await transactionsModel.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: page * DOCUMENT_LIMIT },
      { $limit: DOCUMENT_LIMIT },
      {
         $project: {
            amount: {
               $convert: {
                  input: '$amount',
                  to: 'string',
               },
            },
            status: 1,
            wayName: 1,
            orderId: 1,
            createdAt: 1,
         },
      },
   ]);

   if (allTransaction) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         transactions: allTransaction,
         totalPages: Math.ceil(totalDocuments / DOCUMENT_LIMIT - 1),
         page: +page,
         totalDocuments: totalDocuments,
      });
   }

   return res.status(httpStatusCodes.OK).json({
      success: true,
      error: false,
      transactions: [],
   });
});

const getSingleOrderInfo = catchAsync(async function (req, res, next) {
   const { orderId } = req.query;

   if (!orderId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Order id is required',
      });
   }

   const transactionInfo = await transactionsModel.aggregate([
      { $match: { orderId: orderId } },
      {
         $lookup: {
            from: 'auths',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
         },
      },
      { $unwind: '$user' },
      {
         $lookup: {
            from: 'currencies',
            localField: 'currencyId',
            foreignField: '_id',
            as: 'currency',
         },
      },
      { $unwind: '$currency' },
      {
         $project: {
            amount: {
               $convert: {
                  input: '$amount',
                  to: 'string',
               },
            },
            status: 1,
            wayName: 1,
            orderId: 1,
            createdAt: 1,
            'user.name': 1,
            'user.avatar': 1,
            'user.userId': 1,
            'currency.icon': 1,
            'currency.currencyName': 1,
            'currency.currencyType': 1,
         },
      },
   ]);

   const transactions = transactionInfo?.[0];

   if (transactions) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         transactions,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      status: true,
      error: false,
      message: 'Order is not found',
   });
});

const createNewPaymentOptionField = catchAsync(async function (req, res, next) {
   const saveInput = await paymentOptionsFieldModel(req.body).save();
   if (saveInput) {
      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         message: 'Input save',
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: true,
      message: 'Internal server error',
   });
});

const getAllPaymentOptionFields = catchAsync(async function (req, res, next) {
   const { page } = req.query;
   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Page is reuqired',
      });
   }

   const documents = await paymentOptionsFieldModel.countDocuments();
   const DOCUMENT_LIMIT = 30;

   const findDocuments = await paymentOptionsFieldModel
      .find({}, { __v: 0 })
      .skip(page * DOCUMENT_LIMIT)
      .limit(DOCUMENT_LIMIT);

   if (findDocuments) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         items: findDocuments,
         totalPages: Math.ceil(documents / DOCUMENT_LIMIT - 1),
         page: +page,
         totalDocuments: documents,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'Fileds not found',
   });
});

const deletePaymentOptionsField = catchAsync(async function (req, res, next) {
   const { fieldId } = req.query;

   if (!fieldId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'field id is reuqired',
      });
   }

   const deleteFiled = await paymentOptionsFieldModel.deleteOne({
      _id: fieldId,
   });

   if (deleteFiled.deletedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Field delete',
         fieldId,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'Filed is not found',
   });
});

const getSinglePaymentOptionField = catchAsync(async function (req, res, next) {
   const { fieldId } = req.query;

   if (!fieldId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'field id is reuqired',
      });
   }

   const singlefield = await paymentOptionsFieldModel.findOne(
      { _id: fieldId },
      { __v: 0, createdAt: 0 }
   );

   if (singlefield) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         item: singlefield,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'Filed is not found',
   });
});

const updatePaymentOptionField = catchAsync(async function (req, res, next) {
   const { fieldId } = req.body;

   if (!fieldId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'field id is reuqired',
      });
   }

   const updatePaymentField = await paymentOptionsFieldModel.updateOne(
      { _id: fieldId },
      { $set: req.body }
   );

   if (updatePaymentField?.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'option updated',
      });
   }

   return res.status(httpStatusCodes.OK).json({
      success: false,
      error: true,
      message: 'No changes',
   });
});

const getAllPaymentOptionFieldsList = catchAsync(async function (
   req,
   res,
   next
) {
   const findFieldLists = await paymentOptionsFieldModel.find({}, { label: 1 });

   if (findFieldLists) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         items: findFieldLists,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'Payment options fields is not found',
   });
});

module.exports = {
   getCurrencyPaymentOptions,
   insertNewCurrencyPaymentOption,
   getSinglePaymentCurrencyOption,
   updatePaymentOption,
   getAllPaymentOptionList,
   getAllFiatTransactions,
   getSingleOrderInfo,
   createNewPaymentOptionField,
   getAllPaymentOptionFields,
   deletePaymentOptionsField,
   getSinglePaymentOptionField,
   updatePaymentOptionField,
   getAllPaymentOptionFieldsList,
};
