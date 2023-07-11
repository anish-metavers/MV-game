const express = require('express');
const router = express.Router();
const vipClubController = require('../controllers/vipClubController');

// router.post('/create-vip-club', (req, res, next) => {
//     // console.log('start', req.body);
//     vipClubController(req, res, next);
// });

router.post('/create-vip-club', vipClubController.insertVipClub);
router.get('/get-vip-club/:page', vipClubController.findAllVipClub);
router.put('/update-vip-club/:id', vipClubController.updateVipClub);

module.exports = router;