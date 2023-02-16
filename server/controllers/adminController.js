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
   const { roleName } = req.body;

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
   }).save();

   if (insertNewRole) {
      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         error: false,
         role: insertNewRole,
      });
   }
});

module.exports = {
   insertGamesCurrency,
   insertNewUsersRole,
};
