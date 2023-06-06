const { catchAsync, httpStatusCodes, uploadToS3, checkIsValidId } = require('../helper/helper');
const bcryptjs = require('bcryptjs');
const otpGenerator = require('otp-generator');
const axios = require('axios');
const { default: mongoose } = require('mongoose');

const authModel = require('../model/schema/authSchema');
const roleModel = require('../model/schema/roleSchema');
const walletModel = require('../model/schema/walletSchema');
const currencyModel = require('../model/schema/currencySchema');
const userSettingModel = require('../model/schema/userSettingSchema');
const userSocialNetworkSchema = require('../model/schema/userSocialNetworkSchema');
const userHistoryModel = require('../model/schema/userHistorySchema');

const getUserSingleAccount = catchAsync(async function (req, res, next) {
   const { userId } = req.query;

   if (!userId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'User id is required',
      });
   }

   const isValidId = checkIsValidId(userId);

   if (!isValidId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Selected is not valid id please check.',
      });
   }

   const findUserAccount = await authModel.findOne(
      { _id: userId },
      { name: 1, email: 1, active: 1, avatar: 1, accountEnable: 1 }
   );

   if (findUserAccount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         item: findUserAccount,
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'Account not found!',
   });
});

const createPlayerAccount = catchAsync(async function (req, res, next) {
   const { name, email, active, avatar, accountEnable } = req.body;

   if (!name || !email || !active) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: `${(!name && 'name') || (!email && 'email') || (!active && 'active')} is required`,
      });
   }

   // check user email is exists or not.
   const findUserEmailIsExists = await authModel.findOne({
      email: email.toLowerCase(),
   });

   if (findUserEmailIsExists) {
      return res.status(httpStatusCodes.OK).json({
         error: true,
         success: false,
         message: 'Email already used',
      });
   } else {
      // genrate user otp
      const otp = otpGenerator.generate(6, {
         upperCaseAlphabets: false,
         specialChars: false,
      });

      const allCurrency = await currencyModel.find({}, { currencyName: 1 });

      if (!allCurrency) {
         return res.status(httpStatusCodes.BAD_REQUEST).json({
            success: false,
            error: true,
            message: 'Internal server error',
         });
      }

      // genrate user id
      const _id = mongoose.Types.ObjectId();

      let walletArray = allCurrency.map((el) => ({
         currencyId: el?._id,
         balance: mongoose.Types.Decimal128.fromString('0.000000'),
      }));

      // check user wallet is already created or not.
      const isUserWalletAlreadyExists = await walletModel.findOne({
         userId: _id,
      });

      if (isUserWalletAlreadyExists) {
         return res.status(httpStatusCodes.OK).json({
            success: false,
            error: false,
            message: 'Please use different account to login.',
         });
      }

      const createUserWallet = await walletModel({
         userId: _id,
         userWallet: walletArray,
      }).save();

      if (!createUserWallet) {
         return res.status(httpStatusCodes.BAD_REQUEST).json({
            success: false,
            error: true,
            message: 'Someting worng with creating user wallet.',
         });
      }

      if (createUserWallet) {
         // genrate unique user id
         const totalUsers = await authModel.countDocuments();
         const userId = totalUsers + Number(process.env.COLLECTION_STATE_COUNT);

         const createUserSettingDoc = await userSettingModel({
            userId: _id,
         }).save();

         if (!createUserSettingDoc) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
               success: false,
               error: true,
               message: 'Someting worng with creating user setting document.',
            });
         }

         const createUserSocialNetworkDocument = await userSocialNetworkSchema({
            userId: _id,
         }).save();

         if (!createUserSocialNetworkDocument) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
               success: false,
               error: true,
               message: 'Someting worng with creating user social network document.',
            });
         }

         const createUserHistoryDoc = await userHistoryModel({
            userId: _id,
         }).save();

         if (!createUserHistoryDoc) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
               success: false,
               error: true,
               message: 'Someting worng with creating user history document.',
            });
         }

         // store user information into the database
         const storeUserInfo = await authModel({
            _id,
            email,
            userId,
            name,
            active,
            avatar: avatar || process.env.DEFAULT_IMAGE,
            otp,
            userRole: [{ roleId: '63ee025a88d1991b27b2caec' }],
            coins: [
               {
                  coin: 'Gold',
                  balance: 1000,
               },
            ],
            walletId: createUserWallet._id,
            accountEnable,
         });

         // save user information
         const saveInfo = await storeUserInfo.save();

         if (!saveInfo) {
            throw Error('someting worng with creating user document');
         }

         await axios.post(`${process.env.CRYPTO_PAYMENT_SERVER}/testnet/addUser`, { userId: storeUserInfo?.userId });

         return res.status(httpStatusCodes.CREATED).json({
            success: true,
            error: false,
            message: 'Player account created',
         });
      }
   }
});

const updatePlayerAccount = catchAsync(async function (req, res, next) {
   const { userId, name, email, active, avatar, accountEnable } = req.body;

   console.log(req.body);

   if (!userId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'User id is required',
      });
   }

   const isValidId = checkIsValidId(userId);

   if (!isValidId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Selected is not valid id please check.',
      });
   }

   const findAndUpdateInfo = await authModel.updateOne(
      { _id: userId },
      {
         $set: {
            name,
            email,
            active,
            avatar,
            accountEnable,
         },
      }
   );

   if (findAndUpdateInfo?.modifiedCount) {
      if (!accountEnable) {
         // if the user account is disable then send the socket event the client user.
         const response = await axios.post(
            `${process.env.WEB_APP_BACKEND_URL}/userManagement/logout-client-user?secret=${process.env.API_SCRECT}`,
            {
               userId,
               accountEnable,
            }
         );
      }

      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Account updated',
      });
   }

   return res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: true,
      message: 'No changes',
   });
});

const setAccountPassword = catchAsync(async function (req, res, next) {
   const { password, accountId } = req.body;

   if (!password || !accountId) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: `${(!password && 'password') || (!accountId && 'account id')} is required`,
      });
   }

   const findUserAccount = await authModel.findOne({ _id: accountId });

   if (!findUserAccount) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
         success: false,
         error: true,
         message: 'Account is not found!',
      });
   }

   if (!!findUserAccount && findUserAccount?.password) {
      // match the password
      const varifyPassword = await bcryptjs.compare(password, findUserAccount.password);

      if (varifyPassword) {
         return res.status(httpStatusCodes.BAD_REQUEST).json({
            error: true,
            success: false,
            message: 'Older password and new password is same.',
         });
      }
   }

   const hashPassword = await bcryptjs.hash(password, 11);

   const updatePassword = await authModel.updateOne(
      { _id: accountId },
      {
         $set: {
            password: hashPassword,
         },
      }
   );

   if (updatePassword?.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         message: 'Account password changed',
      });
   }

   return res.status(httpStatusCodes.OK).json({
      success: false,
      error: true,
      message: 'No changes',
   });
});

module.exports = {
   getUserSingleAccount,
   createPlayerAccount,
   updatePlayerAccount,
   setAccountPassword,
};
