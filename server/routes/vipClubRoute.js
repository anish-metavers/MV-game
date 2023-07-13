const express = require('express');
const router = express.Router();
const vipClubController = require('../controllers/vipClubController');
const { body, validationResult } = require('express-validator');

router.post(
    '/create',
    [
        body('userRole')
            .trim()
            .not()
            .isEmpty()
            .withMessage('provide a valid role'),
    ], vipClubController.insertVipClub);
router.get('/get-all', vipClubController.findAllVipClub);
router.put('/update/:id', vipClubController.updateVipClub);
router.get('get/:id', vipClubController.findOneVipClub);
router.delete('delete/:id', vipClubController.deleteVipClub);
router.get('/currency/get', vipClubController.currencyList)

module.exports = router;