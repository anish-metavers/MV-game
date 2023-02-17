const { catchAsync, httpStatusCodes } = require('../helper/helper');
const currencyModel = require('../model/schema/currencySchema');
const roleModel = require('../model/schema/roleSchema');

const insertGamesCurrency = catchAsync(async function (req, res, next) {
   const { currencyName, locked, icon, description, metaDescription } =
      req.body;

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

   const insertNewCurrency = await currencyModel({
      currencyName,
      locked,
      icon,
      description,
      metaDescription,
   }).save();

   if (insertNewCurrency) {
      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         error: false,
         currency: insertNewCurrency,
      });
   }

   return res.status(httpStatusCodes.INTERNAL_SERVER).json({
      error: true,
      message: 'Internal server error',
   });
});

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

const getAllUserRoles = catchAsync(async function (req, res, next) {
   const findAllRoles = await roleModel.find({});

   if (findAllRoles) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         roles: findAllRoles,
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

const updateSingleRole = catchAsync(async function (req, res, next) {
   const { roleId, roleName, description } = req.body;

   if (!roleId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'user role id is required!',
      });
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

module.exports = {
   insertGamesCurrency,
   insertNewUsersRole,
   getAllUserRoles,
   deleteUserSingleRole,
   getSingleUserRole,
   updateSingleRole,
};
