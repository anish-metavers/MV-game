const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminController');
const { upload } = require('../helper/helper');
const { currencyValidator } = require('../middlewares/DocumentValidator');
const { varifyJwtToken } = require('../middlewares/jwtValidator');

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
   '/get-games-upload-result',
   varifyJwtToken,
   adminControllers.getGamesUploadResult
);
router.get(
   '/get-games-result-filter-data',
   varifyJwtToken,
   adminControllers.filterGameUploadDataResult
);
router.get(
   '/get-user-login-results',
   varifyJwtToken,
   adminControllers.getUserLoginResults
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

// API => PATCH
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

// API => DELETE
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
