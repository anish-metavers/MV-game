const { validationResult } = require('express-validator');

const catchAsync = function (fn) {
   /**
    * @fn function which is wrapperd by the catchAsync function to use the DRY method.
    * passdown the request, response and the next argumens into the innerfunction.
    */

   return (req, res, next) => {
      fn(req, res, next).catch((err) => {
         console.log(err);
      });
   };
};

const httpStatusCodes = {
   OK: 200,
   CREATED: 201,
   ACCEPTED: 202,
   NO_CONTENT: 204,
   PARTIAL_CONTENT: 206,
   NOT_MODIFIED: 304,
   BAD_REQUEST: 400,
   NOT_FOUND: 404,
   INVALID_INPUT: 422,
   NOT_ACCEPTABLE: 406,
   INTERNAL_SERVER: 500,
   UNAUTHORIZATION: 401,
};

const validateErrors = function (req, res, next) {
   /**
    * validate the request
    */
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(httpStatusCodes.INVALID_INPUT).json({
         error: true,
         success: false,
         error: errors.array(),
         status: httpStatusCodes.INVALID_INPUT,
      });
   }

   next();
};

module.exports = {
   catchAsync,
   httpStatusCodes,
   validateErrors,
};
