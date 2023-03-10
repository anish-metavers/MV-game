const { validationResult } = require('express-validator');

const AWS = require('aws-sdk');

require('aws-sdk/lib/maintenance_mode_message').suppress = true;

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

const awsConfig = {
   accessKeyId: process.env.aws_access_key_id,
   secretAccessKey: process.env.aws_secret_access_key,
   region: process.env.AWS_REGION,
   correctClockSkew: true,
};

const S3 = new AWS.S3(awsConfig);

//upload to s3
const uploadToS3 = (fileData) => {
   return new Promise((resolve, reject) => {
      const params = {
         Bucket: process.env.S3_BUCKET_NAME,
         Key: `bc-games/${Date.now().toString()}.jpg`,
         Body: fileData,
      };
      S3.upload(params, (err, data) => {
         if (err) {
            console.log(err);
            return reject(err);
         }
         return resolve(data);
      });
   });
};

module.exports = {
   catchAsync,
   httpStatusCodes,
   validateErrors,
   uploadToS3,
   S3,
};
