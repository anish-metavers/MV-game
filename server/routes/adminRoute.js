const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminController');
const { upload } = require('../helper/helper');
const { currencyValidator } = require('../middlewares/DocumentValidator');
const { varifyJwtToken } = require('../middlewares/jwtValidator');

router.get(
   '/get-games-providers-lists',
   varifyJwtToken,
   adminControllers.getGameProvidersList
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
   '/update-game-category',
   varifyJwtToken,
   adminControllers.updateGameCategory
);

// API => DELETE
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
