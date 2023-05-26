const express = require('express');
const router = express.Router();
const drawController = require('../controllers/luckyDrawController');
const { varifyJwtToken } = require('../middlewares/jwtValidator');

// API => GET
router.get(
   '/get-all-lucky-draw',
   varifyJwtToken,
   drawController.getAllLuckyDraw
);
router.get(
   '/get-single-lucky-draw',
   varifyJwtToken,
   drawController.getSingleLuckyDraw
);
router.get(
   '/get-all-lottery-poll',
   varifyJwtToken,
   drawController.getAllLotteryPoll
);
router.get(
   '/get-single-lucky-draw-poll',
   varifyJwtToken,
   drawController.getSingleLuckyDrawPoll
);

// API => POST
router.post(
   '/create-new-lucky-draw',
   varifyJwtToken,
   drawController.createNewLuckyDraw
);

// API => PATCH
router.patch(
   '/update-lucky-draw',
   varifyJwtToken,
   drawController.updateSpinLuckyDraw
);
router.patch(
   '/update-lucky-draw-poll-result',
   varifyJwtToken,
   drawController.updateLuckyDrawPollResult
);

module.exports = router;
