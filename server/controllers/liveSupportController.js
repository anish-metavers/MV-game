const { catchAsync, httpStatusCodes, uploadToS3, checkIsValidId } = require('../helper/helper');
const CaptureError = require('../error');

const liveSupportModel = require('../model/schema/liveSupportSchema');
const supportActivityModel = require('../model/schema/supportActivitySchema');
const { default: mongoose } = require('mongoose');
const liveSupportFeedBackModel = require('../model/schema/liveSupportFeedBackSchema');

const getAllQueryUserLists = catchAsync(async function (req, res, next) {
   const { supportTeamUserId } = req.query;

   if (!supportTeamUserId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Support team user id is required!',
      });
   }

   const isValidId = checkIsValidId(supportTeamUserId);

   if (!isValidId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: `Support team user id is not valid id please check.`,
      });
   }

   const findAllUsers = await liveSupportModel.aggregate([
      { $match: { isApproved: true, supportTeamUserId: mongoose.Types.ObjectId(supportTeamUserId) } },
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
         supportTeamUserId: approvedBy ? approvedBy : rejectedBy,
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
      supportObject.supportTeamUserId = approvedBy;
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

const updateUserQueryFeedBack = catchAsync(async function (req, res, next) {
   const { queryId, supportTeamUserId, feedBack } = req.body;

   if (!queryId || !supportTeamUserId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: `${(!queryId && 'Query') || (!supportTeamUserId && 'Suport team user')} id is required!`,
      });
   }

   const isValidId = checkIsValidId(queryId);
   const isValidIdSuportTeamId = checkIsValidId(supportTeamUserId);

   if (!isValidId || !isValidIdSuportTeamId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: `${
            (!isValidId && 'Query') || (!isValidIdSuportTeamId && 'Suport team user')
         } id is not valid id please check.`,
      });
   }

   // once the query feedback is recived from the support team side then. store the all old messages into the new
   // collections. and remove the send input options from the support team. also remove the user query documents.
   // get all messages from the support team document.
   const allMessages = await liveSupportModel.findOne({ userId: queryId }, { messages: 1 });

   if (!!allMessages?.messages && allMessages?.messages.length) {
      const { messages } = allMessages;
      const deleteUserQuery = await liveSupportModel.deleteOne({ userId: queryId });

      if (!deleteUserQuery?.deletedCount) {
         return res.status(httpStatusCodes.BAD_REQUEST).json({
            success: false,
            error: true,
            messages: 'User Document is not exists',
         });
      }

      const storeUserFeedBack = await liveSupportFeedBackModel({
         userId: queryId,
         supportTeamUserId,
         feedBack,
         messages,
      }).save();

      if (storeUserFeedBack) {
         return res.status(httpStatusCodes.CREATED).json({
            success: true,
            error: false,
            messages: 'Feedback saved',
            userId: queryId,
         });
      }

      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         error: true,
         messages: 'Internal server error',
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'No Chats',
   });
});

module.exports = { getAllQueryUserLists, getQueryUsersLists, updatedUserQuery, updateUserQueryFeedBack };
