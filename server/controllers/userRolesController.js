const { catchAsync, httpStatusCodes } = require('../helper/helper');
const roleModel = require('../model/schema/roleSchema');

const getAllUserRoles = catchAsync(async function (req, res, next) {
   /**
    * @param findAllRoles find all user roles from database.
    * @param DOCUMENT_LIMIT how many document we want to return back
    */
   const { page } = req.query;

   if (!page) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         error: true,
         success: false,
         message: 'page number is required!',
      });
   }

   const DOCUMENT_LIMIT = 10;
   const documentCount = await roleModel.countDocuments();
   const findAllRoles = await roleModel
      .find({})
      .skip(page * DOCUMENT_LIMIT)
      .limit(DOCUMENT_LIMIT);

   if (findAllRoles) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         totalPages: Math.ceil(documentCount / DOCUMENT_LIMIT - 1),
         page: +page,
         totalDocuments: documentCount,
         roles: findAllRoles,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'user role not found!',
   });
});

const getSingleUserRole = catchAsync(async function (req, res, next) {
   const { roleId } = req.query;

   if (!roleId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'user role id is required!',
      });
   }

   const findSingleRole = await roleModel.findOne({ _id: roleId });

   if (findSingleRole) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         role: findSingleRole,
      });
   }

   return res.status(httpStatusCodes.NOT_FOUND).json({
      success: false,
      error: true,
      message: 'single role is not found',
   });
});

// insert user roles.
const insertNewUsersRole = catchAsync(async function (req, res, next) {
   const { roleName, description } = req.body;

   if (!roleName) {
      return res.status(httpStatusCodes.INVALID_INPUT).json({
         error: true,
         message: 'user role name is required!',
      });
   }

   // check the user role is already exists or not.
   // if not then create new role
   const findUserRoleAlreadyExists = await roleModel.findOne({
      roleName,
   });

   if (findUserRoleAlreadyExists) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         error: true,
         message: 'User role already exists',
      });
   }

   const insertNewRole = await roleModel({
      roleName,
      description,
   }).save();

   if (insertNewRole) {
      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         error: false,
         role: insertNewRole,
         message: 'user role is created',
      });
   }
});

const updateSingleRole = catchAsync(async function (req, res, next) {
   const { roleId, roleName, description } = req.body;

   if (!roleId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'user role id is required!',
      });
   }

   // check role is exists or not.
   const findRoleDocument = await roleModel.findOne({ _id: roleId });

   if (!findRoleDocument) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Role is not exists',
      });
   }

   if (findRoleDocument?.roleName !== roleName) {
      const checkRoleAlreadyExists = await roleModel.findOne({ roleName });

      if (checkRoleAlreadyExists) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            error: false,
            message: 'user already exists',
         });
      }
   }

   const findUserRoleAndUpdate = await roleModel.updateOne(
      { _id: roleId },
      {
         $set: {
            roleName,
            description,
         },
      }
   );

   if (!!findUserRoleAndUpdate?.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'user role is updated',
      });
   } else {
      return res.status(httpStatusCodes.OK).json({
         error: false,
         success: false,
         message: 'No filed changes.',
      });
   }
});

const deleteUserSingleRole = catchAsync(async function (req, res, next) {
   const { roleId } = req.query;

   if (!roleId) {
      return res.status(httpStatusCodes.INVALID_INPUT).json({
         error: true,
         success: false,
         message: 'Role id is required',
      });
   }

   // find the role and then delete
   // if the role id is invalid then send back the error respose.
   const findRoleAndRemove = await roleModel.deleteOne({ _id: roleId });

   if (!!findRoleAndRemove.deletedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         roleId,
         message: 'user role is removed',
      });
   } else {
      return res.status(httpStatusCodes.INVALID_INPUT).json({
         success: false,
         error: true,
         message: 'Role is not found',
      });
   }
});

module.exports = {
   insertNewUsersRole,
   getAllUserRoles,
   deleteUserSingleRole,
   getSingleUserRole,
   updateSingleRole,
};
