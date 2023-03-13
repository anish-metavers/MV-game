const express = require('express');
const router = express.Router();
const { varifyJwtToken } = require('../middlewares/jwtValidator');
const gameController = require('../controllers/gameController');
const adminControllers = require('../controllers/adminController');
const { upload } = require('../helper/helper');

// API => GET
router.get('/get-games', varifyJwtToken, adminControllers.getGames);
router.get(
   '/get-single-game',
   varifyJwtToken,
   gameController.getSingleGameInfo
);
router.get(
   '/get-top-favorite-games',
   varifyJwtToken,
   gameController.getTopFavoriteGames
);

// API => POST
router.post(
   '/insert-new-game',
   varifyJwtToken,
   upload.any(),
   gameController.insertNewGame
);

// API => PATCH
router.patch(
   '/update-single-game',
   varifyJwtToken,
   upload.any(),
   gameController?.updateSingleGame
);

// API => DELETE
router.delete(
   '/delete-single-game',
   varifyJwtToken,
   gameController.deleteSingleGame
);

module.exports = router;
