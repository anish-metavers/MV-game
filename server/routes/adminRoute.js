const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminController');
const {
   userRoleValidator,
   gameProviderDocValidation,
} = require('../middlewares/DocumentValidator');
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
         file.mimetype === 'image/jpg' ||
         file.mimetype === 'image/avif'
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
router.get(
   '/get-games-providers-lists',
   varifyJwtToken,
   adminControllers.getGameProvidersList
);
router.get('/get-games', varifyJwtToken, adminControllers.getGames);
router.get(
   '/get-single-game',
   varifyJwtToken,
   adminControllers.getSingleGameInfo
);
router.get('/get-avatars', varifyJwtToken, adminControllers.getUsersAvatars);

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
router.post(
   '/insert-games-provider',
   varifyJwtToken,
   gameProviderDocValidation,
   adminControllers.insertGamesProvider
);
router.post(
   '/insert-new-game',
   upload.any(),
   varifyJwtToken,
   adminControllers.insertNewGame
);
router.post(
   '/insert-new-game-avatar',
   upload.single('file'),
   varifyJwtToken,
   adminControllers.insertGameAvatar
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
router.patch(
   '/update-single-game',
   upload.any(),
   varifyJwtToken,
   adminControllers?.updateSingleGame
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
router.delete(
   '/delete-single-game',
   varifyJwtToken,
   adminControllers.deleteSingleGame
);
router.delete(
   '/delete-single-avatar',
   varifyJwtToken,
   adminControllers.deleteSingleAvatar
);

module.exports = router;
