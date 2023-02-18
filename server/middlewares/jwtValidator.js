const jwt = require('jsonwebtoken');
const { httpStatusCodes } = require('../helper/helper');
const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;

const getUserTokenInfromation = function (req) {
   /**
    * @param authToken check user authorization token
    * if the token is expire then send back the 401 error.
    * also check the user has valid token or not.
    */

   const authToken = req.headers['authorization'];

   if (!authToken) {
      return {
         error: true,
         success: false,
         message: 'Unauthrization',
         status: httpStatusCodes.UNAUTHORIZATION,
      };
   }

   const token = authToken.split(' ')[1];

   // if user is not valid then send back the error
   if (!token) {
      return {
         error: true,
         success: false,
         message: 'Unauthrization',
         status: httpStatusCodes.UNAUTHORIZATION,
      };
   }

   return token;
};

// varify jwt token.
const varifyJwtToken = function (req, res, next) {
   const headersVarifyData = getUserTokenInfromation(req, res);

   if (!!headersVarifyData?.error && !headersVarifyData?.success) {
      return res.status(headersVarifyData?.status).json(headersVarifyData);
   }

   jwt.verify(headersVarifyData, JWT_ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
         return res.status(401).json({
            error: true,
            message: 'Unauthorized',
         });
      }

      next();
   });
};

module.exports = {
   varifyJwtToken,
};
