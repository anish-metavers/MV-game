const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminController');
const {
   userRoleValidator,
   gameProviderDocValidation,
   currencyValidator,
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
router.get(
   '/get-all-login-users',
   varifyJwtToken,
   adminControllers.getAllUsers
);
router.get(
   '/get-all-games-category',
   varifyJwtToken,
   adminControllers.getAllGameCategory
);
router.get(
   '/get-single-game-category',
   varifyJwtToken,
   adminControllers.getSinglegameCategory
);
router.get(
   '/get-games-all-category',
   varifyJwtToken,
   adminControllers.getAllGamesCategroy
);
router.get(
   '/get-games-providers',
   varifyJwtToken,
   adminControllers.getAllGameProviders
);
router.get(
   '/get-single-game-provider',
   varifyJwtToken,
   adminControllers.getSingleGameProvider
);

// API => POST
router.post(
   '/insert-currency',
   varifyJwtToken,
   upload.single('file'),
   // currencyValidator,
   adminControllers.insertGamesCurrency
);
router.post(
   '/insert-new-user-role',
   varifyJwtToken,
   userRoleValidator,
   adminControllers.insertNewUsersRole
);
router.post(
   '/insert-new-game',
   varifyJwtToken,
   upload.any(),
   adminControllers.insertNewGame
);
router.post(
   '/insert-new-game-avatar',
   varifyJwtToken,
   upload.single('file'),
   adminControllers.insertGameAvatar
);
router.post(
   '/post-new-game-category',
   varifyJwtToken,
   adminControllers.postNewGameCategory
);
router.post(
   '/create-new-game-provider',
   varifyJwtToken,
   upload.single('file'),
   gameProviderDocValidation,
   adminControllers.createNewGameProvider
);

// API => PATCH
router.patch(
   '/update-single-role',
   varifyJwtToken,
   userRoleValidator,
   adminControllers.updateSingleRole
);
router.patch(
   '/update-single-currency',
   varifyJwtToken,
   upload.single('file'),
   adminControllers.updateSingleGameCurrency
);
router.patch(
   '/update-single-game',
   varifyJwtToken,
   upload.any(),
   adminControllers?.updateSingleGame
);
router.patch(
   '/update-game-category',
   varifyJwtToken,
   adminControllers.updateGameCategory
);
router.patch(
   '/update-game-provider',
   varifyJwtToken,
   upload.single('file'),
   gameProviderDocValidation,
   adminControllers.updateGameProvider
);
router.patch(
   '/block-single-game-provider',
   varifyJwtToken,
   adminControllers.blockSingleGameProvider
);
router.patch(
   '/unblock-single-game-provider',
   varifyJwtToken,
   adminControllers.unblockSingleGameProvider
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
router.delete(
   '/delete-single-game-categroy',
   varifyJwtToken,
   adminControllers.deleteSingleGameCategory
);

module.exports = router;
