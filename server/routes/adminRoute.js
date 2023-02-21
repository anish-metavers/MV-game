const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminController');
const { userRoleValidator } = require('../middlewares/DocumentValidator');
const { varifyJwtToken } = require('../middlewares/jwtValidator');
const multer = require('multer');

//Specify the multer config
let upload = multer({
   limits: {
      fileSize: 1024 * 1024 * 5,
   },
   fileFilter: function (req, file, done) {
      if (
         file.mimetype === 'image/jpeg' ||
         file.mimetype === 'image/png' ||
         file.mimetype === 'image/jpg'
      ) {
         done(null, true);
      } else {
         //prevent the upload
         var newError = new Error('File type is incorrect');
         newError.name = 'MulterError';
         done(newError, false);
      }
   },
});

// API => GET
router.get(
   '/get-all-user-rools',
   varifyJwtToken,
   adminControllers.getAllUserRoles
);
router.get(
   '/get-single-user-role',
   varifyJwtToken,
   adminControllers.getSingleUserRole
);
router.get(
   '/get-game-currency',
   varifyJwtToken,
   adminControllers.getAllGameCurrency
);
router.get(
   '/get-single-game-currency',
   varifyJwtToken,
   adminControllers.getSingleGameCurrency
);

// API => POST
router.post(
   '/insert-currency',
   upload.single('file'),
   // currencyValidator,
   varifyJwtToken,
   adminControllers.insertGamesCurrency
);
router.post(
   '/insert-new-user-role',
   userRoleValidator,
   varifyJwtToken,
   adminControllers.insertNewUsersRole
);

// API => PATCH
router.patch(
   '/update-single-role',
   userRoleValidator,
   varifyJwtToken,
   adminControllers.updateSingleRole
);
router.patch(
   '/update-single-currency',
   upload.single('file'),
   varifyJwtToken,
   adminControllers.updateSingleGameCurrency
);

// API => DELETE
router.delete(
   '/delete-single-role',
   varifyJwtToken,
   adminControllers.deleteUserSingleRole
);
router.delete(
   '/delete-single-game-currency',
   varifyJwtToken,
   adminControllers.deleteSingleGameCurrency
);

module.exports = router;
