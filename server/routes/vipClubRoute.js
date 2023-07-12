const express = require('express');
const router = express.Router();
const vipClubController = require('../controllers/vipClubController');

// router.post('/create-vip-club', (req, res, next) => {
//     // console.log('start', req.body);
//     vipClubController(req, res, next);
// });

router.post('/create', vipClubController.insertVipClub);
router.get('/get-all', vipClubController.findAllVipClub);
router.put('/update/:id', vipClubController.updateVipClub);
router.get('get/:id', vipClubController.findOneVipClub);
router.delete('delete/:id', vipClubController.deleteVipClub);

module.exports = router;