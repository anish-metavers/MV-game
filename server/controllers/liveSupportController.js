const { catchAsync, httpStatusCodes, uploadToS3, checkIsValidId } = require('../helper/helper');
const CaptureError = require('../error');

const liveSupportModel = require('../model/schema/liveSupportSchema');
const supportActivityModel = require('../model/schema/supportActivitySchema');

const getAllQueryUserLists = catchAsync(async function (req, res, next) {
   const findAllUsers = await liveSupportModel.aggregate([
      { $match: { isApproved: true } },
      {
         $lookup: {
            from: 'auths',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
            pipeline: [{ $project: { name: 1, avatar: 1 } }],
         },
      },
      { $project: { isAssigned: 1, user: { $arrayElemAt: ['$user', 0] } } },
   ]);

   if (findAllUsers) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         items: findAllUsers,
      });
   }

   return res.status(httpStatusCodes.NOT_FOUND).json({
      success: false,
      error: false,
      message: 'Users not found!',
   });
});

const getQueryUsersLists = catchAsync(async function (req, res, next) {
   const { page } = req.query;

   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Page is required!',
      });
   }

   const DOCUMENT_LIMIT = 10;
   const documentCount = await liveSupportModel.countDocuments();
   const findAllUsers = await liveSupportModel.aggregate([
      {
         $lookup: {
            from: 'auths',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
            pipeline: [{ $project: { name: 1, avatar: 1, createdAt: 1, userId: 1 } }],
         },
      },
      {
         $lookup: {
            from: 'auths',
            localField: 'rejectedBy',
            foreignField: '_id',
            as: 'rejectedBy',
            pipeline: [{ $project: { name: 1, avatar: 1, createdAt: 1, userId: 1 } }],
         },
      },
      {
         $lookup: {
            from: 'auths',
            localField: 'approvedBy',
            foreignField: '_id',
            as: 'approvedBy',
            pipeline: [{ $project: { name: 1, avatar: 1, createdAt: 1, userId: 1 } }],
         },
      },
      { $sort: { createdAt: -1 } },
      { $skip: page * DOCUMENT_LIMIT },
      { $limit: DOCUMENT_LIMIT },
      {
         $project: {
            isAssigned: 1,
            isApproved: 1,
            isRejected: 1,
            user: { $arrayElemAt: ['$user', 0] },
            rejectedBy: { $arrayElemAt: ['$rejectedBy', 0] },
            approvedBy: { $arrayElemAt: ['$approvedBy', 0] },
         },
      },
   ]);

   if (findAllUsers) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         items: findAllUsers,
         totalDocuments: documentCount,
         totalPages: Math.ceil(documentCount / DOCUMENT_LIMIT - 1),
         page: +page,
      });
   }

   return res.status(httpStatusCodes.NOT_FOUND).json({
      success: false,
      error: false,
      message: 'Users not found!',
   });
});

const updatedUserQuery = catchAsync(async function (req, res, next) {
   const { queryId, rejectedBy, rejectionReason, approvedBy } = req.body;

   if (!queryId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: `${!queryId && 'Query'} id is required!`,
      });
   }

   const isValidId = checkIsValidId(queryId);

   if (!isValidId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: `${!isValidId && 'Query'} id is not valid id please check.`,
      });
   }

   if (rejectedBy) {
      const isValidRejectedId = checkIsValidId(rejectedBy);

      if (!isValidRejectedId) {
         return res.status(httpStatusCodes.BAD_REQUEST).json({
            success: false,
            error: true,
            message: 'Rejected by user id is not valid id please check',
         });
      }
   }

   if (approvedBy) {
      const isValidapprovedById = checkIsValidId(approvedBy);

      if (!isValidapprovedById) {
         return res.status(httpStatusCodes.BAD_REQUEST).json({
            success: false,
            error: true,
            message: 'approved by user id is not valid id please check.',
         });
      }
   }

   // check query is already rejected or not.
   const checkQueryIsRejected = await liveSupportModel.findOne(
      { _id: queryId },
      { [approvedBy ? 'approvedBy' : 'rejectedBy']: 1 }
   );

   if (checkQueryIsRejected?.rejectedBy || checkQueryIsRejected?.approvedBy) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: false,
         message: `User query is already ${approvedBy ? 'approved' : 'rejected'}`,
      });
   }

   // check support team activity document is already eixsts or not.
   const checkSupportActivityExists = await supportActivityModel.findOne({
      supportTeamUserId: approvedBy ? approvedBy : rejectedBy,
   });

   const updatedObject = {};

   if (approvedBy) {
      updatedObject.approved = {
         userId: queryId,
      };
   } else {
      updatedObject.rejection = {
         userId: queryId,
         rejectionReason: rejectionReason,
      };
   }

   if (checkSupportActivityExists) {
      // push new document inside the exists document.
      const updateActivityDocument = await supportActivityModel.updateOne(
         { supportTeamUserId: approvedBy ? approvedBy : rejectedBy },
         { $push: updatedObject }
      );

      if (!updateActivityDocument) {
         throw new CaptureError('oh ho!', 'support activity is not updated');
      }
   } else {
      // create new support activity document.
      const newActivityDoc = await supportActivityModel({
         supportTeamUserId: rejectedBy,
         [approvedBy ? 'approved' : 'rejection']: [
            { userId: queryId, rejectionReason: approvedBy ? null : rejectionReason },
         ],
      }).save();

      if (!newActivityDoc) {
         throw new CaptureError('oh ho!', 'New support activity is not created');
      }
   }

   const supportObject = {};

   if (approvedBy) {
      supportObject.approvedBy = approvedBy;
      supportObject.isApproved = true;
   } else {
      supportObject.rejectedBy = rejectedBy;
      supportObject.isRejected = true;
   }

   const updateUserQuery = await liveSupportModel.updateOne({ _id: queryId }, { $set: supportObject });

   if (updateUserQuery.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         queryId,
         message: `User query is ${approvedBy ? 'approved' : 'rejected'}`,
         [approvedBy ? 'isApproved' : 'isRejected']: true,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      success: false,
      error: true,
      message: 'Internal server error',
   });
});

module.exports = { getAllQueryUserLists, getQueryUsersLists, updatedUserQuery };
